# Sandbox VR · The Londoner Macau — Caption Generator

A simple mobile-first web page for guests at **Sandbox VR at The Londoner Macau**. Guests scan a QR code (or optional NFC), pick a language, choose a game, answer two quick questions, and get a ready-to-post Instagram / 小红书 caption.

**Live site:** https://solrac81.github.io/sandbox-vr-nfc-captions/

Every caption ends with **exactly 5 hashtags** (brand/local + two relevant; game tags may swap into the last slots via `app.js`).

## Printable QR

- [`qr.png`](./qr.png) — PNG (decode from [`qr.png.b64`](./qr.png.b64) with `base64 -d qr.png.b64 > qr.png` if needed)
- [`qr.svg`](./qr.svg) — vector
- [`qr.html`](./qr.html) — preview + Download qr.png

Raw PNG: https://raw.githubusercontent.com/Solrac81/sandbox-vr-nfc-captions/main/qr.png  
Raw SVG: https://raw.githubusercontent.com/Solrac81/sandbox-vr-nfc-captions/main/qr.svg  
Pages helper: https://solrac81.github.io/sandbox-vr-nfc-captions/qr.html

QR target URL: `https://solrac81.github.io/sandbox-vr-nfc-captions/`

After pushing to `main`, wait about a minute, then **hard-refresh** on the phone.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `styles.css` | Mobile-first dark / VR look |
| `templates-en.js` / `templates-zh-Hant.js` / `templates-zh-Hans.js` | Caption variants (9 keys × 3 each) |
| `app.js` | Games list + i18n + copy / Generate again |
| `qr.png` / `qr.svg` / `qr.html` | Printable QR |
| `qr.png.b64` | ASCII base64 of qr.png |

## Local open

Double-click `index.html`, or `python3 -m http.server 8080` then visit `http://localhost:8080`.

## Deploy

GitHub Pages is already on: https://solrac81.github.io/sandbox-vr-nfc-captions/
