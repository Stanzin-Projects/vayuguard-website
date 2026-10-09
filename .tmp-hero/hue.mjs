import sharp from 'sharp'
const { data, info } = await sharp('.tmp-hero/run-check.png').raw().toBuffer({ resolveWithObject: true })
let warm = 0, green = 0, other = 0
for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i], g = data[i+1], b = data[i+2]
  const max = Math.max(r,g,b), min = Math.min(r,g,b)
  if (max - min < 18) continue
  let h
  if (max === r) h = 60*(((g-b)/(max-min))%6)
  else if (max === g) h = 60*((b-r)/(max-min)+2)
  else h = 60*((r-g)/(max-min)+4)
  if (h < 0) h += 360
  if (h <= 30 || h >= 345) warm++
  else if (h >= 90 && h <= 170) green++
  else other++
}
const t = warm + green + other
console.log(`warm(0-30,345-360): ${(100*warm/t).toFixed(1)}%  green: ${(100*green/t).toFixed(1)}%  other: ${(100*other/t).toFixed(1)}%`)
