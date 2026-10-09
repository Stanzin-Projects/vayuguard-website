import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Reveal, TiltCard, FallingLeaves, AirStreams } from '../components/motion.jsx'
import { Icon } from '../components/Icon.jsx'
import { SectionHead, CtaBand } from '../components/ui.jsx'
import { STATS, SOLUTIONS } from '../components/data.jsx'
import { PRODUCTS } from '../data/catalog.js'
import FlipCard from '../components/FlipCard.jsx'
import Faq from '../components/Faq.jsx'
import { FAQS_HOME } from '../data/catalog.js'

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(1100px_520px_at_78%_8%,rgba(224,118,87,0.18),transparent_62%),radial-gradient(700px_420px_at_-6%_90%,rgba(224,118,87,0.12),transparent_60%),linear-gradient(180deg,#fff8f5,#fefbf9)]">
      {/* ambient animation layers: falling leaves + flowing air streams */}
      <FallingLeaves count={9} />
      <AirStreams count={5} />

      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          <Reveal><span className="kicker">Patented Climate Technology • India</span></Reveal>
          <Reveal delay={1}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Breathe <span className="text-flame-600">Pure.</span><br />Live <span className="text-flame-600">Better.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-lg text-lg text-ink-500">
              Advanced air purification solutions for a healthier tomorrow. Hybrid HVAC air cleaners, UVGI systems, IAQ monitors and more — engineered for Delhi NCR's toughest air.
            </p>
            <p className="mt-3 max-w-lg text-[0.93rem] leading-relaxed text-ink-500/90">
              VayuGuard is a Make-in-India air purification company. Its patented HCAC hybrid central air cleaner treats air inside HVAC ducts and AHUs, VayuShield turns existing split and cassette ACs into purifiers, and UVGI, Plasm-ION and live IAQ monitoring complete whole-building clean-air systems for homes, offices, hospitals and schools across Delhi NCR and India.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary">
                Explore Products <Icon.Arrow />
              </Link>
              <Link to="/contact" className="btn-ghost"><Icon.Chat /> Free Consultation</Link>
            </div>
          </Reveal>
          <Reveal delay={4}>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <span className="text-sm font-semibold text-ink-400">Trusted by</span>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {[
                  { name: 'DLF', src: '/logos/dlf.svg' },
                  { name: 'WeWork', src: '/logos/wework.svg' },
                  { name: 'Tata', src: '/logos/tata.svg' },
                  { name: 'Max Healthcare', src: '/logos/max-healthcare.svg' },
                  { name: 'Fortis', src: '/logos/fortis.svg' },
                ].map((b) => (
                  <span key={b.name} className="flex items-center">
                    <img
                      src={b.src}
                      alt={`${b.name} logo`}
                      title={b.name}
                      loading="lazy"
                      className="h-8 w-auto max-w-[92px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0"
                    />
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* hero visual: green-themed product showcase video */}
        <Reveal delay={2} className="relative">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- hero visual: green-themed product showcase video in the signature arch ---------- */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])
  return reduced
}

function HeroVisual() {
  const reducedMotion = useReducedMotion()
  const videoRef = useRef(null)
  /* autoplay can be deferred while the video sits below the fold on phones —
     start it as soon as it scrolls into view (and pause it again off-screen) */
  useEffect(() => {
    const v = videoRef.current
    if (!v || reducedMotion) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.2 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [reducedMotion])
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* arch frame holding the recoloured showcase video */}
      <div className="absolute inset-0 overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border border-white/70 bg-flame-950 shadow-[0_40px_80px_rgba(70,25,10,0.25)]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center"
          src="/hero-showcase.mp4"
          poster="/hero-showcase-poster.jpg"
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
        />
        {/* soft brand tint so the footage sits inside the light theme */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(224,118,87,0.2),transparent_32%,transparent_64%,rgba(61,22,12,0.45))]" />
      </div>

      {/* floating chips */}
      <FloatChip className="-left-2 top-[8%] max-w-[200px] md:max-w-none md:-left-6" icon={<Icon.Sun />} title="Advanced Purification" sub="of PM2.5 & Pollutants" delay="" />
      <FloatChip className="-right-2 top-[36%] max-w-[200px] md:max-w-none md:-right-6" icon={<Icon.Bulb />} title="UVGI Technology" sub="Kills Airborne Pathogens" delay="[animation-delay:1.2s]" />
      <FloatChip className="bottom-[6%] right-0 max-w-[200px] md:max-w-none" icon={<Icon.Target />} title="Real-time AQI" sub="Monitor & Control" delay="[animation-delay:2.2s]" />
    </div>
  )
}

