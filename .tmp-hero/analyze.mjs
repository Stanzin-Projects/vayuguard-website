import sharp from 'sharp'

const file = process.argv[2]
const { data, info } = await sharp(file).resize({ width: 160 }).raw().toBuffer({ resolveWithObject: true })
const { channels } = info
let r = 0, g = 0, b = 0, n = 0
const hueBuckets = new Map()
const toHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  let h = 0, s = 0
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1))
    if (max === r) h = 60 * (((g - b) / d) % 6)
    else if (max === g) h = 60 * ((b - r) / d + 2)
    else h = 60 * ((r - g) / d + 4)
    if (h < 0) h += 360
  }
  return { h, s, l }
}
for (let i = 0; i < data.length; i += channels) {
  const R = data[i], G = data[i + 1], B = data[i + 2]
  r += R; g += G; b += B; n++
  const { h, s, l } = toHsl(R, G, B)
  if (s > 0.12 && l > 0.08 && l < 0.95) {
    const bucket = Math.floor(h / 30) * 30
    hueBuckets.set(bucket, (hueBuckets.get(bucket) || 0) + 1)
  }
}
console.log(file)
console.log('avg rgb:', Math.round(r / n), Math.round(g / n), Math.round(b / n))
const sorted = [...hueBuckets.entries()].sort((a, b2) => b2[1] - a[1]).slice(0, 5)
const total = [...hueBuckets.values()].reduce((a, b2) => a + b2, 0)
console.log('dominant hue buckets (deg -> %):', sorted.map(([h, c]) => `${h}°->${((c / total) * 100).toFixed(1)}%`).join('  '))
