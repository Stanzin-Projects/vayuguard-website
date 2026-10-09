import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] })
const page = await browser.newPage()
await page.setViewport({ width: 375, height: 820 })
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
page.on('console', (m) => console.log('[page]', m.type(), m.text()))
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 800))
const before = await page.evaluate(() => {
  const v = document.querySelector('video')
  return { paused: v.paused, scrollY, reduce: matchMedia('(prefers-reduced-motion: reduce)').matches, rectTop: Math.round(v.getBoundingClientRect().top) }
})
await page.evaluate(() => {
  const v = document.querySelector('video')
  const y = v.getBoundingClientRect().top + scrollY - 200
  window.scrollTo({ top: y, behavior: 'instant' })
})
await new Promise((r) => setTimeout(r, 1800))
const after = await page.evaluate(async () => {
  const v = document.querySelector('video')
  const out = { paused: v.paused, t: Math.round(v.currentTime * 100) / 100, scrollY: Math.round(scrollY), rectTop: Math.round(v.getBoundingClientRect().top), rectBottom: Math.round(v.getBoundingClientRect().bottom) }
  if (v.paused) { try { await v.play(); out.manualPlay = 'ok' } catch (e) { out.manualPlay = e.name } }
  await new Promise((r) => setTimeout(r, 500))
  out.pausedAfterManual = v.paused
  return out
})
console.log(JSON.stringify({ before, after }, null, 1))
await browser.close()
