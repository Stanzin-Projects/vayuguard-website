import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon.jsx'

/**
 * Reveal-on-scroll: returns [ref, visible].
 * Uses IntersectionObserver with a rAF scroll fallback for reliability.
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const inView = () => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight * 0.92 && r.bottom > 0
    }
    if (inView()) { setVisible(true); return }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (inView()) { setVisible(true); window.removeEventListener('scroll', onScroll) }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    let io
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) { setVisible(true); io.disconnect() }
        },
        { threshold }
      )
      io.observe(el)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      io?.disconnect()
    }
  }, [threshold])

  return [ref, visible]
}

/** Wrapper that applies the reveal transition classes. */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, visible] = useReveal()
  const delays = ['', 'delay-75', 'delay-150', 'delay-[220ms]', 'delay-300']
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${delays[delay]} ${className}`}
    >
      {children}
    </Tag>
  )
}

/** Count-up number that animates when scrolled into view. */
export function CountUp({ value, decimals = 0, suffix = '', className = '' }) {
  const [ref, visible] = useReveal(0.4)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!visible) return
    const dur = 1500
    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay((value * eased).toFixed(decimals))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, value, decimals])

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  )
}

/**
 * Ambient falling-leaves layer for hero sections. Leaves spawn just above the
 * viewport near the top-left and glide slowly to the bottom-right while
 * swaying and rotating, evoking clean, fresh air.
 */
export function FallingLeaves({ count = 9 }) {
  const leaves = useRef(null)
  if (leaves.current == null) {
    leaves.current = Array.from({ length: count }, (_, i) => ({
      left: `${(i * 89) % 60 + 2}%`,
      size: 16 + ((i * 37) % 26),
      dur: 15 + ((i * 53) % 13),
      delay: -((i * 67) % 210) / 10,
      tumble: 3.6 + ((i * 31) % 28) / 10,
      tumbleDelay: -((i * 47) % 40) / 10,
      opacity: 0.5 + ((i * 41) % 45) / 100,
    }))
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {leaves.current.map((l, i) => (
        <span
          key={i}
          className="leaf-fall"
          style={{
            left: l.left,
            opacity: l.opacity,
            '--leaf-dur': `${l.dur}s`,
            '--leaf-delay': `${l.delay}s`,
            '--leaf-tumble': `${l.tumble}s`,
            '--leaf-tumble-delay': `${l.tumbleDelay}s`,
          }}
        >
          <Icon.Leaf style={{ width: l.size, height: l.size, display: 'block' }} />
        </span>
    ))}
    </div>
  )
}

/** Soft air-stream ribbons drifting left → right across the hero. */
export function AirStreams({ count = 5 }) {
  const streams = useRef(null)
  if (streams.current == null) {
    streams.current = Array.from({ length: count }, (_, i) => ({
      top: 14 + ((i * 61) % 70),
      left: 5 + ((i * 43) % 45),
      width: 140 + ((i * 97) % 220),
      dur: 9 + ((i * 71) % 8),
      delay: -((i * 83) % 90) / 10,
    }))
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {streams.current.map((s, i) => (
        <span
          key={i}
          className="air-stream"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.width,
            '--stream-dur': `${s.dur}s`,
            '--stream-delay': `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/**
 * 3D tilt card — tracks the pointer and tilts in 3D with a glare highlight.
 * Uses springs-free direct transforms for 60fps feel.
 */
export function TiltCard({ children, className = '', max = 10, glare = true, scale = 1.02 }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rx = (0.5 - py) * max
    const ry = (px - 0.5) * max
    setStyle({
      transform: `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`,
      transition: 'transform 60ms linear',
    })
    setGlareStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.35), transparent 55%)`,
    })
  }

  const onLeave = () => {
    setStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)', transition: 'transform 500ms cubic-bezier(0.22,1,0.36,1)' })
    setGlareStyle({ opacity: 0, transition: 'opacity 400ms' })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={`relative preserve-3d ${className}`}
    >
      {children}
      {glare && (
        <div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={glareStyle} aria-hidden="true" />
      )}
    </div>
  )
}
