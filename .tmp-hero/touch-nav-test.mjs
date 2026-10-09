import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] })
const m = await browser.newPage()
await m.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
await m.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 700))

await m.tap('header button[aria-controls="mobile-nav"]')
await new Promise((r) => setTimeout(r, 500))
await m.screenshot({ path: '.tmp-hero/touch-drawer.png' })

// expand the Products accordion
await m.tap('#mobile-nav button')
await new Promise((r) => setTimeout(r, 500))
const expanded = await m.evaluate(() => {
  const btn = document.querySelector('#mobile-nav button')
  const panel = btn.nextElementSibling
  const link = panel.querySelector('a')
  const r = link.getBoundingClientRect()
  return { btnText: btn.textContent.trim(), panelH: Math.round(panel.getBoundingClientRect().height), firstLink: link.getAttribute('href'), linkVisible: r.height > 0 && r.width > 0, linkY: Math.round(r.y) }
})
console.log('accordion:', JSON.stringify(expanded))
await m.screenshot({ path: '.tmp-hero/touch-drawer-products.png' })

// tap the first child link → navigate
await m.tap('#mobile-nav button + div a')
await new Promise((r) => setTimeout(r, 1000))
const after = await m.evaluate(() => ({ path: location.pathname + location.hash, drawerOpen: document.getElementById('mobile-nav').dataset.open, bodyOverflow: document.body.style.overflow, overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth }))
console.log('after nav:', JSON.stringify(after))
await m.screenshot({ path: '.tmp-hero/touch-product-page.png' })
await browser.close()
console.log('ok')
