import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/motion.jsx'
import { PageHero, SectionHead } from '../components/ui.jsx'
import { Icon } from '../components/Icon.jsx'

const band = (a) => {
  if (a <= 50) return { c: '#22c55e', l: 'Good' }
  if (a <= 100) return { c: '#84cc16', l: 'Satisfactory' }
  if (a <= 200) return { c: '#eab308', l: 'Moderate' }
  if (a <= 300) return { c: '#f97316', l: 'Poor' }
  if (a <= 400) return { c: '#ef4444', l: 'Very Poor' }
  return { c: '#7f1d1d', l: 'Severe' }
}

const SENSORS = [
  { id: 'pm25', name: 'PM2.5', unit: 'µg/m³', good: 35, min: 8, max: 35, cap: 90 },
  { id: 'pm10', name: 'PM10', unit: 'µg/m³', good: 60, min: 15, max: 60, cap: 160 },
  { id: 'co2', name: 'CO₂', unit: 'ppm', good: 800, min: 420, max: 700, cap: 1400 },
  { id: 'tvoc', name: 'TVOC', unit: 'ppb', good: 250, min: 40, max: 180, cap: 500 },
]

function Pollutant({ s, value }) {
  const ok = value <= s.good
  const pct = Math.min((value / s.cap) * 100, 100)
  return (
    <div className="rounded-xl border border-gray-200/80 bg-white p-5">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[0.92rem] font-bold text-ink-700">{s.name}</span>
        <span className="text-lg font-extrabold">
          {Math.round(value)} <span className="text-[0.72rem] font-semibold text-ink-400">{s.unit}</span>
        </span>
      </div>
      <div className="h-[7px] overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, background: ok ? '#22c55e' : '#f97316' }}
        />
      </div>
      <div className={`mt-2 text-[0.78rem] font-bold ${ok ? 'text-green-600' : 'text-orange-600'}`}>
        {ok ? 'Within healthy range' : 'Above healthy range'}
      </div>
    </div>
  )
}

export default function LiveAqi() {
  const [outdoor, setOutdoor] = useState(165)
  const [indoor, setIndoor] = useState(() => Object.fromEntries(SENSORS.map((s) => [s.id, (s.min + s.max) / 2])))

  useEffect(() => {
    const t = setInterval(() => {
      setOutdoor((v) => Math.max(40, Math.min(320, v + (Math.random() * 8 - 4))))
      setIndoor((prev) => {
        const next = { ...prev }
        for (const s of SENSORS) {
          const span = s.max - s.min
          next[s.id] = Math.max(s.min, Math.min(s.max, prev[s.id] + (Math.random() * span * 0.08 - span * 0.04)))
        }
        return next
      })
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const b = band(outdoor)
  const pct = Math.min((outdoor / 500) * 100, 100)

  return (
    <>
      <PageHero
        kicker="Live Air Quality"
        title={<>Know your air, <span className="text-flame-600">every second</span></>}
        lede="Outdoor AQI for Delhi NCR plus live indoor readings from the VayuView monitor network — the same dashboard our clients get with every deployment."
        crumbs={[['Live AQI']]}
      />

      {/* answer-first summary for search engines & AI assistants */}
      <section className="container-x pt-10">
        <p className="max-w-4xl text-[0.98rem] leading-relaxed text-ink-500">
          This page is a live demo of the VayuView dashboard that ships with every VayuGuard deployment: outdoor AQI for Delhi NCR beside indoor PM2.5, PM10, CO₂ and TVOC readings, each flagged green when within the healthy range VayuView alerts on. Facilities teams and families use the same interface to verify — with numbers, not promises — that their air is actually cleaner after installation.
        </p>
      </section>

      <section className="container-x py-14">
        <Reveal>
          <div className="grid items-center gap-10 rounded-3xl border border-gray-200/80 bg-white p-8 shadow-xl shadow-flame-900/5 md:p-10 lg:grid-cols-[1.2fr_2fr]">
            {/* gauge */}
            <div className="mx-auto text-center">
              <div
                className="relative mx-auto mb-4 grid h-[210px] w-[210px] place-items-center rounded-full transition-all duration-700"
                style={{ background: `conic-gradient(${b.c} 0 ${pct}%, #eef2f0 ${pct}% 100%)` }}
              >
                <div className="absolute inset-[14px] rounded-full bg-white" />
                <div className="relative">
                  <div className="text-5xl font-extrabold leading-none transition-colors duration-700" style={{ color: b.c }}>
                    {Math.round(outdoor)}
                  </div>
                  <div className="mt-1.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-ink-400">Outdoor AQI</div>
                </div>
              </div>
              <p className="mx-auto max-w-[230px] text-[0.85rem] text-ink-500">
                Delhi NCR — <strong style={{ color: b.c }}>{b.l}</strong>. Measure outdoor air before planning indoor strategies.
              </p>
            </div>

            {/* indoor feed */}
            <div>
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl font-extrabold">Indoor — VayuView Demo Unit</h2>
                <span className="chip !bg-flame-50">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-flame-500" />
                  </span>
                  Live
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {SENSORS.map((s) => <Pollutant key={s.id} s={s} value={indoor[s.id]} />)}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-6 rounded-xl border border-dashed border-flame-600/35 bg-flame-50 px-6 py-4 text-[0.88rem] text-ink-500">
            <strong className="text-flame-800">Demo mode:</strong> indoor values are simulated to show how a VayuView dashboard behaves. Outdoor AQI is indicative data for Delhi NCR. Deploy a real monitor —{' '}
            <Link to="/contact" className="font-bold text-flame-700">talk to us →</Link>
          </div>
        </Reveal>

        {/* AQI scale */}
        <Reveal delay={1}>
          <div className="mt-10 rounded-2xl border border-gray-200/80 bg-white p-7">
            <h3 className="mb-5 text-xl font-extrabold">Understanding the AQI scale</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                ['0–50', 'Good', '#22c55e'], ['51–100', 'Satisfactory', '#84cc16'], ['101–200', 'Moderate', '#eab308'],
                ['201–300', 'Poor', '#f97316'], ['301–400', 'Very Poor', '#ef4444'], ['401+', 'Severe', '#7f1d1d'],
              ].map(([range, label, c]) => (
                <div key={range} className="rounded-xl p-4 text-white" style={{ background: c }}>
                  <div className="font-extrabold">{range}</div>
                  <div className="mt-0.5 text-[0.78rem] opacity-90">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* dark features */}
      <section className="section section-dark relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-flame-400/10 blur-3xl" />
        <div className="container-x relative">
          <SectionHead center kicker-light kicker="VayuView Network" title="Monitoring that closes the loop" body="Every VayuGuard deployment includes live IAQ monitoring — so purification is verified, not assumed." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Icon.Chart, title: 'Real-time dashboards', body: 'PM2.5, PM10, CO₂, TVOC, temperature and humidity streamed every few seconds.' },
              { icon: Icon.Bell, title: 'Smart alerts', body: 'Get notified the moment any room drifts out of its healthy range — before occupants complain.' },
              { icon: Icon.Monitor, title: 'Remote device control', body: 'Adjust purification modes across sites from one console. BMS and API integration supported.' },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i}>
                <div className="card !border-white/10 !bg-white/[0.06]">
                  <div className="card-icon !bg-white/10 !text-flame-300"><f.icon /></div>
                  <h3 className="text-lg font-extrabold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-flame-100/70">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
