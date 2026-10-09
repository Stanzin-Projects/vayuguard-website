import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
const errors = []
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', e => errors.push(String(e)))
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle2', timeout: 45000 })
await new Promise(r => setTimeout(r, 2500))
await page.screenshot({ path: '.tmp-hero/run-check.png' })
const info = await page.evaluate(() => {
  const v = document.querySelector('video')
  return {
    themeColor: document.querySelector('meta[name="theme-color"]')?.content,
    video: v ? { src: v.currentSrc.split('/').pop(), paused: v.paused, w: v.videoWidth } : null,
    headingColor: getComputedStyle(document.querySelector('h1 span, h1 b, h1 strong') || document.querySelector('h1')).color,
  }
})
console.log(JSON.stringify({ ...info, errors }, null, 2))
await browser.close()
