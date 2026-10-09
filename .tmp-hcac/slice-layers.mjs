// Slice the HCAC 2000 cutout into parallax depth layers via luminance masking + feathering.
// Usage: node slice-layers.cjs
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import zlib from 'node:zlib'

const here = path.dirname(url.fileURLToPath(import.meta.url))
const SRC = path.join(here, '..', 'public', 'hcac-cutout.png')

// ---------- minimal PNG decode (truecolor+alpha, non-interlaced) ----------
function decode(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a PNG')
  let pos = 8, W = 0, H = 0, depth = 0, ctype = 0, idat = []
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos)
    const type = buf.toString('ascii', pos + 4, pos + 8)
    const data = buf.subarray(pos + 8, pos + 8 + len)
    if (type === 'IHDR') {
      W = data.readUInt32BE(0); H = data.readUInt32BE(4)
      depth = data[8]; ctype = data[9]
      if (data[12] !== 0) throw new Error('interlaced PNG unsupported')
    } else if (type === 'IDAT') idat.push(data)
    pos += 12 + len
  }
  if (depth !== 8 || ctype !== 6) throw new Error(`unsupported depth=${depth} ctype=${ctype}`)
  const raw = zlib.inflateSync(Buffer.concat(idat))
  const stride = W * 4
  const out = Buffer.alloc(W * H * 4)
  const paeth = (a, b, c) => {
    const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c)
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c
  }
  for (let y = 0; y < H; y++) {
    const f = raw[y * (stride + 1)]
    const row = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1))
    const o = y * stride
    for (let i = 0; i < stride; i++) {
      const left = i >= 4 ? out[o + i - 4] : 0
      const up = y > 0 ? out[o - stride + i] : 0
      const ul = y > 0 && i >= 4 ? out[o - stride + i - 4] : 0
      let v = row[i]
      if (f === 1) v += left
      else if (f === 2) v += up
      else if (f === 3) v += (left + up) >> 1
      else if (f === 4) v += paeth(left, up, ul)
      out[o + i] = v & 0xff
    }
  }
  return { W, H, data: out }
}

// ---------- minimal PNG encode (truecolor+alpha, filter 0, one IDAT) ----------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const out = Buffer.alloc(12 + data.length)
  out.writeUInt32BE(data.length, 0)
  out.write(type, 4, 'ascii')
  data.copy(out, 8)
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length)
  return out
}
function encode(W, H, rgba) {
  const stride = W * 4
  const raw = Buffer.alloc((stride + 1) * H)
  for (let y = 0; y < H; y++) {
    raw[y * (stride + 1)] = 0
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4)
  ihdr[8] = 8; ihdr[9] = 6
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// ---------- image ops ----------
function luminance(img) {
  const { W, H, data } = img
  const lum = new Uint8Array(W * H)
  for (let i = 0; i < W * H; i++) {
    const o = i * 4
    lum[i] = Math.min(255, Math.round(0.299 * data[o] + 0.587 * data[o + 1] + 0.114 * data[o + 2]))
  }
  return lum
}

// connected components of a binary mask (4-neighbour BFS); returns label array + stats
function components(mask, W, H) {
  const label = new Int32Array(W * H).fill(-1)
  const stats = []
  const stack = new Int32Array(W * H)
  let next = 0
  for (let s = 0; s < W * H; s++) {
    if (!mask[s] || label[s] !== -1) continue
    const id = next++
    let sp = 0, size = 0, x0 = W, x1 = 0, y0 = H, y1 = 0, sx = 0, sy = 0
    stack[sp++] = s; label[s] = id
    while (sp > 0) {
      const i = stack[--sp]
      const x = i % W, y = (i / W) | 0
      size++; sx += x; sy += y
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y
      if (x > 0 && mask[i - 1] && label[i - 1] === -1) { label[i - 1] = id; stack[sp++] = i - 1 }
      if (x < W - 1 && mask[i + 1] && label[i + 1] === -1) { label[i + 1] = id; stack[sp++] = i + 1 }
      if (y > 0 && mask[i - W] && label[i - W] === -1) { label[i - W] = id; stack[sp++] = i - W }
      if (y < H - 1 && mask[i + W] && label[i + W] === -1) { label[i + W] = id; stack[sp++] = i + W }
    }
    stats.push({ id, size, x0, x1, y0, y1, h: y1 - y0 + 1, cx: sx / size, cy: sy / size })
  }
  return { label, stats }
}

// feather a binary (0/1) float mask with a 3x3 box blur, `passes` times
function feather(bin, W, H, passes = 2) {
  let a = Float32Array.from(bin)
  let b = new Float32Array(W * H)
  for (let p = 0; p < passes; p++) {
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = y * W + x
        let sum = 0, n = 0
        for (let dy = -1; dy <= 1; dy++) {
          const yy = y + dy; if (yy < 0 || yy >= H) continue
          for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx; if (xx < 0 || xx >= W) continue
            sum += a[yy * W + xx]; n++
          }
        }
        b[i] = sum / n
      }
    }
    ;[a, b] = [b, a]
  }
  return a
}

