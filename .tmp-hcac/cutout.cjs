// Edge-connected background removal for HCAC 2000 product photo.
// Usage: node cutout.js analyze <raw.rgb>     -> report per-threshold leak/shadow status
//        node cutout.js apply <raw.rgb> T S  -> write <raw>.rgba with alpha (feathered)
const fs = require('fs')
const W = 1254, H = 1254, N = W * H

const raw = fs.readFileSync(process.argv[3] || process.argv[2])
if (raw.length !== N * 3) { console.error('bad raw size ' + raw.length); process.exit(1) }

// conservative brightness = min channel; saturation = max-min
const lum = new Uint8Array(N), sat = new Uint8Array(N)
for (let i = 0; i < N; i++) {
  const r = raw[i*3], g = raw[i*3+1], b = raw[i*3+2]
  lum[i] = Math.min(r, g, b)
  sat[i] = Math.max(r, g, b) - Math.min(r, g, b)
}

function fill(T, S) {
  const mask = new Uint8Array(N) // 2 = visited (background)
  const stack = []
  const seed = (x, y) => { const i = y*W + x; if (!mask[i] && lum[i] >= T && sat[i] <= S) { mask[i] = 2; stack.push(i) } }
  for (let x = 0; x < W; x++) { seed(x, 0); seed(x, H-1) }
  for (let y = 0; y < H; y++) { seed(0, y); seed(W-1, y) }
  while (stack.length) {
    const i = stack.pop(), x = i % W, y = (i / W) | 0
    const tryN = (j) => { if (!mask[j] && lum[j] >= T && sat[j] <= S) { mask[j] = 2; stack.push(j) } }
    if (x > 0) tryN(i-1); if (x < W-1) tryN(i+1)
    if (y > 0) tryN(i-W); if (y < H-1) tryN(i+W)
  }
  return mask
}

// interior pixels that must stay opaque; + outside pixels that must be removed
const PROTECT = [[500,230],[850,550],[300,260],[350,205],[370,400],[627,1020],[200,700],[1000,300],[627,600]]
const REMOVE  = [[30,30],[1220,100],[100,1200],[627,1085],[400,1075],[627,1240],[30,627]]

// flood restricted to a y-band (for the soft shadow zone under the base)
function fillZone(T, S, yMin) {
  const mask = new Uint8Array(N)
  const stack = []
  const seed = (x, y) => { const i = y*W + x; if (y >= yMin && !mask[i] && lum[i] >= T && sat[i] <= S) { mask[i] = 2; stack.push(i) } }
  for (let x = 0; x < W; x++) seed(x, H-1)
  for (let y = yMin; y < H; y++) { seed(0, y); seed(W-1, y) }
  while (stack.length) {
    const i = stack.pop(), x = i % W, y = (i / W) | 0
    const tryN = (j, yy) => { if (yy >= yMin && !mask[j] && lum[j] >= T && sat[j] <= S) { mask[j] = 2; stack.push(j) } }
    if (x > 0) tryN(i-1, y); if (x < W-1) tryN(i+1, y)
    if (y > yMin) tryN(i-W, y-1); if (y < H-1) tryN(i+W, y+1)
  }
  return mask
}

const mode = process.argv[2]
if (mode === 'analyze') {
  const rawPath = process.argv[3]
  for (const T of [252,250,248,246,244,242,240,236,232,228]) {
    const m = fill(T, 40)
    let count = 0; for (let i = 0; i < N; i++) if (m[i]) count++
    const leaked = PROTECT.filter(([x,y]) => m[y*W+x]).map(([x,y]) => `${x},${y}`)
    const missed = REMOVE.filter(([x,y]) => !m[y*W+x]).map(([x,y]) => `${x},${y}`)
    console.log(`T=${T} removed=${(100*count/N).toFixed(1)}% leak=${leaked.length ? leaked.join(' ') : 'none'} missed=${missed.length ? missed.join(' ') : 'none'}`)
  }
} else if (mode === 'apply2') {
  const rawPath = process.argv[3]
  const m1 = fill(252, 40)          // pure-white background
  const m2 = fillZone(148, 40, 1042) // soft drop-shadow gradient under the base
  const m = new Uint8Array(N)
  for (let i = 0; i < N; i++) m[i] = m1[i] || m2[i] ? 2 : 0
  const out = Buffer.alloc(N * 4)
  for (let i = 0; i < N; i++) {
    let a = m[i] ? 0 : 255
    if (!m[i]) {
      const x = i % W, y = (i / W) | 0
      const nb = (x > 0 && m[i-1]) || (x < W-1 && m[i+1]) || (y > 0 && m[i-W]) || (y < H-1 && m[i+W])
      if (nb && lum[i] >= 200) a = 110 // feather bright boundary pixels
    }
    out[i*4] = raw[i*3]; out[i*4+1] = raw[i*3+1]; out[i*4+2] = raw[i*3+2]
    out[i*4+3] = a
  }
  fs.writeFileSync(rawPath.replace(/\.rgb$/, '.rgba'), out)
  // content bounding box
  let x0 = W, x1 = 0, y0 = H, y1 = 0, opaque = 0
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (!m[y*W+x]) { opaque++; if (x<x0)x0=x; if (x>x1)x1=x; if (y<y0)y0=y; if (y>y1)y1=y }
  }
  console.log(`applied removed=${(100*(N-opaque)/N).toFixed(1)}% opaque=${opaque} bbox=${x1-x0+1}x${y1-y0+1}+${x0}+${y0}`)
  const leaks = PROTECT.filter(([x,y]) => m[y*W+x])
  const missed = REMOVE.filter(([x,y]) => !m[y*W+x])
  console.log('leaks=' + (leaks.length ? leaks.join(' ') : 'none') + ' missed=' + (missed.length ? missed.join(' ') : 'none'))
} else if (mode === 'apply') {
  const rawPath = process.argv[3]
  const T = parseInt(process.argv[4], 10), S = parseInt(process.argv[5], 10)
  const m = fill(T, S)
  const out = Buffer.alloc(N * 4)
  out.set(raw) // RGB channels as-is
  for (let i = 0; i < N; i++) {
    let a = m[i] ? 0 : 255
    if (!m[i]) {
      // feather: fade pixels at the cut boundary that are still bright (anti-alias the edge)
      const x = i % W, y = (i / W) | 0
      const nb = (x > 0 && m[i-1]) || (x < W-1 && m[i+1]) || (y > 0 && m[i-W]) || (y < H-1 && m[i+W])
      if (nb && lum[i] >= T - 20) a = 120
    }
    out[i*4+3] = a
  }
  fs.writeFileSync(rawPath.replace(/\.rgb$/, '.rgba'), out)
  let count = 0; for (let i = 0; i < N; i++) if (m[i]) count++
  console.log(`applied T=${T} S=${S} removed=${(100*count/N).toFixed(1)}%`)
}
