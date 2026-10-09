# VayuGuard Website

React + Vite site for VayuGuard — Make-in-India air purification (HCAC hybrid HVAC cleaners, UVGI, Plasm-ION, IAQ monitoring).

## SEO / GEO / AEO system

The site **prerenders every route at build time**, so Google and AI answer engines (ChatGPT, Perplexity, AI Overviews) see fully populated HTML — titles, descriptions, canonicals, Open Graph tags, JSON-LD structured data and real page content — without executing JavaScript.

### Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at `127.0.0.1:4173` |
| `npm run build` | Standard production build (no prerender) |
| `npm run prerender` | **Production build + snapshot every route to static HTML + generate `dist/robots.txt` & `dist/sitemap.xml`** |
| `npm run seo:check` | Re-verify dist output (route files exist, sizes sane) |
| `node scripts/probe-prerender.mjs products` | Debug probe: load a route in headless Chrome, show mount status + console errors |
| `node scripts/probe-mobile-menu.mjs` | Mobile-menu probe: hover/tap/Escape matrix + 4-width overflow sweep in headless Chrome |

**Always deploy with `npm run prerender`**, not plain `build`.

### Where things live

- `src/data/catalog.js` — **single source of truth**: business facts (marked `TODO` where placeholder), product/service/event facts, FAQs, per-route and per-product meta titles/descriptions, prerender and sitemap routes. Change a title or phone here and meta, schema, footer and llms data follow.
- `src/data/schema.js` — JSON-LD builders (Organization, WebSite, LocalBusiness, Product, Service, Event, FAQPage, Breadcrumb). Used by both the React app and the prerender step, so they never drift.
- `src/components/SeoManager.jsx` — updates head tags on client-side navigation.
- `src/components/Faq.jsx` — FAQ accordion; copy mirrors the `FAQPage` JSON-LD exactly.
- `vite.config.js` — prerender plugin wiring + per-route head injection into saved HTML.
- `public/llms.txt` — markdown brief for AI crawlers (GPTBot, ClaudeBot, PerplexityBot…).
- `scripts/gen-seo-files.mjs` — robots.txt + sitemap.xml generation (including product detail pages) and prerender sanity checks.

### Before going live — fill the TODOs

Everything ships with clearly marked placeholders in `src/data/catalog.js`:

1. `SITE_URL` — real production domain
2. `CONTACT_PHONE` / `CONTACT_PHONE_E164` / `WHATSAPP_URL` / `CONTACT_EMAIL`
3. `ADDRESS` — street + PIN code
4. Social URLs in `SOCIALS`
5. Add a social-share image (`og:image` currently uses the hero video poster)
6. Add your host's SPA fallback (`_redirects` for Netlify, `vercel.json` for Vercel) so unknown paths reach the app
7. Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools
