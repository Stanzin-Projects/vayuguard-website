import puppeteer from 'puppeteer'

const URL = 'http://127.0.0.1:4173/'
const widths = [1440, 1280, 1100, 1024, 900, 768, 414, 375, 320]

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] })
const page = await browser.newPage()
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()) })

const results = []
for (const w of widths) {
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 })
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 600))
  const m = await page.evaluate(() => {
    const doc = document.documentElement
    const header = document.querySelector('header')
    const nav = header.querySelector('nav')
    const burger = header.querySelector('button[aria-controls="mobile-nav"]')
    const drawer = document.getElementById('mobile-nav')
    const links = [...nav.querySelectorAll(':scope > ul > li > a')].map((a) => {
      const r = a.getBoundingClientRect()
      return { t: a.textContent.trim(), x: Math.round(r.x), right: Math.round(r.right), h: Math.round(r.height) }
    })
    const wa = header.querySelector('.btn-ghost')
    const video = document.querySelector('video')
    const dr = drawer.getBoundingClientRect()
    return {
      vw: innerWidth,
      overflowX: doc.scrollWidth - doc.clientWidth,
      headerH: Math.round(header.getBoundingClientRect().height),
      mainPt: getComputedStyle(document.querySelector('main')).paddingTop,
      navShown: getComputedStyle(nav).display !== 'none',
      navWrapped: links.some((l) => l.h > 44),
      navRight: links.length ? links[links.length - 1].right : null,
      waRight: wa ? Math.round(wa.getBoundingClientRect().right) : null,
      burgerShown: getComputedStyle(burger).display !== 'none',
      drawerRect: { w: Math.round(dr.width), h: Math.round(dr.height) },
      drawerInHeader: !!drawer.closest('header'),
      video: video ? { paused: video.paused, t: Math.round(video.currentTime * 10) / 10, w: video.videoWidth, readyState: video.readyState, inHero: !!video.closest('section') } : null,
      heroHasBgVideo: !!document.querySelector('section video.hero-bg-video, section > div > video')
    }
  })
  // drawer interaction
  let drawer = null
  if (!m.navShown) {
    await page.click('header button[aria-controls="mobile-nav"]')
    await new Promise((r) => setTimeout(r, 450))
    drawer = await page.evaluate(() => {
      const d = document.getElementById('mobile-nav')
      const r = d.getBoundingClientRect()
      const first = d.querySelector('ul > li').getBoundingClientRect()
      const s = getComputedStyle(d)
      return { open: d.dataset.open, vis: s.visibility, op: s.opacity, w: Math.round(r.width), h: Math.round(r.height), firstY: Math.round(first.y), bodyLocked: document.body.style.overflow }
    })
    // close again
    await page.click('header button[aria-controls="mobile-nav"]')
    await new Promise((r) => setTimeout(r, 400))
    const closed = await page.evaluate(() => document.getElementById('mobile-nav').dataset.open)
    drawer.closedOk = closed === 'false'
  }
  results.push({ w, ...m, drawer })
}

// screenshots for eyeballing
const shots = [
  { w: 1440, h: 900, file: '.tmp-hero/shot-1440.png', scroll: 0 },
  { w: 1024, h: 820, file: '.tmp-hero/shot-1024-nav.png', scroll: 0 },
  { w: 768, h: 900, file: '.tmp-hero/shot-768.png', scroll: 0 },
  { w: 375, h: 820, file: '.tmp-hero/shot-375.png', scroll: 0 },
  { w: 320, h: 700, file: '.tmp-hero/shot-320.png', scroll: 0 }
]
for (const s of shots) {
  await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 1 })
  await page.goto(URL, { waitUntil: 'networkidle2' })
  await new Promise((r) => setTimeout(r, 900))
  await page.screenshot({ path: s.file })
}
// drawer open shots
await page.setViewport({ width: 375, height: 820, deviceScaleFactor: 1 })
await page.goto(URL, { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 500))
await page.click('header button[aria-controls="mobile-nav"]')
await new Promise((r) => setTimeout(r, 600))
await page.screenshot({ path: '.tmp-hero/shot-375-drawer.png' })

console.log(JSON.stringify({ results, errors }, null, 1))
await browser.close()
