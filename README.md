# Sandbox VR · The Londoner Macau — Caption Generator

A simple mobile-first web page for guests at **Sandbox VR at The Londoner Macau**. Guests tap an NFC sticker (or scan a QR code), pick a language, choose which game they played, answer two quick questions, and get a ready-to-post Instagram / 小红书 caption with hashtags. Then they tap **Copy** and paste into their social app.

No account, no app install, no build tools — just open the page.

## What guests do

1. Choose language: **English** | **繁體中文** | **简体中文**
2. **What did you play?** — full Londoner lineup (scrollable large buttons)
3. What they liked most (immersion/story, friends/team, or thrills/intensity)
4. How they found you (walking by, social media, or friend/hotel tip)
5. See a caption + hashtags in their language (mentions the chosen game)
6. **Copy** it, or tap **Generate again** for a slight variation

## Games (Londoner lineup)

Canonical English titles (also used as `id` in `app.js`):

1. Squid Game Virtuals
2. Age of Dinosaurs
3. Stranger Things: Catalyst
4. Deadwood PHOBIA
5. Seekers of the Shard: Dragonfire
6. Deadwood Mansion
7. Rebel Moon: The Descent
8. Amber Sky 2088
9. Deadwood Valley
10. Curse of Davy Jones

UI shows localized labels for 繁中 / 简中 (franchise names kept in English where natural).

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure (language → game → liked → found → result) |
| `styles.css` | Mobile-first dark / VR look |
| `app.js` | Games list + i18n UI + 27 caption templates + copy button |
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

## Customising captions later

All captions live in `app.js` inside the `TEMPLATES` object. Keys look like:

`en|immersion|walking`  
`zh-Hant|friends|social`  
`zh-Hans|thrills|friend`

Each template includes a `{{game}}` placeholder. At caption time the app substitutes the **localized display name** for the game the guest picked, and may add game-specific hashtags (e.g. `#SquidGame`, `#StrangerThings`).

Edit the text, save, redeploy. No rebuild step. Keep the 27 language × liked × found templates — do not explode into a per-game matrix.

## Editing the games list

The Londoner lineup lives in `app.js` as the `GAMES` array near the top. Each entry:

```js
{
  id: "Squid Game Virtuals",          // exact English title (canonical)
  labels: {
    en: "Squid Game Virtuals",
    "zh-Hant": "Squid Game 虛擬體驗",
    "zh-Hans": "鱿鱼游戏 Virtuals",
  },
  hashtags: ["#SquidGame"],           // optional extras injected into captions
}
```

- Add, remove, or reorder games in that array — the game-step buttons are built from it.
- Keep `id` as the exact English title used on site menus.
- Update `labels` for guest-friendly 繁中 / 简中 display names.
- Optional `hashtags` are merged into the caption (after `#SandboxVR`) when present.

## Privacy

Nothing is uploaded. Choices stay in the browser on the guest’s phone. No analytics are included in this version.

## Support checklist

- [ ] Site opens on iPhone Safari and Android Chrome
- [ ] All three languages show the correct button labels
- [ ] Game list shows all Londoner titles and scrolls on phone
- [ ] Caption mentions the chosen game name
- [ ] Copy button pastes correctly into Notes / IG / 小红书
- [ ] NFC tag opens the HTTPS URL
- [ ] QR on the sticker opens the same URL
