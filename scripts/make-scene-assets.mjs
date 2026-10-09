/**
 * Builds the realistic hero scene assets from free-license sources.
 *  - public/mountain-scene.webp : color-graded misty mountain photo (Unsplash license)
 *  - public/smoke-puff.webp     : procedural fractal-noise smoke puff sprite
 * Run: node scripts/make-scene-assets.mjs
 */
import sharp from 'sharp'
import { existsSync, mkdirSync } from 'node:fs'
import { get as httpsGet } from 'node:https'

const OUT = 'public'
const TMP = '.tmp-assets'
const MOUNTAIN_SRC = `${TMP}/mountain-raw.jpg`
const MOUNTAIN_URL =
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2400&q=85&fm=jpg'

const download = (url, dest, redirects = 3) =>
  new Promise((resolve, reject) => {
    httpsGet(url, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location && redirects > 0) {
        res.resume()
        return resolve(download(new URL(res.headers.location, url).href, dest, redirects - 1))
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`))
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
    }).on('error', reject).end()
  })

// A cluster of soft blobs, displaced by fractal noise (feTurbulence) so the
// silhouette billows like real smoke instead of reading as a perfect circle.
const SMOKE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
  <defs>
    <filter id="f" x="-40%" y="-40%" width="180%" height="180%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="4"
                    seed="7" result="disp"/>
      <feDisplacementMap in="SourceGraphic" in2="disp" scale="46" xChannelSelector="R" yChannelSelector="G"/>
      <feGaussianBlur stdDeviation="3.2"/>
    </filter>
    <radialGradient id="p" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="white" stop-opacity="0.95"/>
      <stop offset="45%" stop-color="white" stop-opacity="0.55"/>
      <stop offset="78%" stop-color="white" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g filter="url(#f)">
    <circle cx="128" cy="140" r="86" fill="url(#p)"/>
    <circle cx="95"  cy="112" r="52" fill="url(#p)"/>
    <circle cx="166" cy="104" r="46" fill="url(#p)"/>
    <circle cx="150" cy="158" r="58" fill="url(#p)"/>
    <circle cx="104" cy="164" r="42" fill="url(#p)"/>
    <circle cx="132" cy="86"  r="30" fill="url(#p)"/>
  </g>
</svg>`

async function main() {
  mkdirSync(TMP, { recursive: true })

  if (!existsSync(MOUNTAIN_SRC)) {
    console.log('downloading mountain photo …')
    await download(MOUNTAIN_URL, MOUNTAIN_SRC).then((b) => sharp(b).jpeg().toFile(MOUNTAIN_SRC))
  }

  // --- mountain: misty pines + valley, graded toward the VayuGuard teal palette ---
  const base = sharp(MOUNTAIN_SRC).resize(2200, 1100, { fit: 'cover', position: 'centre' })
  const photo = await base
    .sharpen({ sigma: 0.9 })
    .modulate({ saturation: 1.12, brightness: 1.03, hue: -6 })
    .recomb([
      [0.97, 0.05, 0.02],
      [0.0, 1.03, 0.02],
      [0.02, 0.07, 0.97],
    ])
    .linear(0.96, 5)
    .png()
    .toBuffer()

  // horizontal fog band so the ridge melts into haze (matches the reference art)
  const H = 1100
  const fog = Buffer.from(
    `<svg width="2200" height="${H}"><defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#eef7f0" stop-opacity="0"/>
        <stop offset="46%" stop-color="#e3f1e8" stop-opacity="0.07"/>
        <stop offset="74%" stop-color="#e7f4ec" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#edf7f1" stop-opacity="0.72"/>
      </linearGradient>
    </defs><rect width="2200" height="${H}" fill="url(#g)"/></svg>`
  )
  await sharp(photo)
    .composite([{ input: fog, blend: 'over' }])
    .webp({ quality: 90, effort: 5 })
    .toFile(`${OUT}/mountain-scene.webp`)
  console.log(`wrote ${OUT}/mountain-scene.webp`)

  // --- procedural smoke puff: SVG fractal noise → soft alpha sprite ---
  await sharp(Buffer.from(SMOKE_SVG))
    .resize(256, 256)
    .webp({ quality: 90, alphaQuality: 90 })
    .toFile(`${OUT}/smoke-puff.webp`)
  console.log(`wrote ${OUT}/smoke-puff.webp`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