function FloatChip({ icon, title, sub, className = '', delay = '' }) {
  return (
    <div className={`absolute z-10 flex items-center gap-3 rounded-2xl border border-white/90 bg-white/90 px-4 py-3 shadow-lg shadow-flame-900/10 backdrop-blur animate-floaty ${delay} ${className}`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-flame-100 text-flame-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">{icon}</span>
      <span>
        <strong className="block text-[0.88rem] text-ink-900">{title}</strong>
        <span className="block text-[0.74rem] text-ink-500">{sub}</span>
      </span>
    </div>
  )
}

/* ---------- Feature strip ---------- */
const FEATURES = [
  { icon: Icon.Mountain, title: 'Designed for Delhi NCR', body: 'Tackle extreme pollution with ease' },
  { icon: Icon.Filter, title: 'Hybrid Technology', body: 'HVAC + Purification for maximum efficiency' },
  { icon: Icon.Bolt, title: 'Energy Efficient', body: 'Low power consumption, high performance' },
  { icon: Icon.Shield, title: 'Smart Monitoring', body: 'Live AQI tracking & remote control' },
]

function FeatureStrip() {
  return (
    <section className="container-x relative z-10 -mt-12">
      <Reveal>
        <div className="grid overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-flame-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="group flex gap-4 border-gray-100 p-7 transition-colors hover:bg-flame-50 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0">
              <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-flame-100 text-flame-700 transition-transform duration-300 group-hover:scale-110 [&>svg]:h-6 [&>svg]:w-6">
                <f.icon />
              </span>
              <div>
                <h3 className="text-[1rem] font-extrabold">{f.title}</h3>
                <p className="mt-1.5 text-[0.88rem] text-ink-500">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ---------- Impact stats ---------- */
function Impact() {
  return (
    <section className="section bg-gradient-to-b from-[#fdf7f3] to-white">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_2.2fr]">
          <Reveal>
            <span className="kicker">Clean Air Impact</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Every Breath Counts</h2>
            <p className="mt-3 max-w-xs text-ink-500">Proven performance across homes, offices and hospitals in India.</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i} className="border-ink-200/60 text-center lg:border-r lg:last:border-r-0">
                <span className="mx-auto mb-4 grid h-[52px] w-[52px] place-items-center rounded-full bg-flame-100 text-flame-700 [&>svg]:h-6 [&>svg]:w-6">
                  <s.icon />
                </span>
                <div className="text-[2.1rem] font-extrabold leading-none tracking-tight">{s.display}</div>
                <div className="mt-2 text-[0.88rem] text-ink-500">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Dark technology section with 3D core ---------- */
const TECH = [
  { icon: Icon.Pulse, title: 'HCAC Hybrid HVAC Cleaners', body: 'Electro-charged, washable media cleans supply air across your entire AHU or duct — no disposable filters.' },
  { icon: Icon.Bulb, title: 'UVGI Systems', body: 'Upper-room and in-duct UV-C breaks pathogen DNA/RNA — viruses, bacteria and mould have nowhere to hide.' },
  { icon: Icon.Ion, title: 'Plasm-ION Bipolar Ionization', body: 'UL-certified ions cluster around PM0.1, VOCs and odours, dropping them out of the air you breathe.' },
]

/* Product photos shown around the 3D drum (real HCAC unit views). */
const TECH_VIEWS = [
  { src: '/tech-carousel/view-1.webp', label: 'HCAC duct unit' },
  { src: '/tech-carousel/view-2.webp', label: 'HCAC media frame' },
  { src: '/tech-carousel/view-3.webp', label: 'HCAC AHU cabinets' },
  { src: '/products/hcac-a-1000-app.webp', label: 'Installed in AHU' },
  { src: '/products/hcac-slim.webp', label: 'HCAC Slim' },
  { src: '/products/fcu-hcac.webp', label: 'FCU-HCAC' },
]

function TechDrum() {
  const n = TECH_VIEWS.length
  return (
    <div className="tech-carousel relative mx-auto grid h-[420px] w-full max-w-[460px] cursor-grab place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-flame-800 to-flame-950 shadow-2xl" tabIndex={0} aria-label="Rotating views of the HCAC product range">
      <span className="absolute h-[300px] w-[300px] rounded-full border border-white/10" />
      <span className="absolute h-[430px] w-[430px] animate-spinSlow rounded-full border border-dashed border-white/15" />
      <span className="absolute h-[560px] w-[560px] rounded-full border border-white/10" />

      {/* soft glow behind the drum */}
      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-flame-400/15 blur-3xl" />

      {/* the rotating drum — each face sits 60° apart on a cylinder */}
      <div
        className="tech-drum"
        style={{
          '--drum-w': '230px',
          '--drum-h': '310px',
        }}
      >
        {TECH_VIEWS.map((v, i) => (
          <div
            key={v.src}
            className="tech-face"
            style={{ transform: `rotateY(${(360 / n) * i}deg) translateZ(190px)` }}
            aria-label={v.label}
          >
            <img src={v.src} alt={v.label} loading="lazy" />
          </div>
        ))}
      </div>

      <OrbitPill className="left-[6%] top-[14%]" label="HCAC Hybrid Filtration" />
      <OrbitPill className="right-[5%] top-[46%]" label="UV-C Germicidal" />
      <OrbitPill className="bottom-[10%] left-[18%]" label="Plasm-ION Bipolar" />
    </div>
  )
}

function Technology() {
  return (
    <section className="section section-dark relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-flame-400/10 blur-3xl" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <TechDrum />
        </Reveal>

        <div>
          <Reveal>
            <span className="kicker kicker-light">Patented Technology</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">One System. Three Layers of Defence.</h2>
            <p className="mt-4 text-flame-100/80">
              VayuGuard's patented hybrid platform combines mechanical filtration, germicidal UV-C and bipolar ionization inside your existing HVAC — so every breath passes through all three.
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-5">
            {TECH.map((t, i) => (
              <Reveal key={t.title} delay={i + 1}>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-flame-100 text-flame-700 [&>svg]:h-[21px] [&>svg]:w-[21px]"><t.icon /></span>
                  <div>
                    <h3 className="text-[1.02rem] font-extrabold text-white">{t.title}</h3>
                    <p className="mt-1 text-[0.92rem] text-flame-100/70">{t.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={4}><Link to="/about" className="btn-white mt-9">How It Works <Icon.Arrow /></Link></Reveal>
        </div>
      </div>
    </section>
  )
}

function OrbitPill({ label, className = '' }) {
  return (
    <span className={`absolute z-20 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[0.76rem] font-bold text-flame-50 backdrop-blur ${className}`}>
      <span className="h-2 w-2 rounded-full bg-flame-400" />{label}
    </span>
  )
}

/* ---------- Products preview ---------- */
function ProductsPreview() {
  const featured = ['hcac-a-1000', 'vayushield-split', 'vayuview-indoor']
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean)
  return (
    <section className="section">
      <div className="container-x">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHead kicker="Product Catalogue" title={<>Purification for <span className="text-flame-600">Every Air Problem</span></>} />
          <Reveal delay={2}><Link to="/products" className="btn-ghost">View All Products</Link></Reveal>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i} className="h-full">
              <FlipCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Solutions band ---------- */
function SolutionsBand() {
  return (
    <section className="section bg-flame-50/40">
      <div className="container-x">
        <SectionHead center kicker="Solutions" title={<>Clean Air for <span className="text-flame-600">Every Environment</span></>} body="From bedrooms to hospital wards, our engineers size the right hybrid system for your space and usage." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.id} delay={i % 3}>
              <TiltCard max={8} className="h-full rounded-2xl">
                <Link
                  to={`/solutions#${s.id}`}
                  className="group relative flex h-full min-h-[210px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-7 text-flame-50"
                  style={{ background: `linear-gradient(160deg, ${s.a}, ${s.b})` }}
                >
                  <span className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),transparent_70%)] transition-transform duration-500 group-hover:scale-125" />
                  <s.icon className="mb-auto h-10 w-10 transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-110" />
                  <h3 className="mt-6 text-lg font-extrabold text-white">{s.kicker}</h3>
                  <p className="mt-1 text-[0.88rem] text-flame-100/75">{s.title}</p>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <Impact />
      <Technology />
      <ProductsPreview />
      <SolutionsBand />
      <Faq
        faqs={FAQS_HOME}
        kicker="Clean Air Answers"
        title="Air purifier questions, answered"
        body="The questions buyers ask most — answered directly. The full set lives on the products page."
      />
      <div className="mt-20"><CtaBand /></div>
    </>
  )
}
