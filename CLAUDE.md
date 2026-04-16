# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"여우별 유니온 포털" — a password-gated Korean-language fan portal for a union in the mobile game *승리의 여신: 니케* (Goddess of Victory: Nike). Deployed as a static site with serverless functions on Vercel (https://foxstar.vercel.app/).

No build step, no package.json, no tests, no linter. The site is plain HTML/CSS/vanilla JS with two Node.js serverless functions for auth + data gating.

## Commands

- **Local dev** (runs static files + serverless functions together): `vercel dev`
- **Deploy preview**: `vercel`
- **Deploy production**: `vercel --prod`

Required environment variables (set in Vercel project settings or `.env.local`):
- `ACCESS_KEY` — the password users enter at the login overlay
- `SESSION_SECRET` — HMAC secret for session cookies (falls back to `ACCESS_KEY` if unset)
- `SESSION_EPOCH` — optional unix-ms timestamp; tokens issued before this are rejected (use to force logout of all sessions after rotating secrets)

## Architecture

### Auth + data-gating model (the non-obvious core)

Sensitive data files (`member.js`, `raid.js`, `character.js`) are **not** static assets. They live in `api/_data/` (underscore prefix keeps Vercel from serving them as static). The flow:

1. HTML pages include them naively: `<script src="data/member.js"></script>`
2. `vercel.json` rewrites `/data/{member,raid,character}.js` → `/api/data?file=<name>`
3. `api/data.js` checks the `fstar_session` cookie (HMAC-SHA256 over a timestamp, 1-day expiry, verified with `crypto.timingSafeEqual`).
   - **Authenticated**: serves the file contents from `api/_data/` with `Cache-Control: private, max-age=3600` and `Content-Type: application/javascript`.
   - **Unauthenticated**: returns `200 OK` with body `window.__AUTH_REQUIRED=true;` and `Cache-Control: no-store`. Always `200` (not 401) so the `<script>` tag executes and sets the sentinel.
4. Each HTML page checks `window.__AUTH_REQUIRED`. If set, the auth overlay is rendered and the main render path is guarded by `if (!window.__AUTH_REQUIRED) { … }` (closed with a matching `}` near end of file, e.g. `index.html:389` → `index.html:1102`). If unset, the overlay is hidden and the page renders normally.
5. Password submission POSTs to `/api/auth` (`api/auth.js`), which sets the `fstar_session` cookie on success; the page then `location.reload()`s and hits path 3.

Consequences for editing:
- Never move the sensitive data files out of `api/_data/` — they'd become directly fetchable.
- The auth guard `if (!window.__AUTH_REQUIRED) { … }` wraps the entire main script on each HTML page. When editing main-page JS, keep the brace balance intact (the closing `}` is far from the opening; search for the comment `} // if (!window.__AUTH_REQUIRED)` to find it).
- Vercel functions use CommonJS (`module.exports = function handler(req, res) {}`), not ES modules.

### Page layout

Four standalone HTML files share `css/style.css`. There is no bundler and no shared JS file — each page duplicates its own logic inline:

| Page         | Role                         | Loads data files                       |
|--------------|------------------------------|----------------------------------------|
| `index.html` | Home / member roster         | `config.js`, `member.js`, `raid.js`    |
| `raid.html`  | Union raid records           | `config.js`, `member.js`, `raid.js`    |
| `shift.html` | Shifty-pad (character view)  | `config.js`, `member.js`, `character.js` |
| `stats.html` | Per-character statistics     | `config.js`, `member.js`, `character.js` |

`data/config.js` is the **only** truly static data file — it's public, small, and contains `CONFIG = { unionName, kakaoUrl, schedule: { unionRaid, soloRaid } }`. The schedule fields are `null` until confirmed; pages render "미정" when null.

### Data shapes

- `UNION` (from `member.js`): object keyed by season number as string, e.g. `UNION["40"]`. Each entry is `{ rank?, members: [...] }`. Entries per member always include `name`, `syncroLevel`, `uid`, `blaBlaLinkUId`, and optionally `role: "Leader" | "Officer"`. The **latest season only** also includes per-member gameplay fields: `normal`, `hard`, `tribeTower`, `overclock`, `outpost: { common, attack, defense, support, missilis, elysion, tetra, pilgrim, abnormal }`. To find the latest season use `Math.max(...Object.keys(UNION).map(Number))` (pages use `Object.keys(UNION).map(Number).sort((a,b)=>a-b)` and take the last element).
- `RAID` (from `raid.js`): keyed by `"S<season>"` (e.g. `"S35"`).
- `CHARACTER` (from `character.js`): keyed by `uid`, values are character arrays for the latest season only.

When adding a new season, append a new top-level key to `UNION` in `api/_data/member.js` and a matching `"S<n>"` key to `RAID` in `api/_data/raid.js`. Refresh `CHARACTER` in `api/_data/character.js` (latest season only).

### Caching

`vercel.json` sets aggressive `Cache-Control` for `/css/*` (1 day) and `/image/*` (1 week). Authenticated data responses are `private, max-age=3600` — do not make them `public` (they'd leak through CDN).

### Theming

Pure CSS custom properties on `:root` and `html.dark`. Dark-mode preference is persisted in `localStorage.theme` and applied pre-paint by a small inline `<script>` in each page's `<head>` to avoid a flash.

## Conventions

- UI strings, comments, and commit messages in the existing code are Korean; match that when editing user-visible text.
- Character portrait images live in `image/<korean-name>.webp`; the `image/D_<name>.webp` prefix marks "deprecated/old" portraits kept for historical seasons.
- No module system on the front-end — every data file declares a global (`CONFIG`, `UNION`, `RAID`, `CHARACTER`). Keep that pattern; the auth gate relies on `<script src>` semantics.
