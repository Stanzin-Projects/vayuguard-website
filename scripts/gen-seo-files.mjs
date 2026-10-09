import { mkdirSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { SEO_ROUTES, SITE_URL } from '../src/data/catalog.js'

/* Generates dist/robots.txt + dist/sitemap.xml after vite build.
   Route list, priorities and lastmod all derive from src/data/catalog.js. */

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

if (!existsSync(dist)) {
  console.error('dist/ not found — run "npm run build" (or prerender) first.')
  process.exit(1)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SEO_ROUTES.map(
  ([path], i) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
    <priority>${Math.max(0.5, 1 - i * 0.1).toFixed(1)}</priority>
  </url>`
).join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

# Explicit AI-crawler permissions (GPTBot, ClaudeBot, PerplexityBot etc.)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

writeFileSync(join(dist, 'sitemap.xml'), sitemap)
writeFileSync(join(dist, 'robots.txt'), robots)
console.log(`✓ wrote dist/robots.txt + dist/sitemap.xml (${SEO_ROUTES.length} URLs)`)

/* ── Prerender sanity check: every route must have real prerendered HTML ── */
let failures = 0
for (const [path] of SEO_ROUTES) {
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  if (!existsSync(file)) {
    console.error(`✗ missing prerendered HTML: ${path}`)
    failures++
    continue
  }
  const size = statSync(file).size
  if (size < 30000) {
    console.error(`✗ suspiciously small (${size} bytes): ${path}`)
    failures++
  }
}
console.log(failures ? `✗ ${failures} route file(s) failed sanity check` : '✓ all routes have real prerendered HTML')
process.exit(failures ? 1 : 0)
