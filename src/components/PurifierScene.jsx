import { useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Float } from '@react-three/drei'
import { TextureLoader, SRGBColorSpace, LinearMipmapLinearFilter } from 'three'
import * as THREE from 'three'

// photo slices produced by .tmp-hcac/slice-layers.mjs (854x904 each, feathered alpha)
const LAYER_URLS = ['/hcac-layer-base.png', '/hcac-layer-cabinet.png', '/hcac-layer-grille.png']
const DEPTHS = [-0.36, 0, 0.4] // base behind, cabinet middle, grilles front
const AMP = [0.06, 0.1, 0.2] // per-layer parallax sway amplitude
const PLANE_W = 1.62
const PLANE_H = PLANE_W * (904 / 854)
const AZ_LIMIT = 0.85 // sway angle limit (radians) — photo has no back face
const AUTO_SPEED = 0.7

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smoothstep = (a, b, x) => {
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5
const hexToRGB = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function prepTexture(tex) {
  tex.colorSpace = SRGBColorSpace
  tex.anisotropy = 8
  tex.generateMipmaps = true
  tex.minFilter = LinearMipmapLinearFilter
  tex.needsUpdate = true
}

/* ============================================================
   Living mountain scene — real photo backdrop + mist + sun glow
   ============================================================ */

function MountainBackdrop() {
  const tex = useLoader(TextureLoader, '/mountain-scene.webp')
  useEffect(() => prepTexture(tex), [tex])
  const ref = useRef()
  useFrame(({ camera, clock }) => {
    const m = ref.current
    if (!m) return
    // billboard toward the camera (yaw only) + a slow cinematic drift
    m.rotation.y = Math.atan2(camera.position.x, camera.position.z) + Math.sin(clock.elapsedTime * 0.07) * 0.025
    m.position.x = Math.sin(clock.elapsedTime * 0.05) * 0.1
  })
  return (
    <mesh ref={ref} position={[0, 0.42, -2.55]}>
      <planeGeometry args={[8.6, 4.3]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} opacity={0.96} />
    </mesh>
  )
}

/* warm morning sun caught in the valley photo */
function SunGlow() {
  const ref = useRef()
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const ctx = c.getContext('2d')
    const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 64)
    g.addColorStop(0, 'rgba(255,250,228,0.9)')
    g.addColorStop(0.35, 'rgba(255,244,214,0.35)')
    g.addColorStop(1, 'rgba(255,244,214,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 128, 128)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = SRGBColorSpace
    return t
  }, [])
  useEffect(() => () => tex.dispose(), [tex])
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 2.3 + Math.sin(clock.elapsedTime * 0.4) * 0.08
      ref.current.scale.set(s, s, 1)
    }
  })
  return (
    <sprite ref={ref} position={[-2.05, 1.95, -2.5]}>
      <spriteMaterial map={tex} transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  )
}

/* low mist drifting through the valley floor of the photo */
function ValleyMist({ count = 7 }) {
  const tex = useLoader(TextureLoader, '/smoke-puff.webp')
  const group = useRef()
  const mists = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const mat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
          opacity: 0,
          color: '#f2faf4',
        })
        return {
          mat,
          x: -3 + Math.random() * 6,
          y: -1.35 + Math.random() * 0.5,
          z: -2.1 + Math.random() * 0.5,
          s: 1.4 + Math.random() * 1.4,
          speed: 0.04 + Math.random() * 0.05,
          ph: Math.random() * Math.PI * 2,
        }
      }),
    [count, tex]
  )
  useEffect(() => () => mists.forEach((m) => m.mat.dispose()), [mists])
  useFrame(({ clock }, delta) => {
    if (REDUCED_MOTION) return
    const dt = Math.min(delta, 0.05)
    const t = clock.elapsedTime
    mists.forEach((m) => {
      m.x += dt * m.speed
      if (m.x > 3.4) m.x = -3.4
      m.mat.opacity = 0.14 + 0.05 * Math.sin(t * 0.25 + m.ph)
    })
    if (group.current) {
      group.current.children.forEach((sp, i) => {
        const m = mists[i]
        if (sp && m) sp.position.set(m.x, m.y + Math.sin(t * 0.18 + m.ph) * 0.04, m.z)
      })
    }
  })
  return (
    <group ref={group}>
      {mists.map((m, i) => (
        <sprite key={i} material={m.mat} scale={[m.s * 1.5, m.s, 1]} position={[m.x, m.y, m.z]} />
      ))}
    </group>
  )
}

