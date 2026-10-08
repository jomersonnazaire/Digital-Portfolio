# Jomerson Nazaire, Digital Portfolio

Personal portfolio of Jomerson Nazaire, Software Engineer (SAP Business One, C#/.NET, integrations).
Live: https://jomersonnazaire.github.io/Digital-Portfolio/

Plain static site (HTML, CSS, vanilla JS). No build step. It works on GitHub Pages under the `/Digital-Portfolio/` subpath because every URL is relative.

## Files

| Path | What it is |
|---|---|
| `index.html` | Home page: hero, About, Tech Stack, Services, Projects, Contact |
| `project.html` | Project detail page, e.g. `project.html?slug=turks-one-portal` |
| `styles.css` | All styles (dark theme, responsive, reduced-motion support) |
| `script.js` | Mobile menu, hero video loading, contact flow, anonymous page views, project detail rendering |
| `google-apps-script/` | `Code.gs` (Google Sheet web app for messages and page views) and `SETUP.md` (how to deploy it) |
| `Assets/Jomerson-Nazaire-Resume.pdf` | Resume downloaded by the "My Resume" button |
| `Assets/Video/` | Hero background video (WebM + MP4, 720p) and poster images |
| `Assets/Images/` | Headshot, project and service images (WebP) |
| `Assets/favicon.svg`, `Assets/apple-touch-icon.png`, `Assets/og-image.jpg` | Icons and social-sharing image |

## Editing projects

Project cards live in `index.html` (section `#projects`, featured project first). The case-study content for each slug lives in the `PROJECTS` object at the top of `script.js`: title, one-line summary, client, type, year, role, problem, what was built, tech, results (optional), cover image and screenshot gallery (each image with alt text and a caption). Leave a field out (for example `year`, `role` or `results`) and the detail page simply skips it. Screenshots open in an accessible full-size viewer (native `<dialog>`, arrow keys to browse, Esc to close); without JavaScript the links open the image file.

To add a project:

1. Add `name-800.webp` (800 px wide) and a larger `name-1600.webp` to `Assets/Images/Project-Portfolio/`. Blur client names, people's names, emails, phone numbers and amounts before exporting.
2. Add an entry to `PROJECTS` in `script.js` (the image `large` value is the width in the larger file name; `w`/`h` are its pixel size).
3. Add a card in `index.html` that links to `project.html?slug=<your-slug>`.

Old slugs that were merged into newer case studies (`ph-tax-modules`, `sap-b1-integration`) redirect via `PROJECT_ALIASES` in `script.js`.

## Contact form and page views

Both are controlled by `SHEET_ENDPOINT` near the top of `script.js`.

- **Empty (`''`):** nothing is sent anywhere. The form opens a dialog where the visitor chooses Email, WhatsApp or Viber, and the message opens there pre-filled. No page views are counted.
- **Set to the Apps Script `/exec` URL** (see `google-apps-script/SETUP.md`): the form posts the message straight to the owner's Google Sheet ("Messages" tab). It shows "Sending…", then "Message sent, thank you!" only after the sheet confirms. If sending fails or takes longer than 15 seconds, it shows an error with Email and WhatsApp links, and the typed text stays in the form. Each page load also records one anonymous page view ("Page Views" tab) with a random visitor ID (localStorage) and session ID (sessionStorage). It sets no cookies and stores no personal data. Nothing is sent on localhost or when Do Not Track is on.

## Images and video

Keep images at about 2x their display size and in WebP. The hero video is only loaded on screens 768 px and wider, and never when the visitor prefers reduced motion or has Save-Data on.

Icons are inline SVGs from Font Awesome Free (CC BY 4.0).
