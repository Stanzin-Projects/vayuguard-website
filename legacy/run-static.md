# VayuGuard Clone — Run Doc

Static HTML/CSS/JS site (no build step, no npm dependencies). One command serves everything.

## How to reproduce artifacts

Nothing to build or install. All source files are committed in the workspace:

- `index.html`, `products.html`, `about.html`, `live-aqi.html`, `solutions.html`, `for-business.html`, `events.html`, `contact.html`
- `assets/css/theme.css`, `assets/css/home.css`, `assets/css/pages.css`
- `assets/js/main.js` (injects shared header/footer, dropdowns, mobile nav, reveal/counter animations)
- `serve.js` — tiny zero-dependency Node static server (hardcoded port **4173**)

No `.env` files are needed. Google Fonts is the only external fetch.

## How to run the server

From the workspace root:

```powershell
powershell -NoProfile -Command "(Start-Process -FilePath 'node.exe' -ArgumentList 'serve.js' -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' -WindowStyle Hidden -PassThru).Id"
```

Replace `<log>` with the log path given in `<preview_state>` (stdout and stderr must be different files).

Then verify before registering:

```bash
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/index.html   # expect 200
netstat -ano | grep ":4173" | grep LISTEN                                  # note the pid
```

Register with `register_preview` using URL `http://127.0.0.1:4173/index.html` and the pid from netstat.

**Note:** `serve.js` hardcodes port 4173 (deliberately — a stray `PORT` env var in this environment resolved to 0 and broke an earlier attempt). If 4173 is ever taken, edit the `const PORT = 4173;` line in `serve.js` to a free port and use that URL everywhere.

**Note:** do not use the built-in `register_preview { htmlPath }` mode for this project — the app's static file server only serves the single registered HTML file and returns 404 for every other asset (`/assets/css/*.css`, `/assets/js/main.js`), so the page renders unstyled. A real HTTP server is required.
