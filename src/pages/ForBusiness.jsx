import { Link } from 'react-router-dom'
import { Reveal, TiltCard } from '../components/motion.jsx'
import { PageHero, CtaBand } from '../components/ui.jsx'
import { Icon } from '../components/Icon.jsx'

const OFFERS = [
  ['Site audit & AHU mapping', 'Engineers measure baseline PM2.5, CO₂ and airflow before quoting.'],
  ['Phased rollout plans', 'Pilot one floor or one campus, scale with verified results.'],
  ['Central VayuView console', 'Every unit, every site, one dashboard with alerts and reports.'],
  ['Compliance documentation', 'IAQ logs formatted for LEED, IGBC, NABH and ESG reporting.'],
  ['AMC with SLAs', 'Preventive maintenance, washable-media care and guaranteed response times.'],
]

const SEGMENTS = [
  { icon: Icon.Home, title: 'Real Estate & Workplaces', body: 'Campus-wide HCAC rollouts with tenant-facing IAQ dashboards.' },
  { icon: Icon.Cross, title: 'Hospital Chains', body: 'UVGI + washable filtration programs aligned to NABH audits.' },
  { icon: Icon.Cap, title: 'Education Groups', body: 'Multi-school deployments with per-classroom monitoring.' },
  { icon: Icon.Industry, title: 'Industrial Parks', body: 'Dust-control and O&M-saving filtration for central plants.' },
]

const PARTNERS = [
  { icon: Icon.Users, title: 'Distributorships', body: 'Regional exclusivity, demo units and margin support for high-volume territories.' },
  { icon: Icon.Wrench, title: 'Service & AMC Partners', body: 'Certified maintenance training, spare pipelines and SLA-backed ticketing tools.' },
  { icon: Icon.Trend, title: 'Consultants & Architects', body: 'Spec support, BIM-ready product data and CPD sessions for your design teams.' },
]

export default function ForBusiness() {
  return (
    <>
      <PageHero
        kicker="For Business"
        title={<>Enterprise air quality, <span className="text-flame-600">as a program</span></>}
        lede="Multi-site deployments, AMC partnerships, distributorships and compliance-ready IAQ documentation — one account team for your entire portfolio."
        crumbs={[['For Business']]}
      />

      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal>
          <span className="kicker">What You Get</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Built for facility heads, <span className="text-flame-600">not just facilities</span>
          </h2>
          <ul className="mt-7 grid gap-4">
            {OFFERS.map(([t, b]) => (
              <li key={t} className="flex gap-3">
                <Icon.Check className="mt-1 h-5 w-5 shrink-0 text-flame-600" />
                <span className="text-ink-700"><strong className="text-ink-900">{t}</strong> — {b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">Request a Business Quote</Link>
            <Link to="/products" className="btn-ghost">Browse Products</Link>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {SEGMENTS.map((s, i) => (
            <Reveal key={s.title} delay={i % 2}>
              <TiltCard max={8} className="h-full rounded-2xl">
                <div className="card h-full">
                  <div className="card-icon"><s.icon /></div>
                  <h3 className="font-extrabold">{s.title}</h3>
                  <p className="mt-1.5 text-[0.9rem] text-ink-500">{s.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section-dark relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-flame-400/10 blur-3xl" />
        <div className="container-x relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="kicker kicker-light">Partner With VayuGuard</span>
              <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">Grow with the clean-air economy</h2>
              <p className="mt-3 text-flame-100/80">Join India's fastest-growing indoor air quality network as a channel partner.</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.title} delay={i}>
                <div className="card !border-white/10 !bg-white/[0.06]">
                  <div className="card-icon !bg-white/10 !text-flame-300"><p.icon /></div>
                  <h3 className="text-lg font-extrabold text-white">{p.title}</h3>
                  <p className="mt-1.5 text-flame-100/70">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Let's scope your portfolio" body="One call with our enterprise team covers audits, pricing, rollout phasing and SLAs." cta="Talk to Enterprise Sales" />
      <div className="pb-8" />
    </>
  )
}
