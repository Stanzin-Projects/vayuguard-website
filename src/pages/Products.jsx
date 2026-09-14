import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal, TiltCard } from '../components/motion.jsx'
import { PageHero, CtaBand, ProductVisual } from '../components/ui.jsx'
import { PRODUCTS } from '../components/data.jsx'
import { Icon } from '../components/Icon.jsx'

const FILTERS = [
  { key: 'all', label: 'All Products' },
  { key: 'hvac', label: 'For HVAC & Ducts' },
  { key: 'rooms', label: 'For Rooms' },
  { key: 'monitoring', label: 'Monitoring' },
]

export default function Products() {
  const [filter, setFilter] = useState('all')
  const shown = PRODUCTS.filter((p) => filter === 'all' || p.cat === filter)

  return (
    <>
      <PageHero
        kicker="Catalogue"
        title={<>Engineered for <span className="text-forest-600">every air problem</span></>}
        lede="Hybrid HVAC cleaners, split and cassette AC purifiers, odor control, UVGI, Plasm-ION, and air quality monitors — select a product for specs and applications."
        crumbs={[['Products']]}
      />

      <section className="container-x py-14">
        <Reveal>
          <div className="mb-9 flex flex-wrap gap-3">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full border-[1.5px] px-5 py-2.5 text-[0.9rem] font-bold transition-all duration-200 ${
                  filter === f.key
                    ? 'border-forest-700 bg-forest-700 text-white shadow-lg shadow-forest-700/25'
                    : 'border-gray-200 bg-white text-ink-700 hover:border-forest-600 hover:text-forest-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={i % 3}>
              <TiltCard max={7} className="h-full rounded-2xl">
                <article id={p.id} className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-shadow duration-300 hover:shadow-2xl hover:shadow-forest-900/10">
                  <ProductVisual shape={p.shape} />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <span className="chip">{p.tag}</span>
                    <h3 className="text-lg font-extrabold">{p.name}</h3>
                    <p className="text-[0.9rem] text-ink-500">{p.desc}</p>
                    <ul className="mt-1 grid gap-2">
                      {p.specs.map((s) => (
                        <li key={s} className="flex items-start gap-2.5 text-[0.88rem] text-ink-700">
                          <span className="relative mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-forest-100">
                            <Icon.Check className="h-2.5 w-2.5 text-forest-700" />
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-gray-200 pt-4">
                      <Link to="/contact" className="btn-primary btn-sm">Get Quote</Link>
                      <Link to="/contact" className="inline-flex items-center gap-2 text-[0.88rem] font-bold text-forest-700">
                        Download specs <Icon.Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure which product fits?"
        body="Share your floor plan or AHU details — our engineers will recommend the right hybrid configuration within 48 hours."
        cta="Talk to an Engineer"
      />
      <div className="pb-8" />
    </>
  )
}