// ---------- main ----------
const img = decode(fs.readFileSync(SRC))
const { W, H, data } = img
const N = W * H
console.log(`source ${W}x${H}`)

const lum = luminance(img)
const opaque = new Uint8Array(N)
let opaqueCount = 0
for (let i = 0; i < N; i++) { opaque[i] = data[i * 4 + 3] > 100 ? 1 : 0; opaqueCount += opaque[i] }

// grilles: large tall dark components on the LEFT face of the unit
const dark = new Uint8Array(N)
for (let i = 0; i < N; i++) dark[i] = opaque[i] && lum[i] < 70 ? 1 : 0
const { label, stats } = components(dark, W, H)
const grilleComps = stats.filter((s) => s.size >= 10000 && s.h >= 120 && s.cx < W * 0.45)
console.log('dark components >=10k px:', stats.filter((s) => s.size >= 10000).map((s) => `size=${s.size} h=${s.h} cx=${s.cx | 0} cy=${s.cy | 0}`).join('  ') || 'none')
if (!grilleComps.length) throw new Error('no grille components detected')

// base: the dark plinth component in the bottom band — split at its top edge
const plinth = stats
  .filter((s) => s.size >= 10000 && s.cy >= H * 0.75)
  .sort((a, b) => b.size - a.size)[0]
if (!plinth) throw new Error('no plinth component detected')
const ySplit = Math.max(0, plinth.y0 - 2)
console.log(`grille comps: ${grilleComps.map((s) => s.id).join(',')}  plinth id=${plinth.id} top=${plinth.y0} -> ySplit=${ySplit}`)

const binGrille = new Uint8Array(N)
const binBase = new Uint8Array(N)
const binCab = new Uint8Array(N)
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * W + x
    if (!opaque[i]) continue
    if (label[i] !== -1 && grilleComps.some((s) => s.id === label[i])) binGrille[i] = 1
    else if (y >= ySplit) binBase[i] = 1
    else binCab[i] = 1
  }
}

// feather + composite: layer RGB = source RGB, layer alpha = source alpha * mask
function layer(mask) {
  const soft = feather(mask, W, H, 2)
  const out = Buffer.alloc(N * 4)
  let cov = 0
  for (let i = 0; i < N; i++) {
    const o = i * 4
    out[o] = data[o]; out[o + 1] = data[o + 1]; out[o + 2] = data[o + 2]
    out[o + 3] = Math.round(data[o + 3] * soft[i])
    if (out[o + 3] > 8) cov++
  }
  return { out, cov }
}
const layers = { grille: layer(binGrille), cabinet: layer(binCab), base: layer(binBase) }
for (const [name, l] of Object.entries(layers)) {
  const file = path.join(here, `hcac-layer-${name}.png`)
  fs.writeFileSync(file, encode(W, H, l.out))
  console.log(`${name}: coverage=${((100 * l.cov) / opaqueCount).toFixed(1)}% -> ${path.basename(file)}`)
}

console.log('done')
