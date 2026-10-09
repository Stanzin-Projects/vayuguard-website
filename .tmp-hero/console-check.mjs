import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] })
const page = await browser.newPage()
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()) })
for (const path of ['/', '/products', '/solutions', '/live-aqi', '/contact']) {
  await page.goto('http://127.0.0.1:4173' + path, { waitUntil: 'networkidle2' })
  await new Promise((r) => setTimeout(r, 500))
}
const video = await page.evaluate(() => true).catch(() => false)
console.log(JSON.stringify({ errors, video }))
await browser.close()
