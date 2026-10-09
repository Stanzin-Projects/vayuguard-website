import { useState } from 'react'
import { Reveal } from '../components/motion.jsx'
import { PageHero, CtaBand } from '../components/ui.jsx'
import FlipCard from '../components/FlipCard.jsx'
import Faq from '../components/Faq.jsx'
import { PRODUCTS, FAQS } from '../data/catalog.js'
import { Icon } from '../components/Icon.jsx'

const FILTERS = [
  { key: 'all', label: 'All Products' },
  { key: 'hvac', label: 'For HVAC & Ducts' },
  { key: 'rooms', label: 'For Rooms & Spaces' },
  { key: 'germicidal', label: 'UVGI & Odour Control' },
  { key: 'gas-phase', label: 'Gas Phase Filtration' },
  { key: 'monitoring', label: 'Monitoring & Software' },
  { key: 'specialized', label: 'Specialized' },
]

export default function Products() {
  const [filter, setFilter] = useState('all')
  const shown = PRODUCTS.filter((p) => filter === 'all' || p.cat === filter)

  return (
    <>
      <PageHero
        kicker="Catalogue"
        title={<>Engineered for <span className="text-flame-600">every air problem</span></>}
        lede="HCAC duct cleaners, VayuShield AC modules, UVGI, bipolar ionization, gas-phase filtration and live IAQ monitors — hover or tap a product to see it installed on site."
        crumbs={[['Products']]}
      />

      {/* answer-first summary — the format search engines & AI assistants quote.
          Collapsed behind <details> on small screens so it can't dominate the page. */}
      <section className="container-x pt-10">
        <p className="max-w-4xl text-[0.98rem] leading-relaxed text-ink-500">
          VayuGuard builds air purification for both central HVAC and individual rooms. The patented HCAC range (1000/2000 CFM, CS, Slim and FCU formats) cleans air inside AHUs and ducts with washable electro-charged media; VayuShield retrofits split and cassette AC indoor units; standalone HRAC units purify rooms from small to XL.
        </p>
        <details className="group mt-2 max-w-4xl">
          <summary className="inline cursor-pointer list-none text-[0.88rem] font-bold text-flame-700 transition-colors hover:text-flame-800">
            <span className="group-open:hidden">Show the full range details ▾</span>
            <span className="hidden group-open:inline">Hide full range details ▴</span>
          </summary>
          <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-500">
            Duct-mount and upper-room UVGI disinfect with UV-C; ANOP and Plasm-ION bipolar ionization neutralize odours and VOCs; activated-carbon and chemical media handle industrial gas-phase loads; and VayuView monitors track PM2.5, PM10, CO₂ and TVOC in real time. Every product is engineered in India and backed by free site assessments across Delhi NCR.
          </p>
        </details>
      </section>

      <section className="container-x py-14">
        <Reveal>
          <div className="mb-4 flex gap-3 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-x-visible lg:pb-0">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`shrink-0 whitespace-nowrap rounded-full border-[1.5px] px-5 py-2.5 text-[0.9rem] font-bold transition-all duration-200 ${
                  filter === f.key
                    ? 'border-flame-700 bg-flame-700 text-white shadow-lg shadow-flame-700/25'
                    : 'border-gray-200 bg-white text-ink-700 hover:border-flame-600 hover:text-flame-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="mb-9 flex items-center gap-2 text-[0.85rem] font-semibold text-ink-400">
            <Icon.Target className="h-4 w-4 text-flame-600" />
            Showing {shown.length} product{shown.length === 1 ? '' : 's'} — hover any card to flip it and see the installed photo
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={i % 3} className="h-full">
              <FlipCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <Faq
        faqs={FAQS}
        kicker="Product FAQ"
        title="Everything buyers ask before choosing a system"
        body="Straight answers on technology, fitment, maintenance and cost — the same answers our engineers give on site visits."
      />

      <CtaBand
        title="Not sure which product fits?"
        body="Share your floor plan or AHU details — our engineers will recommend the right hybrid configuration within 48 hours."
        cta="Talk to an Engineer"
      />
      <div className="pb-8" />
    </>
  )
}
