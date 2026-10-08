# Connect the contact form and page views to your Google Sheet

This takes about 5 minutes. You don't need to edit any code.
The script writes to your existing sheet:
https://docs.google.com/spreadsheets/d/1wLsYacQ4nX0UhkboLaKBaV4thqeUOm9KzR4E2mmY2zg/edit

1. Open the sheet at the link above, signed in with your Google account (jomersonnazaire@gmail.com).
2. In the menu, click **Extensions > Apps Script**. A new tab opens with the script editor.
3. In the editor, select everything in `Code.gs` and delete it. Paste in the full contents of `Code.gs` from this folder. Click the **Save** icon (or press Ctrl+S).
4. In the toolbar, choose **setup** in the function list and click **Run**.
   - Google asks for permission. Click **Review permissions** and choose your account.
   - If you see "Google hasn't verified this app", click **Advanced**, then **Go to ... (unsafe)**. This is your own script, so it is safe. Then click **Allow**.
   - The script only adds the **Messages** and **Page Views** tabs and their header rows if they are missing. It never clears data and never touches the **Summary** tab.
5. Click **Deploy > New deployment**. Click the gear icon next to "Select type" and choose **Web app**. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
   
   Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
6. Optional check: open that URL in your browser. It should show just `ok`.
7. Send the `/exec` URL back to us. We'll put it into the website and send you the updated site. That's all.

## Good to know

- **New messages** appear in the **Messages** tab with Status `New`. You also get an email for each message at jomersonnazaire@gmail.com.
- **To stop the emails:** in `Code.gs`, change `const NOTIFY_EMAIL = 'jomersonnazaire@gmail.com';` to `const NOTIFY_EMAIL = '';`, save, then follow the "after a change" steps below.
- **After any change to the script:** click **Deploy > Manage deployments**, click the pencil (edit) icon, set **Version** to **New version**, and click **Deploy**. The `/exec` URL stays the same, so the website doesn't need to change.
- **Columns:**
  - Messages: Timestamp, Name, Email, Subject, Message, Page, Referrer, User agent, Visitor ID, Status
  - Page Views: Timestamp, Page path, Page title, Project slug, Referrer, Screen size, Language, Visitor ID, Session ID, User agent
- **Privacy:** page views are anonymous (a random ID, no cookies, no names or emails), and visitors with Do Not Track turned on are not counted.
- **Spam protection:** a hidden "honeypot" field silently drops bots, and each visitor can send at most 3 messages per 10 minutes.
