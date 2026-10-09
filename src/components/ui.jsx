import { Link } from 'react-router-dom'
import { Reveal, FallingLeaves } from './motion.jsx'
import { Icon } from './Icon.jsx'
import { WHATSAPP } from './data.jsx'

/* Inner-page hero with breadcrumbs. Pass leaves to enable the falling-leaves ambience. */
export function PageHero({ kicker, title, lede, crumbs, leaves = false }) {
  return (
    <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-flame-50 via-white to-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-flame-100/70 blur-2xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-flame-100/50 blur-2xl" />
      {leaves && <FallingLeaves count={6} />}
      <div className="container-x relative py-16 md:py-20">
        <Reveal>
          <nav className="mb-5 text-[0.82rem] text-ink-400">
            <Link to="/" className="hover:text-flame-700">Home</Link>
            {crumbs?.map(([label, to]) => (
              <span key={label}> / {to ? <Link to={to} className="hover:text-flame-700">{label}</Link> : label}</span>
            ))}
          </nav>
          <span className="kicker">{kicker}</span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
          {lede && <p className="mt-4 max-w-2xl text-lg text-ink-500">{lede}</p>}
        </Reveal>
      </div>
    </section>
  )
}

/* Bottom CTA band */
export function CtaBand({ title = 'Ready to breathe cleaner air?', body = 'Get a free site assessment from our air-quality engineers anywhere in Delhi NCR — quotes within 48 hours.', cta = 'Free Consultation' }) {
  return (
    <section className="container-x pb-4">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-flame-800 to-flame-950 px-6 py-10 shadow-2xl shadow-flame-900/30 sm:px-8 md:px-14 md:py-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-flame-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-flame-400/10 blur-3xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold text-white md:text-4xl">{title}</h2>
              <p className="mt-3 text-flame-100/80">{body}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-white">{cta}</Link>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-outline-light">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* CSS-drawn mini purifier unit used in product cards */
export function MiniUnit({ shape = 'box', className = '' }) {
  const dims =
    shape === 'tall' ? 'w-[86px]' :
    shape === 'wide' ? 'w-[132px]' : 'w-[108px]'
  const grill =
    shape === 'tall' ? 'h-24' :
    shape === 'wide' ? 'h-11' : 'h-14'
  return (
    <div className={`relative ${dims} rounded-xl border border-white/70 bg-gradient-to-br from-white via-gray-50 to-gray-200 p-2.5 shadow-[0_14px_28px_rgba(70,25,10,0.2)] ${className}`}>
      <div className={`${grill} rounded-md bg-[repeating-linear-gradient(90deg,#241a14_0_6px,#3a2e26_6px_8px)] shadow-inner`}>
        <div className="h-full w-full rounded-md bg-gradient-to-br from-white/25 via-transparent to-white/10" />
      </div>
      {shape !== 'wide' && (
        <div className="mt-2 h-2 rounded bg-gradient-to-r from-ink-900 to-[#3a2c22]" />
      )}
    </div>
  )
}

/* Product card visual with gradient backdrop */
export function ProductVisual({ shape }) {
  return (
    <div className="relative grid h-44 place-items-center overflow-hidden bg-gradient-to-b from-flame-50 to-[#fdeee3]">
      <div className="absolute h-32 w-32 rounded-full bg-[radial-gradient(circle_at_32%_30%,rgba(255,255,255,0.9),rgba(255,214,186,0.5))] blur-[1px]" />
      <MiniUnit shape={shape} className="relative" />
    </div>
  )
}

/* Section heading block */
export function SectionHead({ kicker, title, body, center = false }) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <span className="kicker">{kicker}</span>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
      {body && <p className="mt-3 text-ink-500">{body}</p>}
    </Reveal>
  )
}

/* Scroll-to-top on route change */
export function ScrollManager() {
  // handled in App via useLocation; kept as named export for clarity
  return null
}

export { Icon }
