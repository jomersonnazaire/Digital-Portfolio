/**
 * Portfolio contact messages + anonymous page views -> Google Sheet.
 *
 * Deploy as a web app (Execute as: Me, Who has access: Anyone). The website
 * POSTs JSON as text/plain (no CORS preflight) with a "type" field:
 *   - "message"  -> appends a row to the "Messages" tab
 *   - "pageview" -> appends a row to the "Page Views" tab
 * Every response is JSON: {"ok":true} or {"ok":false,"error":"..."}.
 * The "Summary" tab (formulas) is never created or changed by this script.
 * See SETUP.md for step-by-step instructions.
 */

// The owner's sheet. Leave '' to use the sheet this script is bound to.
const SPREADSHEET_ID = '1wLsYacQ4nX0UhkboLaKBaV4thqeUOm9KzR4E2mmY2zg';

// Email address that gets a notification for every new message.
// To turn notifications off, change this to: const NOTIFY_EMAIL = '';
const NOTIFY_EMAIL = 'jomersonnazaire@gmail.com';

// Tab names and column order (must match row 1 of each tab).
const SHEET_MESSAGES = 'Messages';
const SHEET_PAGEVIEWS = 'Page Views';
const HEADERS = {};
HEADERS[SHEET_MESSAGES] = ['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Page', 'Referrer', 'User agent', 'Visitor ID', 'Status'];
HEADERS[SHEET_PAGEVIEWS] = ['Timestamp', 'Page path', 'Page title', 'Project slug', 'Referrer', 'Screen size', 'Language', 'Visitor ID', 'Session ID', 'User agent'];

// Maximum stored length per field (longer input is cut).
const MAX = {
  name: 100, email: 254, subject: 200, message: 5000,
  page: 500, title: 300, slug: 100, referrer: 500,
  screen: 20, language: 35, id: 64, userAgent: 400
};
const MAX_BODY_CHARS = 20000;

// Simple per-visitor rate limits (CacheService counter; it resets once the visitor
// has been quiet for the given number of seconds).
const RATE_LIMITS = {
  message: { max: 3, seconds: 600 },   // 3 messages per 10 minutes
  pageview: { max: 60, seconds: 600 }  // 60 page views per 10 minutes
};

/* ------------------------------------------------------------------ */

/** Health check: open the /exec URL in a browser and you should see "ok". */
function doGet() {
  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const raw = (e && e.postData && typeof e.postData.contents === 'string') ? e.postData.contents : '';
    if (!raw) return json_({ ok: false, error: 'empty' });
    if (raw.length > MAX_BODY_CHARS) return json_({ ok: false, error: 'too_large' });

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      return json_({ ok: false, error: 'bad_json' });
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return json_({ ok: false, error: 'bad_json' });

    const type = clean_(data.type, 20);
    if (type === 'message') return json_(handleMessage_(data));
    if (type === 'pageview') return json_(handlePageview_(data));
    return json_({ ok: false, error: 'unknown_type' });
  } catch (err) {
    console.error('doPost failed: ' + (err && err.stack ? err.stack : err));
    return json_({ ok: false, error: 'server_error' });
  }
}

/**
 * Run this once from the Apps Script editor (select "setup" > Run).
 * It asks for permissions and adds any missing tab or header row.
 * It never clears or overwrites existing data, and never touches "Summary".
 */
function setup() {
  const ss = getSpreadsheet_();
  [SHEET_MESSAGES, SHEET_PAGEVIEWS].forEach(function (name) { getSheet_(ss, name); });
  if (NOTIFY_EMAIL) {
    // Touch MailApp so the email permission is requested now, not on the first message.
    console.log('Email notifications on. Remaining daily email quota: ' + MailApp.getRemainingDailyQuota());
  }
  console.log('Setup complete for "' + ss.getName() + '".');
}

/* ------------------------------------------------------------------ */

