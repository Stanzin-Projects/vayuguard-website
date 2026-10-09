import sharp from 'sharp'

const file = process.argv[2]
const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info
let white = 0, dark = 0, mint = 0, total = 0
const rows = new Map()
for (let y = 0; y < height; y++) {
  let darkInRow = 0
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels
    const r = data[i], g = data[i + 1], b = data[i + 2]
    total++
    if (r > 245 && g > 245 && b > 245) white++
    else if (r < 90 && g < 90 && b < 90) { dark++; darkInRow++ }
    else if (g > r + 8 && g > b + 4 && g > 200) mint++
  }
  if (darkInRow > 6) rows.set(y, darkInRow)
}
console.log(file, `${width}x${height}`)
console.log('near-white %:', ((white / total) * 100).toFixed(1), '| dark %:', ((dark / total) * 100).toFixed(2), '| mint %:', ((mint / total) * 100).toFixed(1))
// cluster rows with dark pixels into bands
const ys = [...rows.keys()]
const bands = []
for (const y of ys) {
  const last = bands[bands.length - 1]
  if (last && y - last[1] <= 4) last[1] = y
  else bands.push([y, y])
}
console.log('text bands (y0-y1):', bands.map((b) => b.join('-')).join(', '))