/* ============================================================
   Clouds — soft puffs drifting slowly across the sky of the photo
   ============================================================ */

function Clouds({ count = 5 }) {
  const tex = useLoader(TextureLoader, '/smoke-puff.webp')
  const group = useRef()
  const clouds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const mat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
          opacity: 0,
          color: '#fdfffe',
        })
        return {
          mat,
          x: -3.4 + (i * 1.75) % 6.8,
          y: 2.1 + Math.random() * 0.75,
          z: -2.35,
          s: 1.9 + Math.random() * 1.5,
          speed: 0.035 + Math.random() * 0.03,
          ph: Math.random() * Math.PI * 2,
        }
      }),
    [count, tex]
  )
  useEffect(() => () => clouds.forEach((c) => c.mat.dispose()), [clouds])
  useFrame(({ clock }, delta) => {
    if (REDUCED_MOTION) return
    const dt = Math.min(delta, 0.05)
    const t = clock.elapsedTime
    clouds.forEach((c, i) => {
      c.x += dt * c.speed
      if (c.x > 3.6) c.x = -3.6
      c.mat.opacity = 0.38 + 0.06 * Math.sin(t * 0.12 + c.ph)
      const sp = group.current?.children[i]
      if (sp) sp.position.set(c.x, c.y + Math.sin(t * 0.07 + c.ph) * 0.05, c.z)
    })
  })
  return (
    <group ref={group}>
      {clouds.map((c, i) => (
        <sprite key={i} material={c.mat} scale={[c.s * 1.7, c.s * 0.62, 1]} position={[c.x, c.y, c.z]} />
      ))}
    </group>
  )
}

/* ============================================================
   Dirty air — billowing smoke wisps + fine dust, sucked into
   the intake; clean air — laminar streams + sparkling ions out
   ============================================================ */

const dirtyAlpha = (x) => smoothstep(-2.6, -1.9, x) * (1 - smoothstep(-1.35, -0.9, x))

/* ionization glints — dust grains crackling as they're charged & captured
   on the electro-static media just inside the cabinet */
function CaptureSparks({ count = 42 }) {
  const mat = useFlowMaterial()
  const field = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const alphas = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const seeds = []
    const palette = ['#fcd34d', '#fde68a', '#a7f3d0', '#6ee7b7'].map(hexToRGB)
    for (let i = 0; i < count; i++) {
      seeds.push({
        x: -0.8 + Math.random() * 1.5,
        y: gauss() * 0.75,
        z: -0.1 + Math.random() * 0.5,
        tw: 3.5 + Math.random() * 6,
        ph: Math.random() * Math.PI * 2,
        drift: 0.05 + Math.random() * 0.1,
      })
      sizes[i] = 0.022 + Math.random() * 0.032
      colors.set(palette[i % palette.length], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    g.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1))
    g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    return { g, seeds }
  }, [count])
  useEffect(() => () => field.g.dispose(), [field])
  useFrame(({ clock }, delta) => {
    if (REDUCED_MOTION) return
    const dt = Math.min(delta, 0.05)
    const t = clock.elapsedTime
    const pos = field.g.attributes.position
    const alp = field.g.attributes.aAlpha
    for (let i = 0; i < count; i++) {
      const s = field.seeds[i]
      // sparks swarm the media, drifting slowly with the airflow
      s.x += dt * s.drift
      if (s.x > 0.72) s.x = -0.8
      const flicker = Math.max(0, Math.sin(t * s.tw + s.ph))
      const spike = Math.pow(flicker, 5) // brief sharp glints
      pos.setXYZ(i, s.x, s.y + Math.sin(t * 1.7 + s.ph) * 0.02, s.z + Math.cos(t * 1.3 + s.ph) * 0.02)
      alp.setX(i, spike * 0.9)
    }
    pos.needsUpdate = true
    alp.needsUpdate = true
  })
  return (
    <points geometry={field.g} frustumCulled={false}>
      <primitive object={mat} attach="material" />
    </points>
  )
}