function handleMessage_(data) {
  // Honeypot: real visitors never see or fill the "website" field.
  // Pretend success so bots get no signal, but store nothing.
  if (clean_(data.website, 200)) return { ok: true };

  const name = clean_(data.name, MAX.name);
  const email = clean_(data.email, MAX.email).toLowerCase();
  const subject = clean_(data.subject, MAX.subject);
  const message = cleanMultiline_(data.message, MAX.message);
  if (!name || !message || !isEmail_(email)) return { ok: false, error: 'invalid' };

  const visitorId = cleanId_(data.visitorId);
  const row = [
    new Date(),
    name,
    email,
    subject,
    message,
    clean_(data.page, MAX.page),
    clean_(data.referrer, MAX.referrer),
    clean_(data.userAgent, MAX.userAgent),
    visitorId,
    'New'
  ];

  const result = appendRow_(SHEET_MESSAGES, row, 'message:' + (visitorId || 'unknown'), RATE_LIMITS.message);
  if (result.ok) notify_(name, email, subject, message, row[5]);
  return result;
}

function handlePageview_(data) {
  const visitorId = cleanId_(data.visitorId);
  const slug = clean_(data.slug, MAX.slug).replace(/[^A-Za-z0-9_-]/g, '');
  const row = [
    new Date(),
    clean_(data.path, MAX.page),
    clean_(data.title, MAX.title),
    slug,
    clean_(data.referrer, MAX.referrer),
    clean_(data.screen, MAX.screen),
    clean_(data.language, MAX.language),
    visitorId,
    cleanId_(data.sessionId),
    clean_(data.userAgent, MAX.userAgent)
  ];
  if (!row[1]) return { ok: false, error: 'invalid' };
  return appendRow_(SHEET_PAGEVIEWS, row, 'pageview:' + (visitorId || 'unknown'), RATE_LIMITS.pageview);
}

/** Rate-limit check and append, both inside a script lock so parallel requests can't collide. */
function appendRow_(sheetName, row, rateKey, rule) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return { ok: false, error: 'busy' };
  try {
    if (isRateLimited_(rateKey, rule)) return { ok: false, error: 'rate_limited' };
    const sheet = getSheet_(getSpreadsheet_(), sheetName);
    sheet.appendRow(row.map(safeCell_));
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

function isRateLimited_(key, rule) {
  const cache = CacheService.getScriptCache();
  const count = Number(cache.get(key) || 0);
  if (count >= rule.max) return true;
  cache.put(key, String(count + 1), rule.seconds);
  return false;
}

function notify_(name, email, subject, message, page) {
  if (!NOTIFY_EMAIL) return;
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: 'New portfolio message from ' + name + (subject ? ': ' + subject : ''),
      body: 'Name: ' + name + '\nEmail: ' + email + (subject ? '\nSubject: ' + subject : '') +
        '\nPage: ' + page + '\n\n' + message + '\n\n(Saved in the "' + SHEET_MESSAGES + '" tab of your Google Sheet.)'
    });
  } catch (err) {
    // The message is already saved; a mail quota/permission problem must not fail the request.
    console.error('Notification email failed: ' + err);
  }
}

/* ------------------------------------------------------------------ */

function getSpreadsheet_() {
  return SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

/** Returns the tab, creating it and/or its bold, frozen header row only if missing. */
function getSheet_(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  const headers = HEADERS[name];
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  const current = headerRange.getValues()[0];
  const isEmpty = current.every(function (v) { return v === '' || v === null; });
  if (isEmpty) {
    headerRange.setValues([headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Single-line text: strip control characters, trim, cap length. */
function clean_(value, max) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[\u0000-\u001F\u007F]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

/** Multi-line text: keep line breaks, strip other control characters. */
function cleanMultiline_(value, max) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '')
    .replace(/\n{4,}/g, '\n\n\n').trim().slice(0, max);
}

/** Anonymous IDs from the site are random letters, digits and dashes. */
function cleanId_(value) {
  const id = clean_(value, MAX.id);
  return /^[A-Za-z0-9-]{8,64}$/.test(id) ? id : '';
}

function isEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/** Stop text that starts with = + - @ from being run as a spreadsheet formula. */
function safeCell_(value) {
  if (typeof value === 'string' && /^[=+\-@\t\r]/.test(value)) return "'" + value;
  return value;
}
