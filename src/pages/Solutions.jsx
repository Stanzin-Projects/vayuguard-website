import { Link } from 'react-router-dom'
import { Reveal } from '../components/motion.jsx'
import { PageHero, CtaBand } from '../components/ui.jsx'
import { SOLUTIONS } from '../components/data.jsx'
import { Icon } from '../components/Icon.jsx'

function SolutionRow({ s, index }) {
  const flip = index % 2 === 1
  return (
    <div id={s.id} className="grid scroll-mt-28 items-center gap-10 border-b border-gray-100 py-14 last:border-0 lg:grid-cols-2">
      <Reveal className={flip ? 'lg:order-2' : ''}>
        <div
          className="relative flex min-h-[300px] items-end overflow-hidden rounded-3xl p-8 shadow-xl shadow-flame-900/15"
          style={{ background: `linear-gradient(150deg, ${s.a}, ${s.b})` }}
        >
          <span className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_70%)]" />
          <span className="pointer-events-none absolute bottom-6 right-8 opacity-25">
            <s.icon className="h-28 w-28" />
          </span>
          <div className="relative z-10 flex flex-wrap gap-2.5">
            {s.products.map((p) => <span key={p} className="chip chip-white">{p}</span>)}
          </div>
        </div>
      </Reveal>

      <Reveal delay={1} className={flip ? 'lg:order-1' : ''}>
        <span className="kicker">{s.kicker}</span>
        <h3 className="mt-4 text-2xl font-extrabold md:text-3xl">{s.title}</h3>
        <p className="mt-3 text-ink-500">{s.body}</p>
        <ul className="mt-5 grid gap-2.5">
          {s.points.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5 text-[0.94rem] text-ink-700">
              <Icon.Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-flame-600" /> {pt}
            </li>
          ))}
        </ul>
        <Link to="/contact" className="btn-primary btn-sm mt-6">{s.cta}</Link>
      </Reveal>
    </div>
  )
}

export default function Solutions() {
  return (
    <>
      <PageHero
        kicker="Solutions"
        title={<>Clean air for <span className="text-flame-600">every environment</span></>}
        lede="From bedrooms to hospital wards, our engineers size the right hybrid system for your space, occupancy and usage patterns."
        crumbs={[['Solutions']]}
      />

      {/* answer-first summary for search engines & AI assistants */}
      <section className="container-x pt-10">
        <p className="max-w-4xl text-[0.98rem] leading-relaxed text-ink-500">
          VayuGuard engineers clean air for every environment: homes and apartments get VayuShield AC modules and HRAC room units; offices get HCAC in-duct purification across AHUs with live dashboards; hospitals get UVGI and washable filtration for NABH-aligned infection control; schools get phased classroom rollouts with AQI displays; hotels get odour-free HVAC loops; and industry gets dust, fume and odour control at scale. Send your floor plan for a free assessment and a hybrid configuration scoped to your space.
        </p>
      </section>

      <section className="container-x">
        {SOLUTIONS.map((s, i) => <SolutionRow key={s.id} s={s} index={i} />)}
      </section>
      <CtaBand title="Your space, sized and scoped" body="Send us your floor plan — we'll return a hybrid configuration with expected PM2.5 reduction and payback period." cta="Get a Free Assessment" />
      <div className="pb-8" />
    </>
  )
}
