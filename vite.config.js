import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import { SEO_ROUTES, SITE_URL, PRODUCTS, routeMeta } from './src/data/catalog.js'
import { jsonLdScript } from './src/data/schema.js'

const routes = SEO_ROUTES.map(([path]) => path)

/* Bake per-route title/description/canonical/OG + JSON-LD into the static HTML
   so crawlers and AI engines see them without executing JavaScript.
   Replaces the defaults baked into index.html — never duplicates them. */
function replaceTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace('</head>', `    ${replacement}\n  </head>`)
}

function headInjection(renderedRoute) {
  const meta = routeMeta(renderedRoute.route)
  const url = `${SITE_URL}${renderedRoute.route === '/' ? '/' : renderedRoute.route}`
  const productMatch = renderedRoute.route.match(/^\/products\/([\w-]+)$/)
  const product = productMatch && PRODUCTS.find((item) => item.id === productMatch[1])
  const image = `${SITE_URL}${product ? product.img : '/hero-video-poster.jpg'}`
  let html = renderedRoute.html
  html = replaceTag(html, /<title>.*?<\/title>/s, `<title>${escapeHtml(meta.title)}</title>`)
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(meta.description)}" />`)
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeHtml(url)}" />`)
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`)
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`)
  html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${escapeHtml(url)}" />`)
  html = replaceTag(html, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${escapeHtml(image)}" />`)
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`)
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`)
  html = replaceTag(html, /<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${escapeHtml(image)}" />`)
  // JSON-LD once per page
  html = html.replace(/<script type="application\/ld\+json"[^<]*<\/script>\s*/g, '')
  renderedRoute.html = html.replace('</head>', `    ${jsonLdScript(renderedRoute.route)}\n  </head>`)
}

function escapeHtml(value) {
  return value.replace(/[&"<>]/g, (character) => ({
    '&': '&amp;',
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;',
  })[character])
}

export default defineConfig({
  plugins: [
    react(),
    ...(process.env.PRERENDER
      ? [
          prerender({
            routes,
            renderer: '@prerenderer/renderer-puppeteer',
            rendererOptions: {
              renderAfterDocumentEvent: 'render-event',
              args: ['--no-sandbox', '--disable-setuid-sandbox'],
            },
            postProcess: (renderedRoute) => headInjection(renderedRoute),
          }),
        ]
      : []),
  ],
  server: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
  },
})
