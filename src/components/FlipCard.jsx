import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon.jsx'
import { setPendingProduct } from './pendingProduct.js'

/* Only one card may be flipped at a time — a click/tap (which also focuses the
   card) used to leave the old card stuck on its back via :focus-within. Every
   flip announces itself so all other cards reset. */
let flipSerial = 0
const FLIP_EVENT = 'vayuguard:flipcard'

/* Flip product card: studio photo on the front; on hover/focus/tap the card
   rotates in 3D to reveal the application ("installed on site") photo plus
   key specs. "Get Quote" opens the product's dedicated page with the full
   gallery, video and enquiry options. */
export default function FlipCard({ p }) {
  const hasApp = Boolean(p.appImg)
  const [flipped, setFlipped] = useState(false)
  const idRef = useRef(0)
  const pointerTypeRef = useRef('mouse')
  const fromPointerRef = useRef(false)
  if (idRef.current === 0) idRef.current = ++flipSerial

  useEffect(() => {
    const resetIfOther = (e) => { if (e.detail.id !== idRef.current) setFlipped(false) }
    window.addEventListener(FLIP_EVENT, resetIfOther)
    return () => window.removeEventListener(FLIP_EVENT, resetIfOther)
  }, [])

  const flipOn = () => {
    window.dispatchEvent(new CustomEvent(FLIP_EVENT, { detail: { id: idRef.current } }))
    setFlipped(true)
  }
  const reset = () => setFlipped(false)

  return (
    <article
      id={p.id}
      className={`flip-card group relative h-[460px] scroll-mt-28 outline-none sm:h-[440px]${flipped ? ' is-flipped' : ''}`}
      tabIndex={0}
      aria-label={`${p.name} — hover or focus to see it installed`}
      onPointerDown={(e) => { pointerTypeRef.current = e.pointerType; fromPointerRef.current = true }}
      onPointerEnter={(e) => { if (e.pointerType !== 'touch') flipOn() }}
      onPointerLeave={(e) => { if (e.pointerType !== 'touch') reset() }}
      onClick={(e) => {
        fromPointerRef.current = false
        /* keyboard-generated clicks (detail 0) and mouse clicks are already
           handled by focus / pointer-enter — only touch taps toggle here */
        if (e.detail === 0 || pointerTypeRef.current === 'mouse') return
        flipped ? reset() : flipOn()
      }}
      onFocus={() => { if (!fromPointerRef.current) flipOn() }}
      onBlur={reset}
    >
      <div className="flip-card-inner relative h-full w-full">
        {/* ── FRONT: studio product photo ── */}
        <div className="flip-card-face flip-card-front absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-flame-900/10">
          <div className="relative grid flex-1 place-items-center overflow-hidden bg-gradient-to-b from-flame-50 to-[#fdeee3] p-5">
            <div className="absolute h-36 w-36 rounded-full bg-[radial-gradient(circle_at_32%_30%,rgba(255,255,255,0.9),rgba(255,214,186,0.5))] blur-[1px]" />
            <img
              src={p.img}
              alt={`${p.name} — ${p.category}`}
              loading="lazy"
              className="relative max-h-[220px] w-auto max-w-[86%] object-contain drop-shadow-[0_18px_24px_rgba(70,25,10,0.2)] transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-flame-700/90 px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-white">
              Hover / tap to see it installed →
            </span>
          </div>
          <div className="flex flex-col gap-2 p-5 pt-4">
            <span className="chip w-fit">{p.tag}</span>
            <h3 className="text-[1.02rem] font-extrabold leading-snug">{p.name}</h3>
            <p className="line-clamp-3 text-[0.86rem] text-ink-500 md:line-clamp-2">{p.desc}</p>
          </div>
        </div>

        {/* ── BACK: application photo + specs ── */}
        <div className="flip-card-face flip-card-back absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-flame-700/30 bg-gradient-to-b from-flame-800 to-flame-950 text-white shadow-xl shadow-flame-900/25">
          <div className="relative grid h-[46%] shrink-0 place-items-center overflow-hidden bg-[#2c1108] p-4">
            {hasApp ? (
              <img
                src={p.appImg}
                alt={`${p.name} installed on site`}
                loading="lazy"
                className="max-h-full w-auto max-w-full object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.45)]"
              />
            ) : (
              <div className="grid h-full w-full place-items-center rounded-xl bg-white/5">
                <span className="max-w-[220px] text-center text-[0.8rem] font-semibold text-flame-100/80">
                  Installed by VayuGuard engineers across Delhi NCR — site photo available on request
                </span>
              </div>
            )}
            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-flame-400/90 px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-flame-950">
              Installed on site
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2.5 p-5">
            <h3 className="text-[1rem] font-extrabold leading-snug">{p.name}</h3>
            <ul className="grid gap-1.5">
              {p.specs.slice(0, 4).map((s) => (
                <li key={s} className="flex items-start gap-2 text-[0.8rem] leading-snug text-flame-100/85">
                  <Icon.Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-flame-300" /> {s}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/15 pt-3">
              <Link
                to={`/products/${p.id}`}
                className="btn-white btn-sm !rounded-full"
                onClick={() => setPendingProduct(p.name)}
              >
                Get Quote <Icon.Arrow className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
