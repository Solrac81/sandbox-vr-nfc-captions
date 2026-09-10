# Sandbox VR · The Londoner Macau — Caption Generator

A simple mobile-first web page for guests at **Sandbox VR at The Londoner Macau**. Guests **scan a QR code** (or tap an optional NFC sticker), pick a language, choose which game they played, answer two quick questions, and get a ready-to-post Instagram / 小红书 caption with hashtags. Then they tap **Copy** and paste into their social app.

No account, no app install, no build tools — just open the page.

**Live site:** https://solrac81.github.io/sandbox-vr-nfc-captions/

## QR-first (primary)

Carlos's primary guest path is **QR**:

1. Generate a QR code that points at:  
   `https://solrac81.github.io/sandbox-vr-nfc-captions/`
2. Print it on stickers / table tents / exit-area cards.
3. Guests open Camera → scan → browser opens the caption page.

NFC is an **optional backup** for phones that support it — same HTTPS URL. Prefer QR on every sticker so all guests can start without NFC.

## What guests do

1. Choose language: **English** | **繁體中文** | **简体中文**
2. **What did you play?** — full Londoner lineup (scrollable large buttons)
3. What they liked most (immersion/story, friends/team, or thrills/intensity)
4. How they found you (walking by, social media, or friend/hotel tip)
5. See a caption + hashtags in their language (mentions the chosen game)
6. **Copy** it, or tap **Generate again** for a different full caption

## Games (Londoner lineup)

Stable English `id` slugs in `app.js` (logic). Display labels follow the guest's UI language when substituting `{{game}}`:

| # | id | en | zh-Hant | zh-Hans |
|---|----|----|---------|---------|
| 1 | `deadwood-phobia` | Deadwood PHOBIA | 屍森恐懼 | 尸森恐惧 |
| 2 | `squid-game-virtuals` | Squid Game Virtuals | 魷魚遊戲：虛擬對決 | 鱿鱼游戏：虚拟对决 |
| 3 | `stranger-things-catalyst` | Stranger Things: Catalyst | Stranger Things: Catalyst | Stranger Things: Catalyst |
| 4 | `age-of-dinosaurs` | Age of Dinosaurs | 恐龍紀元 | 恐龙纪元 |
| 5 | `rebel-moon-the-descent` | Rebel Moon: The Descent | Rebel Moon: The Descent | Rebel Moon: The Descent |
| 6 | `deadwood-valley` | Deadwood Valley | 屍森血谷 | 尸森血谷 |
| 7 | `seekers-dragonfire` | Seekers of the Shard: Dragonfire | 魔石戰記：龍之焰 | 魔石战记：龙之焰 |
| 8 | `amber-sky-2088` | Amber Sky 2088 | 鋼鐵星空 2088 | 钢铁星空 2088 |
| 9 | `deadwood-mansion` | Deadwood Mansion | 屍森大宅 | 尸森大宅 |
| 10 | `curse-of-davy-jones` | Curse of Davy Jones | 海魔的詛咒 | 海魔的诅咒 |
| 11 | `ufl-unbound` | UFL: Unbound Fighting League | 決戰聯盟：解放 | 决战联盟：解放 |

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
   - **VS Code / Cursor:** use the "Live Preview" or "Live Server" extension

It works offline once the files are on the device.

## How to deploy (so QR / NFC can use HTTPS)

Phone cameras and NFC work best with a public **HTTPS** URL.

### Option A — GitHub Pages (this repo)

Already set up for Solrac81:

`https://solrac81.github.io/sandbox-vr-nfc-captions/`

After pushing to `main`, wait a minute, then hard-refresh on the phone.

To recreate elsewhere:

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

**Important:** Use the final **HTTPS** URL for QR and NFC — not `http://` and not a `file://` path.

## Generate the QR code (primary)

1. Deploy (or use) the HTTPS URL:  
   `https://solrac81.github.io/sandbox-vr-nfc-captions/`
2. Use any QR generator (search "QR code generator URL").
3. Paste the link → download PNG/SVG.
4. Print large enough to scan at arm's length on stickers / cards.
5. Test with iPhone and Android Camera apps.

## Optional NFC backup (same URL)

You need writable NFC stickers/tags (NTAG213 / NTAG215 are common) and a phone that can write NFC.

1. Use the **same** HTTPS URL as the QR.
2. On **iPhone**: App Store → "NFC Tools" (or similar) → Write → Add record → URL/URI → paste → write to tag.
3. On **Android**: Play Store → "NFC Tools" → Write → Add record → URL → paste → approach the tag to write.
4. Test: lock the phone screen, tap the sticker — it should open the caption page.

Tips:

- Write only a **URL** record (not plain text), so phones open the browser automatically.
- Keep the URL short if you can (optional custom domain or short path).
- After testing, you can **lock** the tag (permanent) so guests cannot overwrite it — only do this when the URL is final.
- NFC does not work on every phone (and some cases block the antenna) — that is why QR is primary.

## Suggested sticker text

Keep it short and bilingual. Lead with **Scan QR**:

**Front (large):**

> Scan QR for a free caption  
> 掃描 QR · 一鍵生成文案  
> Sandbox VR · The Londoner Macau

**Small print:**

> Scan QR · IG / 小红书 ready  
> 掃描 QR 即可（可選 NFC）

Optional second line: "English · 繁中 · 简中"

## Customising captions later

All captions live in `app.js` inside the `TEMPLATES` object. Keys look like:

`en|immersion|walking`  
`zh-Hant|friends|social`  
`zh-Hans|thrills|friend`

Each key maps to an **array of 3 full captions** (all with a `{{game}}` placeholder). **Generate again** cycles the whole caption (`againIndex % 3`) — it does not append a suffix. At caption time the app substitutes the **localized display name** for the game the guest picked (label for their UI language), and may add game-specific hashtags (e.g. `#SquidGame`, `#StrangerThings`).

Edit the text, save, redeploy. No rebuild step. Keep the 27 language × liked × found keys (3 variants each) — do not explode into a per-game matrix.

There is a reserved query flag `?ai=1` for a possible future AI hook; it is **not** used yet — the app always uses these templates.

## Editing the games list

The Londoner lineup lives in `app.js` as the `GAMES` array near the top. Each entry:

```js
{
  id: "squid-game-virtuals",          // stable English slug (logic / data-game)
  labels: {
    en: "Squid Game Virtuals",
    "zh-Hant": "魷魚遊戲：虛擬對決",
    "zh-Hans": "鱿鱼游戏：虚拟对决",
  },
  hashtags: ["#SquidGame"],           // optional extras injected into captions
}
```

- Add, remove, or reorder games in that array — the game-step buttons are built from it.
- Keep `id` as a stable English slug (not the display title).
- Update `labels` for guest-friendly en / 繁中 / 简中 names used in UI and `{{game}}`.
- Optional `hashtags` are merged into the caption (after `#SandboxVR`) when present.

## Privacy

Nothing is uploaded. Choices stay in the browser on the guest's phone. No analytics are included in this version.

## Support checklist

- [ ] Site opens on iPhone Safari and Android Chrome
- [ ] All three languages show the correct button labels
- [ ] Game list shows all 11 Londoner titles and scrolls on phone
- [ ] Caption mentions the chosen game name in the guest's language
- [ ] Copy button pastes correctly into Notes / IG / 小红书
- [ ] QR on the sticker opens the HTTPS URL
- [ ] (Optional) NFC tag opens the same HTTPS URL
