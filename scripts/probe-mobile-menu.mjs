import { spawn } from 'node:child_process'
import puppeteer from 'puppeteer'

/* Mobile-menu probe (production build at phone width).
   Mouse and touch scenarios run on SEPARATE fresh pages, like separate devices:
   · mouse page: hover opens · click closes · Escape closes
   · touch page: tap opens & stays · second tap closes
   Also: logo loads · no horizontal overflow · drawer content sanity.
   Usage: node scripts/probe-mobile-menu.mjs [route-slug]   (default: home) */

const raw = String(process.argv[2] || '').split(/[\\/]+/).filter(Boolean).pop() || ''
const route = raw ? `/${raw}` : '/'
const PORT = 4181
const BASE = `http://127.0.0.1:${PORT}`

const server = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], {
  stdio: 'ignore', shell: true,
})
for (let i = 0; i < 40; i++) {
  try { await fetch(BASE); break } catch { await new Promise((r) => setTimeout(r, 250)) }
}

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
const settle = (ms = 550) => new Promise((r) => setTimeout(r, ms))

const drawerVisible = (page) =>
  page.evaluate(() => {
    const d = document.getElementById('mobile-nav')
    if (!d) return false
    const cs = getComputedStyle(d)
    return cs.visibility === 'visible' && parseFloat(cs.opacity) > 0.95
  })
const burgerPoint = async (page) => {
  const b = await (await page.$('button[aria-controls="mobile-nav"]')).boundingBox()
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 }
}
const newPage = async (width = 390) => {
  const page = await browser.newPage()
  await page.setViewport({ width, height: width < 700 ? 844 : 1024, hasTouch: true, isMobile: width < 700 })
  page.on('pageerror', (e) => console.log('[pageerror]', String(e).slice(0, 400)))
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle0', timeout: 30000 })
  await settle(800)
  return page
}

try {
  const out = {}

  // ── responsive sweep: logo loads + no horizontal overflow at every width ──
  out.widths = {}
  for (const w of [360, 390, 768, 1280]) {
    const p = await newPage(w)
    out.widths[w] = await p.evaluate(() => ({
      logoLoaded: [...document.querySelectorAll('img[alt*="VayuGuard"]')].every((i) => i.complete && i.naturalWidth > 0),
      overflowX: document.documentElement.scrollWidth - window.innerWidth,
    }))
    await p.close()
  }

  const base = await newPage()
  out.drawerLinks = await base.$$eval('#mobile-nav a', (as) => as.length)
  out.flipCardHeight = await base.$eval('.flip-card', (el) => Math.round(el.getBoundingClientRect().height))
  out.logoHeight = await base.$eval('header img[alt*="VayuGuard"]', (i) => Math.round(i.getBoundingClientRect().height))
  await base.close()

  // ── mouse device ──────────────────────────────────────────────
  const mouse = await newPage()
  let p = await burgerPoint(mouse)
  await mouse.mouse.move(p.x, p.y); await settle()
  out.hoverOpens = await drawerVisible(mouse)
  await mouse.mouse.click(p.x, p.y); await settle()
  out.mouseClickCloses = !(await drawerVisible(mouse))
  p = await burgerPoint(mouse)
  await mouse.mouse.move(p.x, p.y); await settle()
  await mouse.keyboard.press('Escape'); await settle()
  out.escapeCloses = !(await drawerVisible(mouse))
  await mouse.close()

  // ── touch device ──────────────────────────────────────────────
  const touch = await newPage()
  p = await burgerPoint(touch)
  await touch.touchscreen.tap(p.x, p.y); await settle()
  out.tapOpens = await drawerVisible(touch)
  await touch.touchscreen.tap(195, 500); await settle() // tap inside the open drawer (like reading links)
  out.tapStaysOpen = await drawerVisible(touch)
  p = await burgerPoint(touch)
  await touch.touchscreen.tap(p.x, p.y); await settle()
  out.secondTapCloses = !(await drawerVisible(touch))
  await touch.close()

  console.log('[result]', JSON.stringify(out, null, 2))
} finally {
  await browser.close()
  server.kill()
  await new Promise((r) => setTimeout(r, 300))
  process.exit(0)
}
