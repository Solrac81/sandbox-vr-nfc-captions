# Sandbox VR · The Londoner Macau — Caption Generator

A simple mobile-first web page for guests at **Sandbox VR at The Londoner Macau**. Guests tap an NFC sticker (or scan a QR code), pick a language, answer two quick questions, and get a ready-to-post Instagram / 小红书 caption with hashtags. Then they tap **Copy** and paste into their social app.

No account, no app install, no build tools — just open the page.

## What guests do

1. Choose language: **English** | **繁體中文** | **简体中文**
2. What they liked most (immersion/story, friends/team, or thrills/intensity)
3. How they found you (walking by, social media, or friend/hotel tip)
4. See a caption + hashtags in their language
5. **Copy** it, or tap **Generate again** for a slight variation

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `styles.css` | Mobile-first dark / VR look |
| `app.js` | Language UI + 27 caption templates + copy button |
| `.gitignore` | Ignores OS junk / editor files |

## How to open locally (no install)

1. Download or clone this folder.
2. Double-click `index.html`, **or** open it from a browser (File → Open).
3. For the most reliable **Copy** button (some browsers restrict clipboard on `file://`), serve the folder with any tiny local server, for example:
   - **macOS / Linux:** open Terminal in this folder and run  
     `python3 -m http.server 8080`  
     then visit `http://localhost:8080`
   - **VS Code / Cursor:** use the “Live Preview” or “Live Server” extension

It works offline once the files are on the device.

## How to deploy (so NFC / QR can use HTTPS)

NFC tags and phone cameras work best with a public **HTTPS** URL.

### Option A — GitHub Pages (free)

1. Create a GitHub repository and upload these files (or push with Git).
2. In the repo: **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**, select `main` (or `master`), folder `/ (root)`, Save.
4. After a minute, GitHub shows a URL like:  
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`
5. Open that URL on your phone to confirm it works.

### Option B — Vercel (free, static)

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub is easiest).
2. **Add New Project** → import this repo (or drag-and-drop the folder).
3. Leave settings as default (static site — no build command needed).
4. Deploy. You get a URL like `https://something.vercel.app`.

### Option C — Any static host

Upload `index.html`, `styles.css`, and `app.js` to Netlify, Cloudflare Pages, an S3 bucket + CDN, or your own web server. Point the domain (or subdomain) at the folder. No Node/npm build is required.

**Important:** Use the final **HTTPS** URL for NFC and QR — not `http://` and not a `file://` path.

## Programming an NFC tag

You need writable NFC stickers/tags (NTAG213 / NTAG215 are common) and a phone that can write NFC.

1. Deploy the site and copy the HTTPS URL (example: `https://your-site.example/`).
2. On **iPhone**: App Store → “NFC Tools” (or similar) → Write → Add record → URL/URI → paste the HTTPS link → write to tag.
3. On **Android**: Play Store → “NFC Tools” → Write → Add record → URL → paste → approach the tag to write.
4. Test: lock the phone screen, tap the sticker with the phone — it should open the browser to your caption page.

Tips:

- Write only a **URL** record (not plain text), so phones open the browser automatically.
- Keep the URL short if you can (optional custom domain or short path).
- After testing, you can **lock** the tag (permanent) so guests cannot overwrite it — only do this when the URL is final.

## QR code backup (same sticker)

NFC does not work on every phone (and some cases block the antenna). Put a **QR code** on the same sticker that encodes the **same HTTPS URL**.

1. Use any QR generator (e.g. search “QR code generator URL”).
2. Paste your HTTPS link → download PNG/SVG.
3. Print small on the sticker under or beside “Tap phone here”.
4. Guests who cannot use NFC simply open the Camera app and scan.

## Suggested sticker text

Keep it short and bilingual so walk-by guests understand instantly:

**Front (large):**

> Tap for a free caption  
> 輕觸手機 · 一鍵生成文案  
> Sandbox VR · The Londoner Macau

**Small print:**

> NFC or scan QR · IG / 小红书 ready  
> 支援 NFC 或掃描 QR

Optional second line: “English · 繁中 · 简中”

## Customising captions later

All captions live in `app.js` inside the `TEMPLATES` object. Keys look like:

`en|immersion|walking`  
`zh-Hant|friends|social`  
`zh-Hans|thrills|friend`

Edit the text, save, redeploy. No rebuild step.

There is a reserved query flag `?ai=1` for a possible future AI hook; it is **not** used yet — the app always uses these templates.

## Privacy

Nothing is uploaded. Choices stay in the browser on the guest’s phone. No analytics are included in this version.

## Support checklist

- [ ] Site opens on iPhone Safari and Android Chrome
- [ ] All three languages show the correct button labels
- [ ] Copy button pastes correctly into Notes / IG / 小红书
- [ ] NFC tag opens the HTTPS URL
- [ ] QR on the sticker opens the same URL