function SmokePuffs({ count = 26 }) {
  const tex = useLoader(TextureLoader, '/smoke-puff.webp')
  const puffs = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const mat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
          opacity: 0,
          rotation: Math.random() * Math.PI * 2,
          color: new THREE.Color().setHSL(0.08 + Math.random() * 0.03, 0.18 + Math.random() * 0.1, 0.3 + Math.random() * 0.12),
        })
        // 2 trailing lobes get their own material so they can lag/rotate freely
        const lobes = [0, 1].map(() => mat.clone())
        return {
          mat,
          lobes,
          x: -2.9 + Math.random() * 1.9,
          y0: gauss() * 0.5,
          z: -0.55 + Math.random() * 0.9,
          speed: 0.34 + Math.random() * 0.38,
          drag: 0.6 + Math.random() * 2.2,
          baseS: 0.34 + Math.random() * 0.44,
          rotSpeed: (Math.random() - 0.5) * 0.5,
          ph: Math.random() * Math.PI * 2,
          wob: 0.4 + Math.random() * 0.8,
        }
      }),
    [count, tex]
  )
  useEffect(() => () => puffs.forEach((p) => {
    p.mat.dispose()
    p.lobes.forEach((m) => m.dispose())
  }), [puffs])
  const group = useRef()
  useFrame(({ clock }, delta) => {
    if (REDUCED_MOTION) return
    const dt = Math.min(delta, 0.05)
    const t = clock.elapsedTime
    puffs.forEach((p, i) => {
      p.x += dt * p.speed
      if (p.x > -0.86) {
        p.x = -2.95 - Math.random() * 0.5
        p.y0 = gauss() * 0.5
        p.z = -0.55 + Math.random() * 0.9
        p.speed = 0.34 + Math.random() * 0.38
      }
      // smoke rises as it drifts, and the stream bends toward the intake centre
      const rise = 0.16 * smoothstep(-2.9, -0.9, p.x)
      const conv = 1 - 0.55 * smoothstep(-1.8, -0.9, p.x)
      // venturi pull: air accelerates hard into the narrowing intake cone
      const targetSpeed = 0.34 + 0.85 * smoothstep(-1.9, -0.86, p.x)
      p.speed += dt * p.drag * (targetSpeed - p.speed)
      // vortex curl: each puff rolls around a point below-left of the intake
      const dx = -0.72 - p.x
      const dy = -0.1 - p.y0
      const d2 = dx * dx + dy * dy + 0.05
      const swirl = (0.5 * smoothstep(-2.1, -0.86, p.x)) / d2
      p.y0 += (dy * swirl * 0.08 - dx * swirl * 0.04) * dt
      p.z += -dx * swirl * 0.03 * dt
      const y = (p.y0 + rise + Math.sin(t * p.wob + p.ph) * 0.055) * conv
      // puffs billow outward as they drift, then get flattened into the intake
      const grow = 0.7 + 0.55 * smoothstep(-2.9, -1.4, p.x)
      const squish = 1 - 0.25 * smoothstep(-1.5, -0.9, p.x)
      const s = p.baseS * grow
      const fade = dirtyAlpha(p.x)
      p.mat.opacity = 0.78 * fade
      p.mat.rotation += p.rotSpeed * dt
      const sp = group.current?.children[i]
      if (sp) {
        sp.position.set(p.x, y, p.z)
        sp.scale.set(s * 1.3 / squish, s * squish, 1)
        // the puff is a small cluster: lobes orbit the core and lag behind,
        // so the plume billows instead of sliding like a rigid sticker
        const lobes = sp.children
        for (let l = 0; l < lobes.length; l++) {
          const lobe = lobes[l]
          const lmat = lobe.material
          const swirlSpin = t * (1.4 + p.wob) + p.ph
          const spread = smoothstep(-2.4, -1.1, p.x)
          lobe.position.set(
            Math.cos(swirlSpin + l * 2.1) * 0.05 * (l + 1) * spread,
            Math.sin(swirlSpin + l * 2.1) * 0.045 * (l + 1) * spread + rise * 0.3 * (l + 1),
            0.02 * (l + 1)
          )
          lmat.opacity = 0.5 * fade * (1 - (l + 1) * 0.22)
          lmat.rotation += (p.rotSpeed * (1 + (l + 1) * 0.7) + 0.25) * dt
        }
      }
    })
  })
  return (
    <group ref={group}>
      {puffs.map((p, i) => (
        <sprite key={i} material={p.mat}>
          {p.lobes.map((lm, l) => (
            <sprite key={l} material={lm} scale={[0.6 - l * 0.14, 0.6 - l * 0.14, 1]} position={[l * 0.04, l * 0.03, l * 0.02]} />
          ))}
        </sprite>
      ))}
    </group>
  )
}

