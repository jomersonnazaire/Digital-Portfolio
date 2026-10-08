/* Jomerson Nazaire, portfolio scripts.
   Plain JS, no build step. Every initializer checks that its elements exist,
   so the same file works on index.html and project.html. */
(function () {
    'use strict';

    /* Google Sheet endpoint (Apps Script web app /exec URL, see google-apps-script/SETUP.md).
       Leave empty to keep the "continue via Email / WhatsApp / Viber" flow and send no page views. */
    var SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycby2UXI7gO_PTQ18XP20KZfu_Ff2yWNtxUk6DRdEKiyL9LHhEgitoFoiDHQmJYe7PuPlkg/exec';

    var CONTACT = {
        email: 'jomersonnazaire@gmail.com',
        phoneIntl: '639461448138', // digits only, used for wa.me and Viber
        phoneDisplay: '+63 946 144 8138'
    };

    var reduceMotionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    function prefersReducedMotion() {
        return !!(reduceMotionQuery && reduceMotionQuery.matches);
    }

    /* ------------------------------------------------------------------
       Project data (shared by the project detail page)
       ------------------------------------------------------------------ */
    var PROJECT_IMG = 'Assets/Images/Project-Portfolio/';
    var PROJECTS = {
        "turks-one-portal": {
            "title": "Turks One Portal",
            "summary": "Ordering and Daily Sales Report portal for franchisee and company-owned stores, integrated with SAP Business One.",
            "client": "Ze\u00f1arosa Food Corporation",
            "type": "Web application (React + .NET Core API) with SAP Business One integration",
            "role": "Lead Developer",
            "problem": [
                "Ze\u00f1arosa Food Corporation runs SAP Business One as its head-office ERP. They wanted one platform where franchisee and company-owned stores could order supply items and submit their Daily Sales Reports (DSR), with every request going through an approval step by their associates.",
                "Once a request was approved, the matching document had to be created in SAP Business One without anyone encoding the data by hand."
            ],
            "built": [
                "A web-based ordering and DSR reporting platform with three user types: Franchisee, Company-Owned and Associates.",
                "Franchisees order supply items from the franchisor and submit DSRs, so inventory counts of supply items can be tracked.",
                "Company-owned stores request inventory transfers from the franchisor branch and submit their own DSRs.",
                "Associates review, update, revise or decline order requests, inventory transfer requests and DSRs.",
                "Every item movement is integrated with the client\u2019s SAP Business One database as Sales Orders and Inventory Transfers.",
                "A company-owned store\u2019s DSR generates a Sales Invoice in SAP Business One to bill the branch and record its daily sales."
            ],
            "tech": [
                ".NET Core",
                "React",
                "SAP Service Layer"
            ],
            "cover": {
                "name": "turks-one-dashboard",
                "large": 1600,
                "w": 1600,
                "h": 723,
                "alt": "Turks One Portal dashboard with store tiles showing active orders and buttons to create sales orders and DSRs; store names and addresses are blurred.",
                "caption": "Dashboard: every store tile shows its active orders and quick actions. Store names and addresses are blurred."
            },
            "gallery": [
                {
                    "name": "turks-one-login",
                    "large": 1600,
                    "w": 1600,
                    "h": 713,
                    "alt": "Turks Portal sign-in page with login code and password fields, powered by Xceler8 Technologies Inc.",
                    "caption": "Sign-in page."
                },
                {
                    "name": "turks-one-dashboard",
                    "large": 1600,
                    "w": 1600,
                    "h": 723,
                    "alt": "Turks One Portal dashboard with store tiles showing active orders and buttons to create sales orders and DSRs; store names and addresses are blurred.",
                    "caption": "Dashboard: every store tile shows its active orders and quick actions. Store names and addresses are blurred."
                },
                {
                    "name": "turks-one-sales-order",
                    "large": 1600,
                    "w": 1600,
                    "h": 719,
                    "alt": "An approved, locked sales order in Turks One Portal with its SAP document number, delivery date and order lines; store, address and price details are blurred.",
                    "caption": "Approved sales order with its SAP Business One document number. Store, address and amounts are blurred."
                },
                {
                    "name": "turks-one-dsr",
                    "large": 1600,
                    "w": 1600,
                    "h": 735,
                    "alt": "Daily Sales Report screen with sales per channel (Store, Food Panda, Grab), item lines with VAT and a sales summary; all amounts are blurred.",
                    "caption": "Daily Sales Report: sales per channel, VAT per item and a sales summary. Amounts are blurred."
                }
            ]
        },
        "esweldo-v3": {
            "title": "eSweldo V3",
            "summary": "Multi-tenant SaaS rebuild of the eSweldo payroll and HR system, with a new Recruitment module and AI applicant analysis.",
            "client": "Xceler8 Technologies Inc. (in-house product)",
            "type": "Web application (SaaS)",
            "role": "R&D Lead Developer",
            "problem": [
                "The legacy eSweldo software had to be installed in each client\u2019s own environment, could not serve multiple tenants, and had no AI features."
            ],
            "built": [
                "A rebuilt web application with an updated user interface and updated features.",
                "Multi-tenant SaaS setup, replacing per-client installations.",
                "A new Recruitment module for managing job postings and applicants.",
                "An AI analyzer that reviews applicants for a job listing and records its decision (shortlist or decline) with a written rationale."
            ],
            "tech": [
                "C#",
                ".NET Core",
                "React"
            ],
            "results": [
                "Turned eSweldo into a SaaS application with a multi-tenant setup.",
                "A more advanced and more usable product than the legacy version."
            ],
            "cover": {
                "name": "esweldo-v3-dashboard",
                "large": 1600,
                "w": 1600,
                "h": 721,
                "alt": "eSweldo V3 dashboard for Xceler8 Technologies, Inc. showing open job listings and modules for Employees, Daily Time Record, Payroll, Recruitment, System and My Leave.",
                "caption": "Dashboard with open job listings and the main modules."
            },
            "gallery": [
                {
                    "name": "esweldo-v3-dashboard",
                    "large": 1600,
                    "w": 1600,
                    "h": 721,
                    "alt": "eSweldo V3 dashboard for Xceler8 Technologies, Inc. showing open job listings and modules for Employees, Daily Time Record, Payroll, Recruitment, System and My Leave.",
                    "caption": "Dashboard with open job listings and the main modules."
                },
                {
                    "name": "esweldo-v3-ai-applicant-analysis",
                    "large": 1600,
                    "w": 1600,
                    "h": 727,
                    "alt": "AI Applicant Analysis dialog listing applicants for a Developer job with the AI decision, status and the AI\u2019s rationale; applicant names and email addresses are blurred.",
                    "caption": "AI Applicant Analysis: decision and rationale per applicant. Applicant names and emails are blurred."
                }
            ]
        },
        "jaeia-workflow": {
            "title": "JAEIA Workflow Designer",
            "summary": "An n8n-inspired, node-based workflow designer that cuts the developer effort behind simple integrations.",
            "client": "Xceler8 Technologies Inc. (in-house tool)",
            "type": "WPF desktop app",
            "problem": [
                "Even simple integrations with SAP Business One took developer effort. The goal was a tool that minimizes that effort."
            ],
            "built": [
                "Inspired by n8n: a visual workflow designer with a node-based, drag-and-drop canvas and infinite zoom and pan.",
                "A graph-based execution engine with branching and conditional logic: success and failure paths with automatic routing.",
                "11 node types: HTTP Request, Transform Data, Variable, File, Directory, SQL Query, Email, For Each, File Extraction, Transform and Logging.",
                "Integration with REST APIs, databases, file systems and email, plus CSV, JSON and XML parsing and transformation.",
                "A C# scripting engine built on Roslyn for data transformation.",
                "Real-time execution with visual feedback, async execution with cancellation, and ForEach loops for batch processing.",
                "Centralized logging with HTTP request tracking.",
                "Workflows saved as .jflow files, in a modern Fluent Design UI."
            ],
            "tech": [
                "C#",
                "WPF",
                "Roslyn",
                "REST API"
            ],
            "results": [
                "Speeds up the development of simpler integration requirements on any system, not only SAP Business One."
            ],
            "cover": {
                "name": "jaeia-workflow-designer",
                "large": 1600,
                "w": 1600,
                "h": 645,
                "alt": "JAEIA Workflow Designer V2 canvas with an Excel-file-to-SAP-Business-One-invoice workflow built from connected nodes, with green success and red failure paths.",
                "caption": "Workflow canvas: an Excel file to SAP Business One invoice workflow."
            },
            "gallery": [
                {
                    "name": "jaeia-workflow-designer",
                    "large": 1600,
                    "w": 1600,
                    "h": 645,
                    "alt": "JAEIA Workflow Designer V2 canvas with an Excel-file-to-SAP-Business-One-invoice workflow built from connected nodes, with green success and red failure paths.",
                    "caption": "Workflow canvas: an Excel file to SAP Business One invoice workflow."
                },
                {
                    "name": "jaeia-workflow-console",
                    "large": 1600,
                    "w": 1600,
                    "h": 821,
                    "alt": "A sales invoice workflow on the JAEIA canvas with the execution console below it; license hardware IDs and a client name in the file paths are blurred.",
                    "caption": "Execution console with live log messages. License IDs and a client name are blurred."
                }
            ]
        },
        "online-ordering": {
            "title": "Online Ordering Portal & Mobile App",
            "summary": "Web portal and mobile app that lets Gold Label\u2019s agents across the Philippines create SAP Business One sales orders.",
            "client": "Gold Label",
            "type": "Web portal, mobile app and API",
            "role": "Developer and Project Manager",
            "problem": [
                "Gold Label needed an application where its agents could list down local market orders, online and offline."
            ],
            "built": [
                "A web portal, built with ASP.NET Core Razor Pages and SQL Server, for entering sales orders.",
                "A Flutter mobile app for agents, with a daily sales order summary that shows each order\u2019s sync status.",
                "Orders from the portal and the app create Sales Orders in the client\u2019s SAP Business One system."
            ],
            "tech": [
                "C#",
                "ASP.NET Core",
                "Razor Pages",
                "SQL Server",
                "Flutter",
                "Dart"
            ],
            "results": [
                "Saved the SAP Business One licenses that would otherwise be needed to create sales orders.",
                "Used by agents all over the Philippines to create orders in Gold Label Products at the same time integrated in SAP Business One."
            ],
            "cover": {
                "name": "online-ordering-portal",
                "large": 1600,
                "w": 1600,
                "h": 969,
                "alt": "Online ordering web portal\u2019s sales order entry form beside the mobile app\u2019s Sales Order Summary with synced orders; customer names, amounts and the signed-in user\u2019s email are blurred.",
                "caption": "Web portal order entry (left) and the mobile app\u2019s order summary (right). Customer names, amounts and a user email are blurred."
            },
            "gallery": [
                {
                    "name": "online-ordering-portal",
                    "large": 1600,
                    "w": 1600,
                    "h": 969,
                    "alt": "Online ordering web portal\u2019s sales order entry form beside the mobile app\u2019s Sales Order Summary with synced orders; customer names, amounts and the signed-in user\u2019s email are blurred.",
                    "caption": "Web portal order entry (left) and the mobile app\u2019s order summary (right). Customer names, amounts and a user email are blurred."
                }
            ]
        },
        "photobooth": {
            "title": "PhotoBooth Kiosk App",
            "summary": "Personal WPF photo booth kiosk with templates, multi-capture, stickers, printing, cloud downloads and a PIN-protected admin.",
            "client": "Personal project",
            "type": "WPF desktop app (kiosk)",
            "role": "Developer",
            "problem": [
                "I set out to build a full photo booth app, similar to the PHOTOISM booth software: the guest-facing kiosk and the admin tools behind it."
            ],
            "built": [
                {
                    "heading": "Kiosk",
                    "items": [
                        "Category home (Original, Custom, Artist, Characters, Events) with configurable visibility and featured tiles.",
                        "Optional event mode: a Welcome Event screen leads straight to frame selection.",
                        "Cut templates (photo slots, decoration, frame and background options) and frame templates (design layers linked to a cut).",
                        "Payment step with a unit price and minimum print quantity, skipped when the price is zero.",
                        "Sequential or multi-capture, filters, session preview and a sticker editor.",
                        "Output: final preview, printing, an optional MP4 render of the template background, and session ZIP upload when S3 is enabled.",
                        "Optional full-screen idle ads, per-screen kiosk backgrounds and a configurable booth name."
                    ]
                },
                {
                    "heading": "Admin",
                    "items": [
                        "PIN-protected admin home for templates, sub-categories, hardware, sessions and import/export.",
                        "Cut and frame designers with slots, layers, QR codes, kiosk thumbnails and pricing.",
                        "Settings for featured templates, ads, global stickers, filters, camera, printer, S3 and the application itself.",
                        "Session history with preview, zoom, reprint and image export.",
                        "Export and import of the whole booth setup as a single ZIP."
                    ]
                }
            ],
            "tech": [
                "C#",
                "WPF",
                "Cloud services"
            ],
            "cover": {
                "name": "photobooth-categories",
                "large": 1600,
                "w": 1600,
                "h": 874,
                "alt": "Photo booth kiosk home screen, Choose a Category, with tiles for Original, Artist, Characters, Custom, SB19 and SANRIO.",
                "caption": "Kiosk home: choose a category."
            },
            "gallery": [
                {
                    "name": "photobooth-categories",
                    "large": 1600,
                    "w": 1600,
                    "h": 874,
                    "alt": "Photo booth kiosk home screen, Choose a Category, with tiles for Original, Artist, Characters, Custom, SB19 and SANRIO.",
                    "caption": "Kiosk home: choose a category."
                },
                {
                    "name": "photobooth-frames",
                    "large": 1600,
                    "w": 1600,
                    "h": 879,
                    "alt": "Choose Your Frame screen listing four-photo strip frames in an artist sub-category, each with its price.",
                    "caption": "Frame selection with per-frame pricing."
                },
                {
                    "name": "photobooth-photo-select",
                    "large": 1600,
                    "w": 1600,
                    "h": 878,
                    "alt": "Photo captured screen where the guest picks which captures fill each slot of a four-photo strip; the session QR code is blurred.",
                    "caption": "Pick a capture for each slot. Session QR code blurred."
                },
                {
                    "name": "photobooth-decorate",
                    "large": 1600,
                    "w": 1600,
                    "h": 869,
                    "alt": "Decorate step with the finished photo strip, a filter picker and a sticker palette; the session QR code is blurred.",
                    "caption": "Decorate with filters and stickers. Session QR code blurred."
                },
                {
                    "name": "photobooth-final-preview",
                    "large": 1600,
                    "w": 1600,
                    "h": 878,
                    "alt": "Your Photo screen with the finished strip and Print and Finish buttons; the session QR code is blurred.",
                    "caption": "Final preview before printing. Session QR code blurred."
                },
                {
                    "name": "photobooth-admin-cut-designer",
                    "large": 1600,
                    "w": 1600,
                    "h": 845,
                    "alt": "Admin cut designer editing a 3-cut layout, with kiosk frame options, background colors, QR mode and a layer list of photo slots.",
                    "caption": "Admin: cut designer with slots, layers and QR settings."
                },
                {
                    "name": "photobooth-admin-frame-designer",
                    "large": 1600,
                    "w": 1600,
                    "h": 835,
                    "alt": "Admin frame designer for an artist frame, with unit price, minimum print quantity, capture settings and template layers.",
                    "caption": "Admin: frame designer with pricing and capture settings."
                },
                {
                    "name": "photobooth-download-page",
                    "large": 1600,
                    "w": 1600,
                    "h": 696,
                    "alt": "PhotoBooth download page, opened from the session QR code, offering the final photo (JPG) and video (MP4) for 3 days.",
                    "caption": "Guest download page for the photo and video when QR Code is Scanned from the Print Out Image."
                }
            ]
        },
        "sap-b1-addons": {
            "title": "SAP Business One Tax Add-ons",
            "summary": "Xceler8\u2019s in-house Philippine Tax Module add-on, which extracts BIR compliance reports from SAP Business One.",
            "client": "Xceler8 Technologies Inc. (in-house product)",
            "type": "SAP Business One add-on",
            "year": "2018",
            "role": "Developer",
            "problem": [
                "Xceler8 needed an in-house product that extracts BIR (Bureau of Internal Revenue) compliance reports from SAP Business One. The result is the Philippine Tax Module add-on."
            ],
            "built": [
                "Maintained the add-on\u2019s original source code.",
                "Added licensing features.",
                "Built new BIR reports.",
                "Centralized the sourcing of the reports."
            ],
            "tech": [
                "C#",
                "SQL",
                "Crystal Reports"
            ],
            "results": [
                "The add-on is still on the market and still used by most XTI clients."
            ],
            "cover": {
                "name": "sap-b1-addons-tax-module",
                "large": 1600,
                "w": 1600,
                "h": 899,
                "alt": "Philippine Tax Module by Xceler8 Technologies: a BIR 0619-E form generated in SAP Business One next to its parameter window; taxpayer details and TINs are blurred.",
                "caption": "A BIR form generated by the add-on. Taxpayer details are blurred."
            },
            "gallery": [
                {
                    "name": "sap-b1-addons-tax-module",
                    "large": 1600,
                    "w": 1600,
                    "h": 899,
                    "alt": "Philippine Tax Module by Xceler8 Technologies: a BIR 0619-E form generated in SAP Business One next to its parameter window; taxpayer details and TINs are blurred.",
                    "caption": "A BIR form generated by the add-on. Taxpayer details are blurred."
                },
                {
                    "name": "sap-b1-addons-license-admin",
                    "large": 1237,
                    "w": 1237,
                    "h": 750,
                    "alt": "SAP Business One menu with the add-on\u2019s BIR/TAX Reports folder (BIR setup, withholding tax forms, 2307, 2550, 1702, Books of Account) beside its License Administration window; company and user names are blurred.",
                    "caption": "BIR/TAX Reports menu and the License Administration window. Company and user names are blurred."
                }               , {
                    "name": "bir-reports-1601-eq",
                    "large": 1240,
                    "w": 1240,
                    "h": 1755,
                    "alt": "BIR Form 1601-EQ quarterly remittance return printed from SAP Business One; taxpayer name, TIN, address, contact details and all amounts are blurred.",
                    "caption": "BIR Form 1601-EQ. Taxpayer details and amounts are blurred."
                },
                {
                    "name": "bir-reports-2550m",
                    "large": 1240,
                    "w": 1240,
                    "h": 1755,
                    "alt": "BIR Form 2550M monthly value-added tax declaration printed from SAP Business One; taxpayer name, TIN, address, contact details and all amounts are blurred.",
                    "caption": "BIR Form 2550M, page 1. Taxpayer details and amounts are blurred."
                }
            ]
        },
        "bir-reports": {
            "title": "SAP Business One BIR Reports",
            "summary": "Crystal Reports built on the BIR-mandated form layouts for Xceler8\u2019s SAP Business One add-on.",
            "client": "Xceler8 Technologies Inc.",
            "type": "Crystal Reports for an SAP Business One add-on",
            "role": "Developer",
            "problem": [
                "Xceler8\u2019s SAP Business One add-on needed updated reports that follow the layouts mandated by the BIR (Bureau of Internal Revenue)."
            ],
            "built": [
                "Crystal Reports that follow the BIR-mandated form layouts, used by corporate companies.",
                "Reports printed straight from SAP Business One, such as BIR Form 1601-EQ (quarterly remittance return of creditable income taxes withheld) and BIR Form 2550M (monthly VAT declaration)."
            ],
            "tech": [
                "Crystal Reports",
                "SAP Business One"
            ],
            "results": [
                "The reports are used locally by companies in the Philippines."
            ],
            "cover": {
                "name": "bir-reports-cover",
                "large": 1600,
                "w": 1600,
                "h": 900,
                "alt": "BIR Form 1601-EQ and BIR Form 2550M reports side by side, with taxpayer details and amounts blurred."
            },
            "gallery": [
                {
                    "name": "bir-reports-1601-eq",
                    "large": 1240,
                    "w": 1240,
                    "h": 1755,
                    "alt": "BIR Form 1601-EQ quarterly remittance return printed from SAP Business One; taxpayer name, TIN, address, contact details and all amounts are blurred.",
                    "caption": "BIR Form 1601-EQ. Taxpayer details and amounts are blurred."
                },
                {
                    "name": "bir-reports-2550m",
                    "large": 1240,
                    "w": 1240,
                    "h": 1755,
                    "alt": "BIR Form 2550M monthly value-added tax declaration printed from SAP Business One; taxpayer name, TIN, address, contact details and all amounts are blurred.",
                    "caption": "BIR Form 2550M, page 1. Taxpayer details and amounts are blurred."
                }
            ],
            "coverNote": "Cover made from the two report screenshots below."
        },
        "service-layer-integration": {
            "title": "SAP Business One Service Layer Integration",
            "summary": "Windows apps, portals and mobile solutions for Xceler8 clients, built on the SAP Business One Service Layer.",
            "client": "Xceler8 Technologies clients",
            "type": "Windows apps, web portals and mobile apps",
            "role": "Developer",
            "problem": [
                "Xceler8\u2019s clients wanted to get more out of SAP Business One in their current processes."
            ],
            "built": [
                "Proposed solutions based on each client\u2019s requirements, then built them.",
                "Solutions that use the SAP Business One Service Layer.",
                "Delivered as Windows apps, web portals or mobile apps, depending on what each client needed."
            ],
            "tech": [
                "C#",
                "SAP Service Layer"
            ],
            "cover": {
                "name": "service-layer-integration",
                "large": 1280,
                "w": 1280,
                "h": 720,
                "alt": "Illustration of SAP Business One connected to other systems through APIs."
            },
            "gallery": [],
            "coverNote": "Illustration: no screenshots are available for this project."
        },
        "rental-hub-booking": {
            "title": "Rental Hub Booking App",
            "summary": "Personal project: one platform where rental owners manage bookings and schedules, and renters find available rentals nearby.",
            "client": "Personal project",
            "type": "React web app and mobile app",
            "role": "Analyst and Developer",
            "problem": [
                "Rental owners post their properties on social media and manage their schedules by hand.",
                "Renters who find a listing there can\u2019t tell whether it is free on their preferred date, so they have to wait for the owner to confirm."
            ],
            "built": [
                "A centralized platform where rental owners post their rental properties and manage their schedules.",
                "Renters find available rental properties near a selected area.",
                "Owner features: bookings, calendar, earnings, profile, vehicles and partnerships.",
                "Renter features: search, booking process, payment, profile and verification.",
                "Booking rescheduling and a wallet."
            ],
            "tech": [
                "C#",
                ".NET Core",
                "Flutter",
                "React"
            ],
            "cover": {
                "name": "rental-hub-booking-cover",
                "large": 1600,
                "w": 1600,
                "h": 900,
                "alt": "Rental Hub title card: Online Booking and Schedule Management App. No screenshots are available yet."
            },
            "gallery": [],
            "coverNote": "Title card: no screenshots are available yet."
        }
    };

    /* ------------------------------------------------------------------
       Helpers
       ------------------------------------------------------------------ */
    function $(sel, root) { return (root || document).querySelector(sel); }
    function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function icon(name) {
        return '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-' + name + '"></use></svg>';
    }

    var toastTimer;
    function announce(message, type) {
        var region = document.getElementById('toast');
        if (!region) return;
        region.className = 'toast toast--' + (type || 'info');
        region.textContent = '';
        // Re-insert text on the next frame so screen readers announce repeats.
        window.requestAnimationFrame(function () {
            region.textContent = message;
            region.classList.add('is-visible');
        });
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { region.classList.remove('is-visible'); }, 6000);
    }

    /* ------------------------------------------------------------------
       Footer year
       ------------------------------------------------------------------ */
    function initYear() {
        $all('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
    }

    /* ------------------------------------------------------------------
       Header: scrolled state + mobile menu
       ------------------------------------------------------------------ */
    function initHeader() {
        var header = $('.site-header');
        if (!header) return;
        var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 24); };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    function initMobileMenu() {
        var toggle = document.getElementById('nav-toggle');
        var menu = document.getElementById('nav-menu');
        if (!toggle || !menu) return;

        var mobileQuery = window.matchMedia('(max-width: 900px)');

        function setOpen(open, returnFocus) {
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            menu.classList.toggle('is-open', open);
            document.documentElement.classList.toggle('menu-open', open);
            if (mobileQuery.matches) {
                if (open) { menu.removeAttribute('inert'); } else { menu.setAttribute('inert', ''); }
            }
            if (open) {
                var first = menu.querySelector('a');
                if (first) first.focus();
            } else if (returnFocus) {
                toggle.focus();
            }
        }

        function syncToViewport() {
            // Desktop: links always reachable. Mobile: closed menu is inert (out of tab order).
            if (mobileQuery.matches) {
                if (!menu.classList.contains('is-open')) menu.setAttribute('inert', '');
            } else {
                menu.removeAttribute('inert');
                if (menu.classList.contains('is-open')) setOpen(false, false);
            }
        }

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true', false);
        });

        // Close after choosing a link (the browser still follows the #hash).
        $all('a', menu).forEach(function (link) {
            link.addEventListener('click', function () {
                if (menu.classList.contains('is-open')) setOpen(false, false);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (!menu.classList.contains('is-open')) return;
            if (e.key === 'Escape') { setOpen(false, true); return; }
            if (e.key !== 'Tab') return;
            // Keep focus inside the open menu panel (toggle + links).
            var links = $all('a', menu);
            var last = links[links.length - 1];
            if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); toggle.focus(); }
            else if (e.shiftKey && document.activeElement === toggle) { e.preventDefault(); last.focus(); }
        });

        document.addEventListener('click', function (e) {
            if (menu.classList.contains('is-open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
                setOpen(false, false);
            }
        });

        if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', syncToViewport);
        syncToViewport();
    }

    /* Highlight the nav link of the section in view (index page only). */
    function initActiveNav() {
        var links = $all('.nav-menu a[href^="#"]');
        if (!links.length || !('IntersectionObserver' in window)) return;
        var map = {};
        links.forEach(function (link) {
            var section = document.getElementById(link.getAttribute('href').slice(1));
            if (section) map[section.id] = link;
        });
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (l) { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
                var active = map[entry.target.id];
                if (active) { active.classList.add('is-active'); active.setAttribute('aria-current', 'true'); }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        Object.keys(map).forEach(function (id) { observer.observe(document.getElementById(id)); });
    }

    /* ------------------------------------------------------------------
       Hero video: only on wider screens, never with reduced motion or Save-Data.
       The poster (CSS background) is shown otherwise.
       ------------------------------------------------------------------ */
    function initHeroVideo() {
        var video = document.getElementById('hero-video');
        var control = document.getElementById('video-toggle');
        if (!video) return;

        var conn = navigator.connection || {};
        var wide = window.matchMedia('(min-width: 768px)').matches;
        if (!wide || prefersReducedMotion() || conn.saveData) return;

        var sources = [
            { src: video.getAttribute('data-src-webm'), type: 'video/webm' },
            { src: video.getAttribute('data-src-mp4'), type: 'video/mp4' }
        ];
        sources.forEach(function (s) {
            if (!s.src) return;
            var el = document.createElement('source');
            el.src = s.src;
            el.type = s.type;
            video.appendChild(el);
        });
        video.load();

        function setPaused(paused) {
            if (!control) return;
            control.setAttribute('aria-pressed', String(paused));
            control.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
            control.innerHTML = icon(paused ? 'play' : 'pause');
        }

        video.addEventListener('playing', function () {
            video.classList.add('is-playing');
            if (control) control.hidden = false;
            setPaused(false);
        });
        video.addEventListener('pause', function () { setPaused(true); });

        var p = video.play();
        if (p && p.catch) p.catch(function () { /* autoplay blocked: poster stays visible */ });

        if (control) {
            control.addEventListener('click', function () {
                if (video.paused) { video.play(); } else { video.pause(); }
            });
        }

        // Respect a reduced-motion change while the page is open.
        if (reduceMotionQuery && reduceMotionQuery.addEventListener) {
            reduceMotionQuery.addEventListener('change', function (e) { if (e.matches) video.pause(); });
        }
    }

    /* ------------------------------------------------------------------
       Services: "Inquire" prefills the contact message
       ------------------------------------------------------------------ */
    function initServiceInquiry() {
        var message = document.getElementById('message');
        var contact = document.getElementById('contact');
        if (!message || !contact) return;

        $all('.service-cta').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var template = btn.getAttribute('data-template') || '';
                if (template) message.value = 'Hi Jomerson, ' + template + '\n\n';
                contact.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
                if (history.replaceState) history.replaceState(null, '', '#contact');
                // Focus without jumping again; put the caret at the end of the text.
                setTimeout(function () {
                    message.focus({ preventScroll: true });
                    var end = message.value.length;
                    try { message.setSelectionRange(end, end); } catch (err) { /* ignore */ }
                }, prefersReducedMotion() ? 0 : 450);
            });
        });
    }

    /* ------------------------------------------------------------------
       Contact: honest "continue via Email / WhatsApp / Viber" flow.
       Nothing is sent from this site. The visitor's text stays in the form
       until they choose to clear it.
       ------------------------------------------------------------------ */
    function initContactForm() {
        var form = document.getElementById('contact-form');
        if (!form) return;
        if (SHEET_ENDPOINT) { initSheetContactForm(form); return; }

        var dialog = document.getElementById('contact-dialog');
        if (!dialog || typeof dialog.showModal !== 'function') return;

        var preview = $('#contact-preview', dialog);
        var stepChoose = $('[data-step="choose"]', dialog);
        var stepDone = $('[data-step="done"]', dialog);
        var doneText = $('#contact-done-text', dialog);
        var linkEmail = $('[data-channel="email"]', dialog);
        var linkWhatsApp = $('[data-channel="whatsapp"]', dialog);
        var linkViber = $('[data-channel="viber"]', dialog);
        var copyBtn = $('[data-action="copy"]', dialog);
        var clearBtn = $('[data-action="clear"]', dialog);
        var submitBtn = form.querySelector('button[type="submit"]');
        var composed = '';

        function compose() {
            var name = form.elements.name.value.trim();
            var email = form.elements.email.value.trim();
            var message = form.elements.message.value.trim();
            composed = 'Hello Jomerson,\n\n' + message + '\n\nBest regards,\n' + name + '\nEmail: ' + email;
            var subject = 'Project inquiry from ' + name;
            linkEmail.href = 'mailto:' + CONTACT.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(composed);
            linkWhatsApp.href = 'https://wa.me/' + CONTACT.phoneIntl + '?text=' + encodeURIComponent(composed);
            linkViber.href = 'viber://chat?number=%2B' + CONTACT.phoneIntl + '&draft=' + encodeURIComponent(composed);
            preview.textContent = composed;
        }

        function showStep(step) {
            stepChoose.hidden = step !== 'choose';
            stepDone.hidden = step !== 'done';
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.checkValidity()) { form.reportValidity(); return; }
            compose();
            showStep('choose');
            dialog.showModal();
        });

        [linkEmail, linkWhatsApp, linkViber].forEach(function (link) {
            link.addEventListener('click', function () {
                var label = link.getAttribute('data-label');
                doneText.textContent = label + ' should now be open with your message ready. Please press send there. Your text is still in the form here until you clear it.';
                showStep('done');
                announce('Opening ' + label + '. Your message has not been sent yet; send it from ' + label + '.', 'info');
                var heading = $('#contact-done-title', dialog);
                if (heading) heading.focus();
            });
        });

        if (copyBtn) {
            copyBtn.addEventListener('click', function () {
                var done = function () { announce('Message copied to the clipboard.', 'success'); };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(composed).then(done, function () {
                        announce('Copy failed. Please select the message text and copy it manually.', 'error');
                    });
                } else {
                    announce('Copy is not supported here. Please select the message text and copy it manually.', 'error');
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                form.reset();
                dialog.close();
                announce('Form cleared. Thanks for getting in touch!', 'success');
            });
        }

        $all('[data-action="close"]', dialog).forEach(function (btn) {
            btn.addEventListener('click', function () { dialog.close(); });
        });

        // Click on the backdrop closes the dialog.
        dialog.addEventListener('click', function (e) {
            if (e.target === dialog) dialog.close();
        });

        dialog.addEventListener('close', function () {
            if (submitBtn) submitBtn.focus();
        });
    }

    /* ------------------------------------------------------------------
       Google Sheet: anonymous IDs + sending
       ------------------------------------------------------------------ */
    function randomId() {
        if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
        var s = '';
        for (var i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16);
        return s.slice(0, 8) + '-' + s.slice(8, 12) + '-' + s.slice(12, 16) + '-' + s.slice(16, 20) + '-' + s.slice(20);
    }

    // Random, anonymous IDs: visitor (localStorage) and session (sessionStorage). No cookies.
    var memoryIds = {};
    function storedId(storageName, key) {
        try {
            var store = window[storageName];
            var id = store.getItem(key);
            if (!id) { id = randomId(); store.setItem(key, id); }
            return id;
        } catch (err) {
            // Storage blocked (privacy mode): keep an ID for this page only.
            if (!memoryIds[key]) memoryIds[key] = randomId();
            return memoryIds[key];
        }
    }
    function visitorId() { return storedId('localStorage', 'jn-visitor-id'); }
    function sessionId() { return storedId('sessionStorage', 'jn-session-id'); }

    // Only origin + path of the referrer, never its query string.
    function cleanReferrer() {
        if (!document.referrer) return '';
        try { var u = new URL(document.referrer); return u.origin + u.pathname; } catch (err) { return ''; }
    }

    // POST JSON as text/plain (a "simple" request, so no CORS preflight) and read the JSON reply.
    function postToSheet(payload, timeoutMs) {
        var controller = typeof AbortController === 'function' ? new AbortController() : null;
        var timer;
        var request = fetch(SHEET_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload),
            credentials: 'omit',
            redirect: 'follow',
            signal: controller ? controller.signal : undefined
        }).then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        });
        var timeout = new Promise(function (resolve, reject) {
            timer = setTimeout(function () {
                if (controller) controller.abort();
                reject(new Error('timeout'));
            }, timeoutMs);
        });
        return Promise.race([request, timeout]).then(
            function (value) { clearTimeout(timer); return value; },
            function (err) { clearTimeout(timer); throw err; }
        );
    }

    /* Contact form, Google Sheet mode: the message is saved to the sheet. */
    function initSheetContactForm(form) {
        var submitBtn = form.querySelector('button[type="submit"]');
        var label = submitBtn ? submitBtn.querySelector('.btn-label') : null;
        var note = document.getElementById('contact-note');
        var status = document.getElementById('form-status');
        var sending = false;

        if (label) label.textContent = 'Send message';
        if (note) note.textContent = 'Your message is stored securely in my Google Sheet so I can reply. Prefer Email, WhatsApp or Viber? Use the contact details beside the form.';

        function setStatus(kind, html) {
            if (!status) return;
            status.className = 'form-status' + (kind ? ' form-status--' + kind : '');
            status.innerHTML = html;
        }

        function fallbackLinks(name, email, message) {
            var text = 'Hello Jomerson,\n\n' + message + '\n\nBest regards,\n' + name + '\nEmail: ' + email;
            var mail = 'mailto:' + CONTACT.email + '?subject=' + encodeURIComponent('Project inquiry from ' + name) + '&body=' + encodeURIComponent(text);
            var wa = 'https://wa.me/' + CONTACT.phoneIntl + '?text=' + encodeURIComponent(text);
            return '<a href="' + escapeHtml(mail) + '">send it by Email</a> or ' +
                '<a href="' + escapeHtml(wa) + '" target="_blank" rel="noopener">WhatsApp<span class="sr-only"> (opens in a new tab)</span></a>';
        }

        function setBusy(busy) {
            sending = busy;
            form.setAttribute('aria-busy', String(busy));
            if (!submitBtn) return;
            submitBtn.setAttribute('aria-disabled', String(busy));
            if (label) label.textContent = busy ? 'Sending\u2026' : 'Send message';
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (sending) return;
            if (!form.checkValidity()) { form.reportValidity(); return; }

            var name = form.elements.name.value.trim();
            var email = form.elements.email.value.trim();
            var message = form.elements.message.value.trim();
            var honeypot = form.elements.website ? form.elements.website.value : '';

            // A filled honeypot means a bot: show the normal success state, send nothing.
            if (honeypot) {
                form.reset();
                setStatus('success', 'Message sent, thank you! I\u2019ll get back to you soon.');
                return;
            }

            setBusy(true);
            setStatus('sending', 'Sending your message\u2026');

            postToSheet({
                type: 'message',
                name: name,
                email: email,
                subject: form.elements.subject ? form.elements.subject.value.trim() : '',
                message: message,
                page: location.pathname,
                referrer: cleanReferrer(),
                userAgent: navigator.userAgent,
                visitorId: visitorId(),
                website: honeypot
            }, 15000).then(function (res) {
                if (res && res.ok) {
                    form.reset();
                    setStatus('success', 'Message sent, thank you! I\u2019ll get back to you soon.');
                    announce('Message sent, thank you!', 'success');
                    return;
                }
                var reason = res && res.error;
                if (reason === 'rate_limited') {
                    setStatus('error', 'You\u2019ve sent a few messages in a short time. Please wait a few minutes and try again, or ' + fallbackLinks(name, email, message) + '. Your text is still in the form.');
                } else if (reason === 'invalid') {
                    setStatus('error', 'Please check your name, email address and message, then try again.');
                } else {
                    throw new Error(reason || 'not ok');
                }
            }).catch(function () {
                setStatus('error', 'Sorry, your message couldn\u2019t be sent right now. Your text is still in the form. Please try again, or ' + fallbackLinks(name, email, message) + '.');
            }).then(function () {
                setBusy(false);
            });
        });
    }

    /* ------------------------------------------------------------------
       Anonymous page views (one per page load). Skipped when no endpoint is
       set, on localhost, or when the browser sends Do Not Track.
       ------------------------------------------------------------------ */
    function isLocalHost() {
        var h = location.hostname;
        return !h || h === 'localhost' || h === '127.0.0.1' || h === '[::1]' || h === '::1' || /\.local$/.test(h) || location.protocol === 'file:';
    }

    function initPageView() {
        if (!SHEET_ENDPOINT) return;
        var note = document.getElementById('analytics-note');
        if (note) note.hidden = false;
        if (navigator.doNotTrack === '1' || window.doNotTrack === '1' || isLocalHost()) return;

        var sent = false;
        function send() {
            if (sent) return;
            sent = true;
            try {
                var isProject = !!document.getElementById('project-detail');
                var body = JSON.stringify({
                    type: 'pageview',
                    path: location.pathname,
                    title: document.title,
                    slug: isProject ? (new URLSearchParams(location.search).get('slug') || '') : '',
                    referrer: cleanReferrer(),
                    screen: (window.screen ? screen.width + 'x' + screen.height : ''),
                    language: navigator.language || '',
                    visitorId: visitorId(),
                    sessionId: sessionId(),
                    userAgent: navigator.userAgent
                });
                var queued = false;
                if (navigator.sendBeacon) {
                    queued = navigator.sendBeacon(SHEET_ENDPOINT, new Blob([body], { type: 'text/plain;charset=UTF-8' }));
                }
                if (!queued && window.fetch) {
                    fetch(SHEET_ENDPOINT, { method: 'POST', mode: 'no-cors', keepalive: true, credentials: 'omit', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: body })
                        .catch(function () { /* blocked or offline: page views are best effort */ });
                }
            } catch (err) { /* never let analytics break the page */ }
        }
        function schedule() {
            if ('requestIdleCallback' in window) window.requestIdleCallback(send, { timeout: 4000 });
            else setTimeout(send, 1500);
        }
        if (document.readyState === 'complete') schedule();
        else window.addEventListener('load', schedule, { once: true });
    }

    /* ------------------------------------------------------------------
       Project detail page
       ------------------------------------------------------------------ */
    // Old slugs that were merged into current case studies.
    var PROJECT_ALIASES = {
        'ph-tax-modules': 'sap-b1-addons',
        'sap-b1-integration': 'service-layer-integration'
    };

    function imgSrc(img, width) {
        return PROJECT_IMG + img.name + '-' + width + '.webp';
    }

    function listItems(items, withIcon) {
        return items.map(function (t) {
            return '<li>' + (withIcon ? icon('check') : '') + '<span>' + escapeHtml(t) + '</span></li>';
        }).join('');
    }

    function renderBuilt(built) {
        // Either a flat list of bullets, or groups of { heading, items }.
        if (built.length && typeof built[0] === 'object') {
            return built.map(function (group) {
                return '<h3 class="project-subhead">' + escapeHtml(group.heading) + '</h3>' +
                    '<ul class="project-highlights">' + listItems(group.items, true) + '</ul>';
            }).join('');
        }
        return '<ul class="project-highlights">' + listItems(built, true) + '</ul>';
    }

    function initProjectPage() {
        var container = document.getElementById('project-detail');
        if (!container) return;

        var params = new URLSearchParams(window.location.search);
        var slug = params.get('slug') || '';
        if (Object.prototype.hasOwnProperty.call(PROJECT_ALIASES, slug)) {
            slug = PROJECT_ALIASES[slug];
            if (history.replaceState) history.replaceState(null, '', 'project.html?slug=' + encodeURIComponent(slug));
        }
        var data = Object.prototype.hasOwnProperty.call(PROJECTS, slug) ? PROJECTS[slug] : null;
        var siteName = 'Jomerson Nazaire';

        var others = Object.keys(PROJECTS).filter(function (k) { return k !== slug; }).map(function (k) {
            return '<li><a class="other-project" href="project.html?slug=' + encodeURIComponent(k) + '">' +
                '<span>' + escapeHtml(PROJECTS[k].title) + '</span>' + icon('arrow-right') + '</a></li>';
        }).join('');

        if (!data) {
            document.title = 'Project not found | ' + siteName;
            container.innerHTML =
                '<div class="project-missing">' +
                    '<p class="eyebrow">Project</p>' +
                    '<h1>This project page isn\u2019t available</h1>' +
                    '<p>The link may be out of date. Here are the projects you can explore:</p>' +
                    '<ul class="other-projects">' + others + '</ul>' +
                    '<p><a class="btn btn-secondary" href="index.html#projects">' + icon('arrow-left') + 'Back to all projects</a></p>' +
                '</div>';
            return;
        }

        document.title = data.title + ' | ' + siteName;
        var desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', data.summary);
        var canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', 'https://jomersonnazaire.github.io/Digital-Portfolio/project.html?slug=' + encodeURIComponent(slug));

        var gallery = data.gallery || [];
        var cover = data.cover;
        var coverIndex = -1;
        gallery.forEach(function (g, i) { if (g.name === cover.name) coverIndex = i; });

        var tags = data.tech.map(function (t) { return '<li class="tech-tag">' + escapeHtml(t) + '</li>'; }).join('');

        var facts = [['Client', data.client], ['Type', data.type]];
        if (data.year) facts.push(['Year', data.year]);
        if (data.role) facts.push(['My role', data.role]);
        var factsHtml = facts.map(function (f) {
            return '<div class="project-fact"><dt>' + f[0] + '</dt><dd>' + escapeHtml(f[1]) + '</dd></div>';
        }).join('');

        var coverImg = '<img src="' + imgSrc(cover, cover.large) + '" srcset="' + imgSrc(cover, 800) + ' 800w, ' + imgSrc(cover, cover.large) + ' ' + cover.large + 'w" ' +
            'sizes="(max-width: 960px) 100vw, 920px" width="' + cover.w + '" height="' + cover.h + '" ' +
            'alt="' + escapeHtml(cover.alt) + '" fetchpriority="high" decoding="async">';
        var coverHtml = coverIndex >= 0
            ? '<a class="project-cover-link" href="' + imgSrc(cover, cover.large) + '" data-gallery-index="' + coverIndex + '">' + coverImg +
                '<span class="sr-only"> (open larger image)</span></a>'
            : coverImg;

        var galleryHtml = '';
        if (gallery.length > 1) {
            galleryHtml =
                '<section class="project-section" aria-labelledby="gallery-title">' +
                    '<h2 id="gallery-title">Screenshots <span class="count">(' + gallery.length + ')</span></h2>' +
                    '<ul class="project-gallery">' +
                    gallery.map(function (g, i) {
                        return '<li><figure class="gallery-item">' +
                            '<a class="gallery-link" href="' + imgSrc(g, g.large) + '" data-gallery-index="' + i + '">' +
                                '<img src="' + imgSrc(g, 800) + '" width="' + g.w + '" height="' + g.h + '" alt="' + escapeHtml(g.alt) + '" loading="lazy" decoding="async">' +
                                '<span class="sr-only"> (open larger image)</span>' +
                            '</a>' +
                            (g.caption ? '<figcaption>' + escapeHtml(g.caption) + '</figcaption>' : '') +
                        '</figure></li>';
                    }).join('') +
                    '</ul>' +
                '</section>';
        }

        var resultsHtml = (data.results && data.results.length)
            ? '<section class="project-section" aria-labelledby="results-title">' +
                '<h2 id="results-title">Results &amp; impact</h2>' +
                '<ul class="project-results">' + listItems(data.results, false) + '</ul>' +
              '</section>'
            : '';

        container.innerHTML =
            '<article class="project-article">' +
                '<header class="project-header">' +
                    '<p class="eyebrow">Case study</p>' +
                    '<h1>' + escapeHtml(data.title) + '</h1>' +
                    '<p class="project-summary">' + escapeHtml(data.summary) + '</p>' +
                    '<ul class="project-tech" aria-label="Technologies used">' + tags + '</ul>' +
                '</header>' +
                '<figure class="project-cover">' + coverHtml +
                    (coverIndex < 0 && data.coverNote ? '<figcaption>' + escapeHtml(data.coverNote) + '</figcaption>' : '') +
                '</figure>' +
                '<div class="project-body">' +
                    '<dl class="project-facts" aria-label="Project facts">' + factsHtml +
                        '<div class="project-fact project-fact--wide"><dt>Tech stack</dt><dd>' + escapeHtml(data.tech.join(', ')) + '</dd></div>' +
                    '</dl>' +
                    '<section class="project-section" aria-labelledby="problem-title">' +
                        '<h2 id="problem-title">The problem</h2>' +
                        data.problem.map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; }).join('') +
                    '</section>' +
                    '<section class="project-section" aria-labelledby="built-title">' +
                        '<h2 id="built-title">What I built</h2>' + renderBuilt(data.built) +
                    '</section>' +
                    resultsHtml +
                    galleryHtml +
                    '<div class="project-cta">' +
                        '<a class="btn btn-primary" href="index.html#contact">Discuss a similar project' + icon('arrow-right') + '</a>' +
                        '<a class="btn btn-secondary" href="index.html#projects">' + icon('arrow-left') + 'All projects</a>' +
                    '</div>' +
                '</div>' +
            '</article>' +
            '<nav class="more-projects" aria-labelledby="more-title">' +
                '<h2 id="more-title">More projects</h2>' +
                '<ul class="other-projects">' + others + '</ul>' +
            '</nav>';

        if (gallery.length) initLightbox(container, gallery);
    }

    /* Accessible click-to-enlarge viewer built on the native <dialog>.
       Without JS (or without <dialog> support) the links simply open the image file. */
    function initLightbox(container, gallery) {
        var links = $all('[data-gallery-index]', container);
        if (!links.length || typeof HTMLDialogElement !== 'function') return;

        var dialog = document.createElement('dialog');
        dialog.className = 'lightbox';
        dialog.setAttribute('aria-labelledby', 'lightbox-caption');
        var multi = gallery.length > 1;
        dialog.innerHTML =
            '<div class="lightbox-inner">' +
                '<div class="lightbox-bar">' +
                    '<p class="lightbox-count" aria-live="polite"></p>' +
                    '<button type="button" class="lightbox-btn lightbox-close" aria-label="Close image viewer">' + icon('close') + '</button>' +
                '</div>' +
                '<figure class="lightbox-figure">' +
                    '<figcaption id="lightbox-caption" class="lightbox-caption"></figcaption>' +
                '</figure>' +
                (multi
                    ? '<button type="button" class="lightbox-btn lightbox-prev" aria-label="Previous image">' + icon('arrow-left') + '</button>' +
                      '<button type="button" class="lightbox-btn lightbox-next" aria-label="Next image">' + icon('arrow-right') + '</button>'
                    : '') +
            '</div>';
        document.body.appendChild(dialog);

        var img = null; // created on first open, so the page never holds an <img> without a src
        var figure = $('.lightbox-figure', dialog);
        var caption = $('.lightbox-caption', dialog);
        var count = $('.lightbox-count', dialog);
        var current = 0;
        var opener = null;

        function show(i) {
            current = (i + gallery.length) % gallery.length;
            var g = gallery[current];
            if (!img) {
                img = document.createElement('img');
                img.className = 'lightbox-img';
                img.decoding = 'async';
                figure.insertBefore(img, caption);
            }
            img.src = imgSrc(g, g.large);
            img.width = g.w;
            img.height = g.h;
            img.alt = g.alt;
            caption.textContent = g.caption || g.alt;
            count.textContent = multi ? 'Image ' + (current + 1) + ' of ' + gallery.length : '';
        }

        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // let "open in new tab" work
                e.preventDefault();
                opener = link;
                show(parseInt(link.getAttribute('data-gallery-index'), 10) || 0);
                dialog.showModal();
            });
        });

        $('.lightbox-close', dialog).addEventListener('click', function () { dialog.close(); });
        if (multi) {
            $('.lightbox-prev', dialog).addEventListener('click', function () { show(current - 1); });
            $('.lightbox-next', dialog).addEventListener('click', function () { show(current + 1); });
        }
        dialog.addEventListener('keydown', function (e) {
            if (!multi) return;
            if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
        });
        // Clicking the dark backdrop (outside the image and controls) closes the viewer.
        dialog.addEventListener('click', function (e) {
            if (e.target === dialog || e.target.classList.contains('lightbox-inner') || e.target.classList.contains('lightbox-figure')) dialog.close();
        });
        dialog.addEventListener('close', function () {
            if (opener) opener.focus();
        });
    }

    /* ------------------------------------------------------------------
       Boot: each initializer runs independently, so one failure can't stop the rest.
       ------------------------------------------------------------------ */
    function boot() {
        [initYear, initHeader, initMobileMenu, initActiveNav, initHeroVideo,
            initServiceInquiry, initContactForm, initProjectPage, initPageView].forEach(function (fn) {
            try { fn(); } catch (err) {
                if (window.console && console.error) console.error(fn.name + ' failed:', err);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
