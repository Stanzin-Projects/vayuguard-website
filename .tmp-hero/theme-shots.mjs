import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
const shots = [
  { url: 'http://127.0.0.1:4173/', file: '.tmp-hero/theme-home-top.png', scroll: 0 },
  { url: 'http://127.0.0.1:4173/', file: '.tmp-hero/theme-home-mid.png', scroll: 1500 },
  { url: 'http://127.0.0.1:4173/', file: '.tmp-hero/theme-home-solutions.png', scroll: 3400 },
  { url: 'http://127.0.0.1:4173/products', file: '.tmp-hero/theme-products.png', scroll: 0 },
  { url: 'http://127.0.0.1:4173/solutions', file: '.tmp-hero/theme-solutions.png', scroll: 600 }
]
for (const s of shots) {
  await page.goto(s.url, { waitUntil: 'networkidle2' })
  await new Promise((r) => setTimeout(r, 700))
  if (s.scroll) { await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), s.scroll); await new Promise((r) => setTimeout(r, 900)) }
  await page.screenshot({ path: s.file })
}
console.log('done')
await browser.close()