/* standing smog bank on the left — makes the incoming pollution always readable */
function SmogBank() {
  const tex = useLoader(TextureLoader, '/smoke-puff.webp')
  const group = useRef()
  const banks = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => {
        const mat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
          opacity: 0,
          rotation: Math.random() * Math.PI,
          color: new THREE.Color().setHSL(0.07, 0.2, 0.3 + i * 0.045),
        })
        return {
          mat,
          x: -2.1 + i * 0.32,
          y: 0.05 + (i % 2) * 0.3,
          z: -0.8,
          s: 2.0 + i * 0.38,
          rot: (i % 2 ? 1 : -1) * (0.05 + i * 0.02),
          ph: i * 1.7,
        }
      }),
    [tex]
  )
  useEffect(() => () => banks.forEach((b) => b.mat.dispose()), [banks])
  useFrame(({ clock }) => {
    if (REDUCED_MOTION) return
    const t = clock.elapsedTime
    banks.forEach((b, i) => {
      b.mat.opacity = 0.34 + 0.09 * Math.sin(t * 0.3 + b.ph)
      b.mat.rotation += b.rot * 0.008
      const sp = group.current?.children[i]
      if (sp) sp.position.set(b.x + Math.sin(t * 0.1 + b.ph) * 0.15, b.y + Math.sin(t * 0.16 + b.ph) * 0.05, b.z)
    })
  })
  return (
    <group ref={group}>
      {banks.map((b, i) => (
        <sprite key={i} material={b.mat} scale={[b.s * 1.35, b.s, 1]} position={[b.x, b.y, b.z]} />
      ))}
    </group>
  )
}

/* shared soft-particle shader for fine dust & sparkles */
const FLOW_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vAlpha = aAlpha;
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (460.0 / max(0.001, -mv.z));
    gl_Position = projectionMatrix * mv;
  }
`
const FLOW_FRAG = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float fade = 1.0 - smoothstep(0.08, 0.5, length(gl_PointCoord - vec2(0.5)));
    float a = fade * vAlpha;
    if (a < 0.004) discard;
    gl_FragColor = vec4(vColor, a);
  }
`

function useFlowMaterial() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: FLOW_VERT,
        fragmentShader: FLOW_FRAG,
        transparent: true,
        depthWrite: false,
      }),
    []
  )
  useEffect(() => () => mat.dispose(), [mat])
  return mat
}

