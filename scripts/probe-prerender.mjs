import { spawn } from 'node:child_process'
import puppeteer from 'puppeteer'

/* Debug probe: serves dist/ with vite preview, opens the page in headless
   Chrome, prints console/page errors and whether #root actually mounts. */

// Git-Bash mangles leading-slash argv ("/products" -> "C:/.../products") — normalize.
const raw = String(process.argv[2] || 'products').split(/[\\/]+/).filter(Boolean).pop()
const route = `/${raw}`
const PORT = 4180 // 4173 is often held by an existing dev server — use a free port
const URL = `http://127.0.0.1:${PORT}${route}`

const server = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], {
  stdio: 'ignore',
  shell: true,
})

// wait for the server to accept connections
for (let i = 0; i < 40; i++) {
  try {
    await fetch(`http://127.0.0.1:${PORT}/`)
    break
  } catch {
    await new Promise((r) => setTimeout(r, 250))
  }
}

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
const page = await browser.newPage()
page.on('console', (m) => console.log('[console]', m.type(), m.text().slice(0, 300)))
page.on('pageerror', (e) => console.log('[pageerror]', String(e).slice(0, 600)))
page.on('requestfailed', (r) => console.log('[reqfail]', r.url().slice(0, 120), r.failure()?.errorText))

try {
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 1200))
  const info = await page.evaluate(() => ({
    rootChildren: document.getElementById('root')?.children.length ?? -1,
    h1: document.querySelector('h1')?.textContent?.slice(0, 80) ?? null,
    title: document.title,
    renderEventFired: window.__renderEventFired === true,
  }))
  console.log('[result]', JSON.stringify(info, null, 2))
} finally {
  await browser.close()
  server.kill()
  await new Promise((r) => setTimeout(r, 300)) // let piped stdout flush
  process.exitCode = 0
}
