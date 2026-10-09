#!/usr/bin/env node
/* ─────────────────────────────────────────────────────────────────────────────
   Generate a gallery video for every product from its four stills
   (studio → installed → detail → base detail) so each product page ends its
   media gallery with a clip even when no real footage exists.

   • Ken-Burns slow zoom (alternate zoom-in / zoom-out per still)
   • 0.5 s cross-fades between stills, product name title, 960×720 (4:3, matches
     the gallery stage), H.264 + faststart, no audio.
   • Skips products that already ship real footage (SKIP) and any output that
     already exists, unless --force is passed.

   Usage:  node scripts/make-product-videos.mjs [--force]
   Requires ffmpeg on PATH.
───────────────────────────────────────────────────────────────────────────── */
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PRODUCTS } from '../src/data/catalog.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = path.join(ROOT, 'public')
const OUT_W = 960
const OUT_H = 720
const FPS = 25
const PER_STILL = 3.2 // seconds each still is on screen
const FADE = 0.5 // cross-fade duration
/* Font is copied next to this script so the ffmpeg filtergraph needs no
   absolute Windows path (a drive-letter colon breaks filter option parsing). */
const FONT = 'scripts/segoe-bold.ttf'
const SYSTEM_FONT = 'C:/Windows/Fonts/segoeuib.ttf' // Segoe UI Bold
if (!existsSync(path.join(ROOT, FONT))) copyFileSync(SYSTEM_FONT, path.join(ROOT, FONT))

/* Products that already have real footage — never overwrite those. */
const SKIP = new Set(['hcac-a-1000', 'plasm-ion'])
const FORCE = process.argv.includes('--force')

const stillsFor = (p) =>
  [p.img, p.appImg, p.detail1, p.detail2].filter(Boolean).map((rel) =>
    path.join(PUBLIC, rel.replace(/^\//, '')),
  ).filter(existsSync)

function filterFor(images, titleFile) {
  const frames = Math.round(PER_STILL * FPS)
  const chains = images.map((_, i) => {
    /* alternate a slow push-in and a slow pull-out for rhythm */
    const z =
      i % 2 === 0
        ? `min(1.0+0.0015*on,1.14)`
        : `max(1.14-0.0015*on,1.0)`
    return (
      `[${i}:v]scale=${OUT_W * 1.25}:${OUT_H * 1.25}:force_original_aspect_ratio=increase,` +
      `crop=${OUT_W * 1.25}:${OUT_H * 1.25},` +
      `zoompan=z='${z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':` +
      `d=${frames}:s=${OUT_W}x${OUT_H}:fps=${FPS},setsar=1,format=yuv420p[v${i}]`
    )
  })

  /* cross-fade the stills together; offset_k = length_{k-1} - FADE */
  const joins = []
  let prev = 'v0'
  let length = PER_STILL
  for (let k = 1; k < images.length; k++) {
    const out = k === images.length - 1 ? 'vout' : `x${k}`
    joins.push(
      `[${prev}][v${k}]xfade=transition=fade:duration=${FADE}:offset=${(length - FADE).toFixed(2)}[${out}]`,
    )
    length += PER_STILL - FADE
    prev = out
  }

  const title =
    `drawtext=fontfile=${FONT}:textfile=${titleFile}:fontsize=44:` +
    `fontcolor=white:box=1:boxcolor=0x1f2937@0.72:boxborderw=18:` +
    `shadowx=2:shadowy=2:x=36:y=h-th-36`

  return [...chains, ...joins, `[${prev}]${title},format=yuv420p[vfinal]`].join(';')
}

let made = 0
let skipped = 0
const failures = []

for (const p of PRODUCTS) {
  const out = path.join(PUBLIC, 'products', `${p.id}-video.mp4`)
  if (SKIP.has(p.id)) {
    console.log(`SKIP  ${p.id} (real footage)`)
    skipped++
    continue
  }
  if (existsSync(out) && !FORCE) {
    console.log(`SKIP  ${p.id} (exists)`)
    skipped++
    continue
  }
  const images = stillsFor(p)
  if (images.length === 0) {
    failures.push(`${p.id}: no images found`)
    continue
  }

  /* relative path — absolute Windows paths break ffmpeg's filter parser */
  const titleFile = 'scripts/tmp-title.txt'
  writeFileSync(path.join(ROOT, titleFile), p.name, 'utf8')

  const args = ['-y', '-loglevel', 'error']
  for (const img of images) args.push('-i', img)
  args.push(
    '-filter_complex', filterFor(images, titleFile),
    '-map', '[vfinal]',
    '-an',
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '28',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    out,
  )

  try {
    execFileSync('ffmpeg', args, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] })
    made++
    console.log(`OK    ${p.id} (${images.length} stills)`)
  } catch (err) {
    const msg = (err.stderr?.toString() || err.message).trim().split('\n').slice(-3).join(' | ')
    failures.push(`${p.id}: ${msg}`)
    console.error(`FAIL  ${p.id}: ${msg}`)
  } finally {
    rmSync(path.join(ROOT, titleFile), { force: true })
  }
}

console.log(`\n${made} generated, ${skipped} skipped, ${failures.length} failed`)
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
