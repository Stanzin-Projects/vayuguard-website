import { Link } from 'react-router-dom'
import { Reveal, CountUp, TiltCard, FallingLeaves, AirStreams } from '../components/motion.jsx'
import { Icon, BrandMark } from '../components/Icon.jsx'
import { SectionHead, CtaBand, MiniUnit } from '../components/ui.jsx'
import { STATS, PRODUCTS, SOLUTIONS } from '../components/data.jsx'

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(1100px_520px_at_78%_8%,rgba(20,128,93,0.16),transparent_62%),radial-gradient(700px_420px_at_-6%_90%,rgba(20,128,93,0.1),transparent_60%),linear-gradient(180deg,#eef8f2,#f7fbf9)]">
      {/* ambient animation layers: falling leaves + flowing air streams */}
      <FallingLeaves count={9} />
      <AirStreams count={5} />

      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          <Reveal><span className="kicker">Patented Climate Technology • India</span></Reveal>
          <Reveal delay={1}>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Breathe <span className="text-forest-600">Pure.</span><br />Live <span className="text-forest-600">Better.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-lg text-lg text-ink-500">
              Advanced air purification solutions for a healthier tomorrow. Hybrid HVAC air cleaners, UVGI systems, IAQ monitors and more — engineered for Delhi NCR's toughest air.
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
              <div className="flex flex-wrap items-center gap-5 text-lg font-extrabold text-[#6d7d75]/75">
                {['DLF', 'wework', 'TATA', 'MAX Healthcare', 'Fortis'].map((b) => (
                  <span key={b} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-sm bg-forest-300" />{b}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3D hero visual */}
        <Reveal delay={2} className="relative">
          <TiltCard max={9} className="relative mx-auto aspect-[4/5] w-full max-w-[460px]">
            {/* arch backdrop */}
            <div className="absolute inset-x-[11%] top-0 h-[82%] rounded-t-full rounded-b-3xl bg-[radial-gradient(120%_90%_at_50%_0%,#dcefe4_0%,#bfe0cf_45%,#9dcdb6_100%)] shadow-2xl shadow-forest-900/25">
              <div className="absolute inset-0 rounded-t-full rounded-b-3xl bg-[radial-gradient(60%_42%_at_68%_22%,rgba(255,255,255,0.85),transparent_60%),radial-gradient(90%_55%_at_20%_95%,rgba(11,61,46,0.35),transparent_65%),radial-gradient(70%_40%_at_80%_90%,rgba(11,61,46,0.28),transparent_60%)]" />
              <div className="absolute inset-x-0 bottom-0 h-[46%] rounded-b-3xl bg-[radial-gradient(45%_70%_at_24%_100%,rgba(13,74,52,0.55),transparent_70%),radial-gradient(50%_80%_at_60%_108%,rgba(13,74,52,0.4),transparent_70%),radial-gradient(40%_60%_at_88%_100%,rgba(13,74,52,0.45),transparent_70%)]" />
            </div>

            {/* purifier */}
            <div className="absolute bottom-[10%] left-1/2 w-[46%] -translate-x-1/2 animate-floaty rounded-2xl border border-white/80 bg-gradient-to-br from-white via-gray-100 to-gray-300 p-6 shadow-[0_30px_60px_rgba(11,61,46,0.3)]">
              <div className="absolute -left-3 -top-3 grid h-11 w-11 place-items-center rounded-xl bg-white shadow-md">
                <BrandMark className="h-7 w-7" />
              </div>
              <div className="relative h-28 overflow-hidden rounded-lg bg-[repeating-linear-gradient(90deg,#16211c_0_6px,#242f29_6px_8px)] shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-white/10" />
              </div>
              <div className="relative mt-3.5 h-28 overflow-hidden rounded-lg bg-[repeating-linear-gradient(90deg,#16211c_0_6px,#242f29_6px_8px)] shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-white/10" />
              </div>
              <div className="mt-4 h-2.5 rounded-md bg-gradient-to-r from-ink-900 to-[#2a3831]" />
            </div>

            {/* orbiting ion rings */}
            <div className="pointer-events-none absolute left-1/2 top-[38%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-spinSlow rounded-full border border-dashed border-forest-600/25" />
            <div className="pointer-events-none absolute left-1/2 top-[38%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest-600/20" />

            {/* floating chips */}
            <FloatChip className="-left-2 top-[8%] md:-left-6" icon={<Icon.Sun />} title="Removes 99.97%" sub="of PM2.5 & Pollutants" delay="" />
            <FloatChip className="-right-2 top-[36%] md:-right-6" icon={<Icon.Bulb />} title="UVGI Technology" sub="Kills Airborne Pathogens" delay="[animation-delay:1.2s]" />
            <FloatChip className="bottom-[6%] right-0" icon={<Icon.Target />} title="Real-time AQI" sub="Monitor & Control" delay="[animation-delay:2.2s]" />
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}

function FloatChip({ icon, title, sub, className = '', delay = '' }) {
  return (
    <div className={`absolute z-10 flex items-center gap-3 rounded-2xl border border-white/90 bg-white/90 px-4 py-3 shadow-lg shadow-forest-900/10 backdrop-blur animate-floaty ${delay} ${className}`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-100 text-forest-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">{icon}</span>
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
        <div className="grid overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-forest-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="group flex gap-4 border-gray-100 p-7 transition-colors hover:bg-forest-50 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0">
              <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-forest-100 text-forest-700 transition-transform duration-300 group-hover:scale-110 [&>svg]:h-6 [&>svg]:w-6">
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
    <section className="section bg-gradient-to-b from-[#f2faf6] to-white">
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
                <span className="mx-auto mb-4 grid h-[52px] w-[52px] place-items-center rounded-full bg-forest-100 text-forest-700 [&>svg]:h-6 [&>svg]:w-6">
                  <s.icon />
                </span>
                <div className="text-[2.1rem] font-extrabold leading-none tracking-tight">
                  {s.value != null
                    ? <CountUp value={s.value} decimals={s.decimals || 0} suffix={s.suffix} />
                    : s.display}
                </div>
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

function Technology() {
  return (
    <section className="section section-dark relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <TiltCard max={12} glare={false} className="relative mx-auto grid h-[420px] w-full max-w-[460px] place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-forest-800 to-forest-950 shadow-2xl">
            <span className="absolute h-[300px] w-[300px] rounded-full border border-white/10" />
            <span className="absolute h-[430px] w-[430px] animate-spinSlow rounded-full border border-dashed border-white/15" />
            <span className="absolute h-[560px] w-[560px] rounded-full border border-white/10" />

            {/* glowing core */}
            <div className="relative z-10 w-[200px] rounded-2xl bg-gradient-to-br from-white to-gray-200 p-5 shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
              <div className="relative h-20 overflow-hidden rounded-lg bg-[repeating-linear-gradient(90deg,#16211c_0_6px,#242f29_6px_8px)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
              </div>
              <div className="relative mt-3 h-20 overflow-hidden rounded-lg bg-[repeating-linear-gradient(90deg,#16211c_0_6px,#242f29_6px_8px)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
              </div>
              <div className="mt-3 h-2 rounded bg-gradient-to-r from-ink-900 to-[#2a3831]" />
              {/* pulse rings */}
              <span className="absolute inset-0 -z-10 rounded-2xl border-2 border-emerald-300/60 animate-pulseRing" />
            </div>

            <OrbitPill className="left-[8%] top-[16%]" label="HCAC Hybrid Filtration" />
            <OrbitPill className="right-[6%] top-[44%]" label="UV-C Germicidal" />
            <OrbitPill className="bottom-[12%] left-[20%]" label="Plasm-ION Bipolar" />
          </TiltCard>
        </Reveal>

        <div>
          <Reveal>
            <span className="kicker kicker-light">Patented Technology</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">One System. Three Layers of Defence.</h2>
            <p className="mt-4 text-forest-100/80">
              VayuGuard's patented hybrid platform combines mechanical filtration, germicidal UV-C and bipolar ionization inside your existing HVAC — so every breath passes through all three.
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-5">
            {TECH.map((t, i) => (
              <Reveal key={t.title} delay={i + 1}>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-100 text-forest-700 [&>svg]:h-[21px] [&>svg]:w-[21px]"><t.icon /></span>
                  <div>
                    <h3 className="text-[1.02rem] font-extrabold text-white">{t.title}</h3>
                    <p className="mt-1 text-[0.92rem] text-forest-100/70">{t.body}</p>
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
    <span className={`absolute z-20 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[0.76rem] font-bold text-forest-50 backdrop-blur ${className}`}>
      <span className="h-2 w-2 rounded-full bg-emerald-400" />{label}
    </span>
  )
}

/* ---------- Products preview ---------- */
function ProductsPreview() {
  const featured = PRODUCTS.slice(0, 3)
  return (
    <section className="section">
      <div className="container-x">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHead kicker="Product Catalogue" title={<>Purification for <span className="text-forest-600">Every Air Problem</span></>} />
          <Reveal delay={2}><Link to="/products" className="btn-ghost">View All Products</Link></Reveal>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i}>
              <TiltCard max={7} className="h-full rounded-2xl">
                <Link to="/products" className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-shadow duration-300 hover:shadow-2xl hover:shadow-forest-900/10 ${p.id === 'monitors' ? 'pb-0' : ''}`}>
                  <div className="relative grid h-44 place-items-center overflow-hidden bg-gradient-to-b from-forest-50 to-[#e8f3ed]">
                    <div className="absolute h-32 w-32 rounded-full bg-[radial-gradient(circle_at_32%_30%,rgba(255,255,255,0.9),rgba(199,227,213,0.5))] blur-[1px]" />
                    <MiniUnit shape={p.shape} className="relative transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <span className="chip">{p.tag}</span>
                    <h3 className="text-lg font-extrabold">{p.name}</h3>
                    <p className="flex-1 text-[0.9rem] text-ink-500">{p.desc}</p>
                    <span className="inline-flex items-center gap-2 text-[0.9rem] font-bold text-forest-700">
                      View specs <Icon.Arrow className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </TiltCard>
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
    <section className="section bg-forest-50/40">
      <div className="container-x">
        <SectionHead center kicker="Solutions" title={<>Clean Air for <span className="text-forest-600">Every Environment</span></>} body="From bedrooms to hospital wards, our engineers size the right hybrid system for your space and usage." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.id} delay={i % 3}>
              <TiltCard max={8} className="h-full rounded-2xl">
                <Link
                  to={`/solutions#${s.id}`}
                  className="group relative flex h-full min-h-[210px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-7 text-forest-50"
                  style={{ background: `linear-gradient(160deg, ${s.a}, ${s.b})` }}
                >
                  <span className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),transparent_70%)] transition-transform duration-500 group-hover:scale-125" />
                  <s.icon className="mb-auto h-10 w-10 transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-110" />
                  <h3 className="mt-6 text-lg font-extrabold text-white">{s.kicker}</h3>
                  <p className="mt-1 text-[0.88rem] text-forest-100/75">{s.title}</p>
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
      <div className="mt-20"><CtaBand /></div>
    </>
  )
}
