import { Link } from 'react-router-dom'
import { Reveal, TiltCard } from '../components/motion.jsx'
import { PageHero, CtaBand, SectionHead } from '../components/ui.jsx'
import { Icon } from '../components/Icon.jsx'

const TIMELINE = [
  { year: '2019', title: 'The founding insight', body: "Our founders — HVAC engineers — watched Delhi's air quality collapse every winter and asked: why treat rooms one by one when the problem flows through the ducts?" },
  { year: '2021', title: 'HCAC is patented', body: 'The Hybrid Central Air Cleaner is patented: electro-charged, washable media that cleans the entire HVAC supply path with minimal pressure drop.' },
  { year: '2023', title: 'From HVAC to every breath', body: 'VayuShield, UVGI, ANOP and the VayuView monitor round out a full-stack portfolio — whole-building to wearable.' },
  { year: '2026', title: 'Installations nationwide', body: 'Trusted by homes, offices, hospitals, schools and industry across Delhi NCR and India — with live IAQ monitoring in every deployment.' },
]

const VALUES = [
  { icon: Icon.Heart, title: 'Health First', body: 'Every spec sheet starts with one question: how many fewer particles reach human lungs.' },
  { icon: Icon.Mountain, title: 'Engineered in India', body: 'Designed, patented and manufactured for Indian dust, heat and HVAC hardware.' },
  { icon: Icon.Recycle, title: 'Sustainable by Design', body: 'Washable, reusable media — purification without mountains of disposable filters.' },
  { icon: Icon.Clock, title: 'Proof, Not Promises', body: "Live IAQ data from every deployment. If the air doesn't improve, we haven't finished our job." },
]

export default function About() {
  return (
    <>
      <PageHero
        kicker="About VayuGuard"
        title={<>Guarding you, <span className="text-flame-600">guarding tomorrow</span></>}
        lede="We are a Make-in-India climate-tech company on a mission to make every indoor space safer — through patented hybrid air purification engineered for Indian air."
        crumbs={[['About']]}
        leaves
      />

      {/* Mission */}
      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <span className="kicker">Our Mission</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Clean air is not a luxury.<br /><span className="text-flame-600">It's infrastructure.</span>
          </h2>
          <p className="mt-5 text-ink-500">
            Founded in New Delhi — a city that breathes some of the world's most polluted air — VayuGuard Climate Tech designs and manufactures hybrid purification systems that treat air where people actually live and work: inside AHUs, ducts, split ACs, classrooms, wards and offices.
          </p>
          <p className="mt-4 text-ink-500">
            Our patented HCAC platform was developed with India's climate, dust loads and HVAC realities in mind — washable media, low pressure drop and purification that scales from a single bedroom to an entire hospital campus.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary">Explore Our Products</Link>
            <Link to="/contact" className="btn-ghost">Partner With Us</Link>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <TiltCard max={9} glare={false}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-flame-700 to-flame-950 p-10 text-white shadow-2xl shadow-flame-900/30">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              {[
                ['Trusted', 'installations across homes, offices, hospitals & schools'],
                ['Advanced', 'removal of PM2.5 and pollutants in tested deployments'],
                ['Patented', 'climate technologies, designed and filed in India'],
              ].map(([big, lbl], i) => (
                <div key={big} className={i > 0 ? 'mt-7 border-t border-white/15 pt-7' : ''}>
                  <div className="text-4xl font-extrabold">{big}</div>
                  <div className="mt-1 text-[0.85rem] text-flame-100/75">{lbl}</div>
                </div>
              ))}
            </div>
          </TiltCard>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="section section-mint">
        <div className="container-x">
          <SectionHead center kicker="Our Journey" title={<>From a Delhi garage <span className="text-flame-600">to cleaner air nationwide</span></>} />
          <ul className="mx-auto mt-12 max-w-3xl">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i % 3}>
                <li className="grid grid-cols-[90px_1fr] gap-6 border-b border-dashed border-flame-600/15 py-6 last:border-0">
                  <span className="text-lg font-extrabold text-flame-700">{t.year}</span>
                  <div>
                    <h3 className="font-extrabold">{t.title}</h3>
                    <p className="mt-1 text-[0.94rem] text-ink-500">{t.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-x">
          <SectionHead center kicker="What Drives Us" title={<>Values behind <span className="text-flame-600">every unit we ship</span></>} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i}>
                <TiltCard max={7} className="h-full rounded-xl">
                  <div className="h-full rounded-xl border border-gray-200/80 bg-white p-6">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-flame-100 text-flame-700 [&>svg]:h-5 [&>svg]:w-5"><v.icon /></span>
                    <h3 className="mt-4 font-extrabold">{v.title}</h3>
                    <p className="mt-1.5 text-[0.87rem] text-ink-500">{v.body}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Breathe the difference yourself" body="Book a free site assessment — we'll measure your indoor air and show you exactly what a VayuGuard system would change." cta="Book an Assessment" />
      <div className="pb-8" />
    </>
  )
}
