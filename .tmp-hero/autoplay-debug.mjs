import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] })
const page = await browser.newPage()
await page.setViewport({ width: 375, height: 820 })
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }])
page.on('console', (m) => console.log('[page]', m.type(), m.text()))
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 800))
const info = await page.evaluate(async () => {
  const v = document.querySelector('video')
  const rect = v.getBoundingClientRect()
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  const state = {
    hasAutoplayAttr: v.hasAttribute('autoplay'),
    autoplayProp: v.autoplay,
    mutedProp: v.muted,
    mutedAttr: v.hasAttribute('muted'),
    playsInline: v.playsInline,
    reduce: mq.matches,
    rect: { top: Math.round(rect.top), h: Math.round(rect.height), inViewport: rect.top < innerHeight },
    paused: v.paused,
    err: v.error ? v.error.message : null
  }
  try { await v.play(); state.playCall = 'ok' } catch (e) { state.playCall = 'rejected: ' + e.name + ' ' + e.message }
  await new Promise((r) => setTimeout(r, 700))
  state.pausedAfterPlay = v.paused
  state.t = v.currentTime
  return state
})
console.log(JSON.stringify(info, null, 1))
await browser.close()
