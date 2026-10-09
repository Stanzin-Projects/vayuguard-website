import sharp from 'sharp'

for (const file of ['public/vayuguard-logo.png', 'public/favicon.png']) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const buckets = new Map()
  let n = 0
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
  const samples = []
  for (let i = 0; i < data.length; i += channels) {
    const a = channels === 4 ? data[i + 3] : 255
    if (a < 200) continue
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const { h, s, l } = toHsl(r, g, b)
    n++
    if (s > 0.35 && l > 0.25 && l < 0.8) {
      const key = Math.floor(h / 15) * 15
      const cur = buckets.get(key) || { count: 0, r: 0, g: 0, b: 0 }
      cur.count++; cur.r += r; cur.g += g; cur.b += b
      buckets.set(key, cur)
      samples.push([r, g, b, h])
    }
  }
  const top = [...buckets.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 6)
  console.log(file, '| opaque px:', n)
  for (const [hue, c] of top) {
    const hex = [c.r, c.g, c.b].map((v) => Math.round(v / c.count).toString(16).padStart(2, '0')).join('')
    console.log(`  hue ${hue}-${Number(hue) + 15}°  ${((c.count / n) * 100).toFixed(1)}%  avg #%${hex}`)
  }
}
