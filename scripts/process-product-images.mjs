import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'

/* Converts the supplied product photography (.tmp-products/Products) into
   optimized webp pairs in public/products/: <id>.webp (studio front) and
   <id>-app.webp (application shot revealed on hover-flip). */

const SRC = '.tmp-products/Products'
const OUT = 'public/products'
mkdirSync(OUT, { recursive: true })

const jobs = [
  // [id, frontPath, backPath] — paths relative to SRC
  ['hcac-a-1000', 'HCAC-A-1000 CFM/Grey Color HCAC with New Logos/Grey HCAC 1000.png', 'HCAC-A-1000 CFM/Grey Color HCAC with New Logos/After Installation_.png'],
  ['hcac-a-2000', 'HCAC-A-2000 CFM/WIth New logos/HCAC_2000_CFM.png', 'HCAC-A-2000 CFM/WIth New logos/After Installation.png'],
  ['hcac-cs-1000', 'HCAC-CS-1000CFM/1 HCAC-CS-1000.png', 'HCAC-CS-1000CFM/HCAC-CS-1000 CFM (1).png'],
  ['hcac-slim', 'HCAC-SLIM/HCAC_Slim.png', 'HCAC-SLIM/HCAC_Slim After Installing.png'],
  ['fcu-hcac', 'FCU-HCAC/FCU-HCAC1.png', 'FCU-HCAC/With size.png'],
  ['csu', 'Ceiling Suspended Unit/Ceiling Suspended Unit.png', 'Ceiling Suspended Unit/After Installation CSU_1.jpeg'],
  ['pre-filter', 'Pre-Filter/Preffilter.png', null],
  ['erv', 'Energy Recovery Ventilation-ERV/106.png', 'Energy Recovery Ventilation-ERV/107.png'],
  ['uvgi-duct', 'UVGI Systems/Duct Mount UVGI/Duct Mount UVGI 1.png', 'UVGI Systems/Duct Mount UVGI/Duct Mount UVGI 01.png'],
  ['uvgi-upper', 'UVGI Systems/Upper Room UVGI/Upper Room UVGI (1).png', null],
  ['anop-duct', 'ANOP/For Ducts and Cassete Unit/2 ANOP (New Units).png', 'ANOP/For Ducts and Cassete Unit/VG - Product Images JPG Files for India Mart (9).png'],
  ['anop-candle', 'ANOP/Candle Shape Design/1 ANOP (New Units).png', 'ANOP/Candle Shape Design/ANOP (BIG).png'],
  ['anob', 'ANOB/Small ANOB/Black_ANOB.png', 'ANOB/Small ANOB/BLACK_ANOB_1.png'],
  ['vayushield-split', 'Vayuhsheild Split AC Purifier/VayuShield.png', 'Vayuhsheild Split AC Purifier/VayuSheild Split Ac.png'],
  ['vayushield-cassette', 'Vayushield Cassete Unit AC Purifier/Vayushield_Cassete unit.png', 'Vayushield Cassete Unit AC Purifier/Vayushield Casste unit 2.png'],
  ['hrac-small', 'HRAC/Small/HRAC SMALL.png', 'HRAC/Small/HRAC Medium.png'],
  ['hrac-medium', 'HRAC/Medium/Medium HRAC.jpg', null],
  ['hrac-big', 'HRAC/BIG/Big HRAC.jpg', null],
  ['kitchen-unit', 'Kitchen Unit/1 Kitchen Unit.png', 'Kitchen Unit/2 Kitchen Unit.png'],
  ['plasm-ion', 'Plasm-ION-Bipolar/UL_Bipolar.png', 'Plasm-ION-Bipolar/Biopolar 1 (1).png'],
  ['plasm-ion-wearable', 'Vayuguard Plasm-ION (Wearable Air Purifier)/1.png', 'Vayuguard Plasm-ION (Wearable Air Purifier)/2.png'],
  ['vayuview-indoor', 'Vayuview Air Quality Monitor/Indoor Air Quality Monitor/Vayuview_Indoor Air Quality Monitor.png', 'Vayuview Air Quality Monitor/Indoor Air Quality Monitor/Vayu 1.png'],
  ['vayuview-outdoor', 'Vayuview Air Quality Monitor/Outdoor Air Quality Monitor/Vayuview_outdoor_Air Quality Monitor.jpg', 'Vayuview Air Quality Monitor/Outdoor Air Quality Monitor/Vayuview_outdoor_Air_Quality Monitor 2.jpg'],
  ['vayuview-dashboard', 'Vayuview Air Quality Monitor/Dashboard/Dashboard_1.png', 'Vayuview Air Quality Monitor/Dashboard/Dashboard_2.png'],
  ['activated-carbon', 'Activated Carbon Filter/1 Activated Carbon Filter.png', 'Activated Carbon Filter/2 Activated Carbon filter.png'],
  ['granular-carbon', 'Granular Activated Carbon Filter/Product Image.png', 'Granular Activated Carbon Filter/After Installation.jpg'],
  ['chemical-gas-phase', 'Chemical & Gas Phase Filtration/Chemical Gas Phase Filteration.png', 'Chemical & Gas Phase Filtration/After Installation.jpg'],
  ['v-shape-absorber', 'V-Shape Absorber/Casing 1.jpg', 'V-Shape Absorber/Filter 1.jpg'],
  ['afm', 'Air Flushing Machine/Air Flushing Machine_1.jpg', 'Air Flushing Machine/VG - Product Images JPG Files for India Mart (8).png'],
  ['hemac-stp', 'HEMAC-STP-Solution/HEMAC.jpg', null],
]

const OPTS = { width: 800, height: 800, fit: 'inside', withoutEnlargement: true }

let fail = 0
for (const [id, front, back] of jobs) {
  try {
    await sharp(join(SRC, front)).resize(OPTS).webp({ quality: 78 }).toFile(join(OUT, `${id}.webp`))
    if (back) await sharp(join(SRC, back)).resize(OPTS).webp({ quality: 78 }).toFile(join(OUT, `${id}-app.webp`))
    console.log(`✓ ${id}`)
  } catch (e) {
    console.error(`✗ ${id}: ${e.message} (${front})`)
    fail++
  }
}
console.log(fail ? `${fail} failed` : `done — ${jobs.length} products → public/products/`)
process.exitCode = fail ? 1 : 0
