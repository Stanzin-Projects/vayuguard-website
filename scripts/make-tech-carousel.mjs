import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

/* Converts the 4 attached product photos (VayuGuard HCAC unit + views) into
   background-free, center-fit 800x800 webp carousel slides in
   public/tech-carousel/. Duplicated paste files are de-duplicated by caller. */

const SRC = 'C:/Users/stanz/AppData/Local/Temp/freebuff-desktop-pastes'
const OUT = 'public/tech-carousel'
mkdirSync(OUT, { recursive: true })

/* [output name, paste file, keep original orientation] */
const jobs = [
  ['view-1.webp', 'paste-1790750550005-4912.png'], // black HCAC unit, 3/4 left view
  ['view-2.webp', 'paste-1790750565125-4912.png'], // silver duct frame, 3/4 right view
  ['view-3.webp', 'paste-1790750571660-4912.png'], // AHU cabinet pair, front-left view
]

for (const [out, file] of jobs) {
  await sharp(join(SRC, file))
    .resize({ width: 800, height: 800, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 82 })
    .toFile(join(OUT, out))
  console.log(`✓ ${out}`)
}
console.log('done')