/* fine dust grains riding the incoming dirty air */
function Dust({ count = 70 }) {
  const mat = useFlowMaterial()
  const field = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const alphas = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const seeds = []
    const palette = ['#8a7f6d', '#9a8d7c', '#756c5f', '#a5977f'].map(hexToRGB)
    for (let i = 0; i < count; i++) {
      const s = {
        x: -2.7 + Math.random() * 1.7,
        y: gauss() * 0.55,
        z: -0.6 + Math.random() * 1.0,
        speed: 0.75 + Math.random() * 0.7, // grains outrun the big wisps
        jitter: 0.4 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
      }
      seeds.push(s)
      sizes[i] = 0.035 + Math.random() * 0.05
      colors.set(palette[i % palette.length], i * 3)
      positions[i * 3] = s.x
      positions[i * 3 + 1] = s.y
      positions[i * 3 + 2] = s.z
      alphas[i] = dirtyAlpha(s.x) * 0.5
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    g.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1))
    g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    return { g, seeds }
  }, [count])
  useEffect(() => () => field.g.dispose(), [field])
  useFrame(({ clock }, delta) => {
    if (REDUCED_MOTION) return
    const dt = Math.min(delta, 0.05)
    const t = clock.elapsedTime
    const pos = field.g.attributes.position
    const alp = field.g.attributes.aAlpha
    for (let i = 0; i < count; i++) {
      const s = field.seeds[i]
      s.x += dt * s.speed
      if (s.x > -0.88) {
        s.x = -2.7 - Math.random() * 0.6
        s.y = gauss() * 0.55
        s.z = -0.6 + Math.random() * 1.0
        s.speed = 0.75 + Math.random() * 0.7
      }
      const conv = 1 - 0.4 * smoothstep(-1.7, -0.9, s.x)
      pos.setXYZ(
        i,
        s.x,
        (s.y + Math.sin(t * s.jitter * 3 + s.phase) * 0.03) * conv,
        s.z + Math.cos(t * s.jitter * 2.4 + s.phase) * 0.03
      )
      // grains brighten as the intake air accelerates, then are captured at
      // the filter face — a quick wink-out right before the cabinet
      const capture = smoothstep(-1.02, -0.88, s.x)
      alp.setX(i, dirtyAlpha(s.x) * (0.35 + 0.3 * Math.sin(t * 2 + s.phase)) * 1.05 * (1 - capture * capture))
    }
    pos.needsUpdate = true
    alp.needsUpdate = true
  })
  return (
    <points geometry={field.g} frustumCulled={false}>
      <primitive object={mat} attach="material" />
    </points>
  )
}

/* glow column inside the cabinet — the purification moment */
function PurifyCore() {
  const ref = useRef()
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 128
    c.height = 256
    const ctx = c.getContext('2d')
    const g = ctx.createLinearGradient(0, 0, 0, 256)
    g.addColorStop(0, 'rgba(110,231,183,0)')
    g.addColorStop(0.5, 'rgba(110,231,183,0.55)')
    g.addColorStop(1, 'rgba(110,231,183,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 128, 256)
    const rg = ctx.createRadialGradient(64, 128, 4, 64, 128, 64)
    rg.addColorStop(0, 'rgba(255,255,255,0.85)')
    rg.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.globalCompositeOperation = 'destination-in'
    ctx.fillStyle = rg
    ctx.fillRect(0, 0, 128, 256)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = SRGBColorSpace
    return t
  }, [])
  useEffect(() => () => tex.dispose(), [tex])
  useFrame(({ clock }) => {
    if (!ref.current) return
    const m = ref.current.material
    m.opacity = 0.5 + 0.22 * Math.sin(clock.elapsedTime * 1.8)
  })
  return (
    <sprite ref={ref} position={[0, 0.22, 0.46]} scale={[0.9, 1.8, 1]}>
      <spriteMaterial map={tex} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  )
}

