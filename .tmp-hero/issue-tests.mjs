import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] })

/* ── 1. sticky hover repro (desktop mouse) ── */
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://127.0.0.1:4173/products', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 800))
const cards = await page.$$('.flip-card')
console.log('flip cards found:', cards.length)
if (cards.length >= 2) {
  const inner = (el) => page.evaluate((c) => {
    const i = c.querySelector('.flip-card-inner')
    return {
      active: document.activeElement === c || c.contains(document.activeElement),
      hovered: c.matches(':hover'),
      transform: getComputedStyle(i).transform.slice(0, 60)
    }
  }, el)
  await cards[0].hover()
  await new Promise((r) => setTimeout(r, 800))
  console.log('A hovered:', JSON.stringify(await inner(cards[0])))
  await cards[1].hover()
  await new Promise((r) => setTimeout(r, 900))
  console.log('after moving to B -> A:', JSON.stringify(await inner(cards[0])))
  console.log('after moving to B -> B:', JSON.stringify(await inner(cards[1])))
}

/* ── 2. touch navbar flow on a small device ── */
const m = await browser.newPage()
await m.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
await m.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 700))
// tap the burger
await m.tap('header button[aria-controls="mobile-nav"]')
await new Promise((r) => setTimeout(r, 600))
const navState = await m.evaluate(() => {
  const d = document.getElementById('mobile-nav')
  const r = d.getBoundingClientRect()
  const links = [...d.querySelectorAll('ul > li')].map((li) => {
    const b = li.getBoundingClientRect()
    return { t: li.textContent.trim().slice(0, 14), y: Math.round(b.y), h: Math.round(b.height), visible: b.height > 0 && getComputedStyle(d).visibility === 'visible' }
  })
  const s = getComputedStyle(d)
  const scrollable = d.querySelector('.overflow-y-auto')
  return {
    open: d.dataset.open, vis: s.visibility, op: s.opacity,
    rect: { w: Math.round(r.width), h: Math.round(r.height) },
    viewportH: innerHeight,
    links,
    scrollable: scrollable ? { clientH: scrollable.clientHeight, scrollH: scrollable.scrollHeight } : null,
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }
})
console.log('mobile drawer:', JSON.stringify(navState, null, 1))
await m.screenshot({ path: '.tmp-hero/touch-drawer.png' })

// tap the Products link -> should navigate and close
await m.tap('#mobile-nav a[href="/products"]')
await new Promise((r) => setTimeout(r, 900))
const afterNav = await m.evaluate(() => ({ path: location.pathname, drawerOpen: document.getElementById('mobile-nav').dataset.open, overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth }))
console.log('after tapping Products:', JSON.stringify(afterNav))
await m.screenshot({ path: '.tmp-hero/touch-products.png' })

await browser.close()
