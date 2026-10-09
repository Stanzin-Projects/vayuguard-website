import { useState } from 'react'
import { Reveal } from './motion.jsx'
import { Icon } from './Icon.jsx'

/* Accessible FAQ accordion. The same Q/A copy feeds FAQPage JSON-LD via
   src/data/schema.js, so visible answers always match the structured data. */
export default function Faq({ faqs, kicker = 'FAQ', title = 'Frequently asked questions', body, dark = false }) {
  const [open, setOpen] = useState(0)
  const [pinned, setPinned] = useState(false)

  return (
    <section
      className={`section ${dark ? 'section-dark' : 'bg-flame-50/40'}`}
      onMouseEnter={() => setPinned(true)}
      onMouseLeave={() => setPinned(false)}
    >
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className={`kicker ${dark ? 'kicker-light' : ''}`}>{kicker}</span>
          <h2 className={`mt-4 text-3xl font-extrabold tracking-tight md:text-4xl ${dark ? 'text-white' : ''}`}>{title}</h2>
          {body && <p className={`mt-3 ${dark ? 'text-flame-100/80' : 'text-ink-500'}`}>{body}</p>}
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-3xl gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i || pinned
            return (
              <Reveal key={f.q} delay={Math.min(i, 3)}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                    dark
                      ? `bg-white/5 ${isOpen ? 'border-flame-400/40' : 'border-white/10'}`
                      : `bg-white ${isOpen ? 'border-flame-600/40' : 'border-gray-200/80'}`
                  }`}
                >
                  <button
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                    onClick={() => { setPinned(false); setOpen(isOpen && open === i ? -1 : i) }}
                  >
                    <h3 className={`text-[1rem] font-extrabold ${dark ? 'text-white' : 'text-ink-900'}`}>{f.q}</h3>
                    <Icon.Caret className={`h-4 w-4 shrink-0 opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${dark ? 'text-white' : ''}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className={`px-6 pb-5 text-[0.94rem] leading-relaxed ${dark ? 'text-flame-100/70' : 'text-ink-500'}`}>{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
