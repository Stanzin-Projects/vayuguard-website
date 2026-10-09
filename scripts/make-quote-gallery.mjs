import sharp from 'sharp'
import { mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

/* Builds the extra gallery images for the "Get Quote" product modal:
   public/products/<id>-detail-1.webp  — top half detail
   public/products/<id>-detail-2.webp  — bottom half detail
   Sourced from the product's own studio photo (front) when available,
   else the application photo, else skipped (modal hides missing slides). */

const OUT = 'public/products'
mkdirSync(OUT, { recursive: true })

const crops = [
  { id: 'hcac-a-1000', src: 'hcac-a-1000.webp' },
  { id: 'hcac-a-2000', src: 'hcac-a-2000.webp' },
  { id: 'hcac-cs-1000', src: 'hcac-cs-1000.webp' },
  { id: 'hcac-slim', src: 'hcac-slim.webp' },
  { id: 'fcu-hcac', src: 'fcu-hcac.webp' },
  { id: 'csu', src: 'csu.webp' },
  { id: 'pre-filter', src: 'pre-filter.webp' },
  { id: 'erv', src: 'erv.webp' },
  { id: 'vayushield-split', src: 'vayushield-split.webp' },
  { id: 'vayushield-cassette', src: 'vayushield-cassette.webp' },
  { id: 'hrac-small', src: 'hrac-small.webp' },
  { id: 'hrac-medium', src: 'hrac-medium.webp' },
  { id: 'hrac-big', src: 'hrac-big.webp' },
  { id: 'kitchen-unit', src: 'kitchen-unit.webp' },
  { id: 'afm', src: 'afm.webp' },
  { id: 'uvgi-duct', src: 'uvgi-duct.webp' },
  { id: 'uvgi-upper', src: 'uvgi-upper.webp' },
  { id: 'anop-duct', src: 'anop-duct.webp' },
  { id: 'anop-candle', src: 'anop-candle.webp' },
  { id: 'anob', src: 'anob.webp' },
  { id: 'plasm-ion', src: 'plasm-ion.webp' },
  { id: 'plasm-ion-wearable', src: 'plasm-ion-wearable.webp' },
  { id: 'activated-carbon', src: 'activated-carbon.webp' },
  { id: 'granular-carbon', src: 'granular-carbon.webp' },
  { id: 'chemical-gas-phase', src: 'chemical-gas-phase.webp' },
  { id: 'v-shape-absorber', src: 'v-shape-absorber.webp' },
  { id: 'vayuview-indoor', src: 'vayuview-indoor.webp' },
  { id: 'vayuview-outdoor', src: 'vayuview-outdoor.webp' },
  { id: 'vayuview-dashboard', src: 'vayuview-dashboard.webp' },
  { id: 'hemac-stp', src: 'hemac-stp.webp' },
]

let made = 0, skipped = 0
for (const { id, src } of crops) {
  const input = join(OUT, src)
  if (!existsSync(input)) { console.error(`✗ ${id}: missing source ${src}`); skipped++; continue }

  // Get natural size so the crops are proportional
  const meta = await sharp(input).metadata()
  const { width, height } = meta

  // Detail 1: central 60% zoom crop (product body close-up)
  const w1 = Math.round(width * 0.6)
  const h1 = Math.round(height * 0.6)
  const left1 = Math.round((width - w1) / 2)
  const top1 = Math.round((height - h1) / 2)
  await sharp(input)
    .extract({ left: left1, top: top1, width: w1, height: h1 })
    .resize({ width: 700, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(join(OUT, `${id}-detail-1.webp`))

  // Detail 2: bottom-anchored crop (base/stand/label area) — varies the view
  const h2 = Math.round(height * 0.55)
  const w2 = Math.round(width * 0.75)
  const left2 = Math.round((width - w2) / 2)
  const top2 = Math.max(0, height - h2 - Math.round(height * 0.04))
  await sharp(input)
    .extract({ left: left2, top: top2, width: w2, height: h2 })
    .resize({ width: 700, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(join(OUT, `${id}-detail-2.webp`))

  made += 2
  console.log(`✓ ${id} (+2)`)
}
console.log(`done — ${made} images written, ${skipped} products skipped`)