/* laminar clean-air streamlines flowing out of the outlet */
const RIBBON_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPhase;
  uniform float uSpeed;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    float env = smoothstep(0.0, 0.25, uv.x);
    p.y += (sin(uv.x * 4.2 + uTime * uSpeed + uPhase) * 0.05
          + sin(uv.x * 8.6 - uTime * uSpeed * 1.7 + uPhase * 2.0) * 0.02) * env;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`
const RIBBON_FRAG = /* glsl */ `
  uniform float uOpacity;
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uPhase;
  varying vec2 vUv;
  void main() {
    float head = smoothstep(0.0, 0.2, vUv.x);
    float tail = 1.0 - smoothstep(0.7, 1.0, vUv.x);
    float edge = pow(1.0 - abs(vUv.y - 0.5) * 2.0, 1.7);
    // travelling brightness pulses — visible airflow direction
    float pulse = 0.72 + 0.28 * sin((vUv.x * 9.0 - uTime * uSpeed * 2.4 + uPhase) * 3.14159);
    float a = head * tail * edge * uOpacity * pulse;
    gl_FragColor = vec4(uColor, a);
  }
`

function CleanRibbons({ count = 8 }) {
  const group = useRef()
  const ribbons = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        y: gauss() * 0.5,
        z: -0.4 + Math.random() * 0.7,
        ph: Math.random() * Math.PI * 2,
        speed: 1.4 + Math.random() * 1.2,
        w: 0.028 + Math.random() * 0.042,
        opacity: 0.5 + Math.random() * 0.25,
        color: new THREE.Color('#10b981').lerp(new THREE.Color('#059669'), Math.random()),
      })),
    [count]
  )
  const materials = useMemo(
    () =>
      ribbons.map(
        (r) =>
          new THREE.ShaderMaterial({
            vertexShader: RIBBON_VERT,
            fragmentShader: RIBBON_FRAG,
            uniforms: {
              uTime: { value: 0 },
              uPhase: { value: r.ph },
              uSpeed: { value: r.speed },
              uOpacity: { value: r.opacity },
              uColor: { value: r.color },
            },
            transparent: true,
            depthWrite: false,
          })
      ),
    [ribbons]
  )
  useEffect(() => () => materials.forEach((m) => m.dispose()), [materials])
  useFrame(({ clock }) => {
    if (REDUCED_MOTION) return
    const t = clock.elapsedTime
    materials.forEach((m, i) => {
      m.uniforms.uTime.value = t
      m.uniforms.uOpacity.value = ribbons[i].opacity * (0.85 + 0.15 * Math.sin(t * 1.3 + m.uniforms.uPhase.value))
    })
  })
  return (
    <group ref={group}>
      {ribbons.map((r, i) => (
        <mesh key={i} position={[2.02, r.y, r.z]} material={materials[i]}>
          <planeGeometry args={[2.15, r.w, 36, 1]} />
        </mesh>
      ))}
    </group>
  )
}

const cleanAlpha = (x) => smoothstep(0.92, 1.3, x) * (1 - smoothstep(2.3, 3.15, x))

/* sparkling purified air streaming out and gently rising */
function CleanSparkles({ count = 90 }) {
  const mat = useFlowMaterial()
  const field = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const alphas = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const seeds = []
    const palette = ['#0d9f6e', '#10b981', '#34d399', '#6ee7b7'].map(hexToRGB)
    for (let i = 0; i < count; i++) {
      const s = {
        x: 0.95 + Math.random() * 1.95,
        y: gauss() * 0.5,
        z: -0.45 + Math.random() * 0.85,
        speed: 0.9 + Math.random() * 0.8,
        rise: 0.06 + Math.random() * 0.14,
        tw: 2.5 + Math.random() * 4.5,
        phase: Math.random() * Math.PI * 2,
      }
      seeds.push(s)
      sizes[i] = 0.04 + Math.random() * 0.055
      colors.set(palette[i % palette.length], i * 3)
      positions[i * 3] = s.x
      positions[i * 3 + 1] = s.y
      positions[i * 3 + 2] = s.z
      alphas[i] = cleanAlpha(s.x) * 0.85
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    g.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1))
    g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    return { g, seeds }
  }, [count])
  useEffect(() => () => field.g.dispose(), [field])
  useFrame(({ clock }, delta) => {
    if (REDUCED_MOTION) return
    const dt = Math.min(delta, 0.05)
    const t = clock.elapsedTime
    const pos = field.g.attributes.position
    const alp = field.g.attributes.aAlpha
    for (let i = 0; i < count; i++) {
      const s = field.seeds[i]
      s.x += dt * s.speed
      s.y += dt * s.rise
      if (s.x > 3.15) {
        s.x = 0.95 - Math.random() * 0.2
        s.y = gauss() * 0.5
        s.z = -0.45 + Math.random() * 0.85
        s.speed = 0.9 + Math.random() * 0.8
      }
      const fan = 1 + 0.32 * smoothstep(0.95, 1.7, s.x)
      pos.setXYZ(i, s.x, s.y * fan, s.z)
      alp.setX(i, cleanAlpha(s.x) * (0.6 + 0.4 * Math.sin(t * s.tw + s.phase)) * 1.0)
    }
    pos.needsUpdate = true
    alp.needsUpdate = true
  })
  return (
    <points geometry={field.g} frustumCulled={false}>
      <primitive object={mat} attach="material" />
    </points>
  )
}

/* ---------- one depth layer: textured plane with individual parallax sway ---------- */
function Layer({ url, amp, sway }) {
  const tex = useLoader(TextureLoader, url)
  const ref = useRef()
  useEffect(() => prepTexture(tex), [tex])
  useFrame(() => {
    if (!ref.current) return
    const t = sway.current.time.current
    ref.current.position.x = Math.sin(t * 0.5) * amp
    ref.current.position.y = Math.cos(t * 0.34) * amp * 0.3
  })
  // NOTE: z position is owned by the wrapper group (see PurifierModel)
  return (
    <mesh ref={ref}>
      <planeGeometry args={[PLANE_W, PLANE_H]} />
      <meshStandardMaterial
        map={tex}
        alphaTest={0.35}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        roughness={0.55}
        metalness={0.08}
      />
    </mesh>
  )
}

/* ---------- soft slab behind the cabinet so gaps never show through ---------- */
function CabinetBacking() {
  return (
    <mesh
      position={[0, 0, DEPTHS[0] - 0.14]}
      ref={(m) => m && (m.userData.baseZ = DEPTHS[0] - 0.14)}
    >
      <boxGeometry args={[PLANE_W * 0.92, PLANE_H * 0.92, 0.05]} />
      <meshStandardMaterial color="#eef3f0" roughness={0.5} metalness={0.05} />
    </mesh>
  )
}

/* ---------- rising ion particles ---------- */
function Ions({ count = 130 }) {
  const ref = useRef()
  const positions = useMemo(() => new Float32Array(count * 3), [count])
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        r: 0.28 + Math.random() * 0.5,
        a: Math.random() * Math.PI * 2,
        y0: Math.random() * 2.6,
        speed: 0.22 + Math.random() * 0.45,
        wobble: 0.5 + Math.random() * 1.2,
      })),
    [count]
  )
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const attr = ref.current.geometry.attributes.position
    for (let i = 0; i < seeds.length; i++) {
      const s = seeds[i]
      const y = -1.15 + ((s.y0 + t * s.speed) % 2.6)
      const wob = Math.sin(t * s.wobble + s.a * 5) * 0.06
      const ang = s.a + t * 0.12
      attr.setXYZ(i, Math.cos(ang) * s.r + wob, y, Math.sin(ang) * s.r)
    }
    attr.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#6ee7b7"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ---------- orbiting glow rings ---------- */
function GlowRing({ radius, tube, tilt, speed, opacity }) {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * speed
  })
  return (
    <group ref={ref}>
      <mesh rotation={[tilt, 0, 0]}>
        <torusGeometry args={[radius, tube, 16, 120]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#34d399"
          emissiveIntensity={1.4}
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/* ---------- stacked depth layers: gentle sway + drag-based parallax spread ---------- */
function PurifierModel() {
  const textures = useLoader(TextureLoader, LAYER_URLS)
  useEffect(() => textures.forEach(prepTexture), [textures])

  const group = useRef()
  const sway = useRef({ time: { current: 0 } })
  const time = useRef(0)
  const spread = useRef(1)

  useFrame((state, delta) => {
    time.current += delta
    sway.current.time.current = time.current

    // ping-pong the auto-spin at the azimuth limits (photo has no back face)
    const controls = state.controls
    let dragX = 0
    if (controls) {
      dragX = controls.getAzimuthalAngle()
      if (dragX >= AZ_LIMIT - 0.01) controls.autoRotateSpeed = -Math.abs(controls.autoRotateSpeed)
      else if (dragX <= -(AZ_LIMIT - 0.01)) controls.autoRotateSpeed = Math.abs(controls.autoRotateSpeed)
    }

    // swing angle drives layer separation (parallax spread), eased toward target
    const target = 1 + Math.min(0.8, Math.abs(dragX) * 0.9)
    spread.current += (target - spread.current) * Math.min(1, delta * 5)

    // whole-model float
    if (group.current) {
      group.current.position.y = -0.05 + Math.sin(time.current * 0.9) * 0.05
      group.current.rotation.z = Math.sin(time.current * 0.6) * 0.012
      // apply eased spread to every layer (meshes stashed their base z in userData)
      group.current.traverse((o) => {
        if (o.userData && o.userData.baseZ !== undefined) o.position.z = o.userData.baseZ * spread.current
      })
    }
  })

  return (
    <group ref={group}>
      <CabinetBacking />
      {LAYER_URLS.map((url, i) => (
        <group key={url} position={[0, 0, DEPTHS[i]]} ref={(m) => m && (m.userData.baseZ = DEPTHS[i])}>
          <Layer url={url} amp={AMP[i]} sway={sway} />
        </group>
      ))}
      <Ions />
      <GlowRing radius={1.02} tube={0.009} tilt={1.25} speed={0.28} opacity={0.5} />
      <GlowRing radius={1.32} tube={0.006} tilt={1.05} speed={-0.18} opacity={0.3} />
    </group>
  )
}

/* ---------- scene ---------- */
function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#ffffff', '#9dcdb6', 0.5]} />
      <directionalLight position={[4, 6, 4]} intensity={1.15} />
      <directionalLight position={[-5, 3, -4]} intensity={0.35} color="#d1fae5" />
      <pointLight position={[0, -0.4, 0.9]} intensity={0.5} color="#34d399" distance={3} />

      {/* the living valley: real photo, drifting clouds & mist, sun glow behind everything */}
      <MountainBackdrop />
      <SunGlow />
      <Clouds />
      <ValleyMist />

      {/* the purification story: smog pulled in the left, fresh air out the right */}
      <SmogBank />
      <SmokePuffs />
      <Dust />
      <PurifierModel />
      <PurifyCore />
      <CaptureSparks />
      <CleanRibbons />
      <CleanSparkles />

      <ContactShadows position={[0, -1.26, 0]} opacity={0.42} blur={2.6} scale={6} far={2.4} color="#0b3d2e" />

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={AUTO_SPEED}
        minPolarAngle={0.95}
        maxPolarAngle={1.5}
        minAzimuthAngle={-AZ_LIMIT}
        maxAzimuthAngle={AZ_LIMIT}
        target={[0, -0.05, 0]}
      />
    </>
  )
}

/* ---------- root component ---------- */
export default function PurifierScene({ onReady }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-t-[10rem] rounded-b-[2rem]">
      <div className="pointer-events-none absolute inset-0 z-10 rounded-t-[inherit] rounded-b-[inherit] shadow-[inset_0_0_90px_rgba(11,61,46,0.16)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white/50 to-transparent" />
      <Canvas
        camera={{ position: [3.3, 1.35, 4.3], fov: 38 }}
        dpr={[1, 1.75]}
        flat
        gl={{ antialias: true, alpha: true }}
        onCreated={({ scene }) => {
          if (import.meta.env.DEV) window.__vgScene = scene // dev-only debug handle
          onReady?.()
        }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <SceneContents />
      </Canvas>
    </div>
  )
}
