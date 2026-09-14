import { Link } from 'react-router-dom'
import { Reveal, TiltCard } from '../components/motion.jsx'
import { PageHero, CtaBand, SectionHead } from '../components/ui.jsx'
import { EVENTS } from '../components/data.jsx'
import { Icon } from '../components/Icon.jsx'

export default function Events() {
  return (
    <>
      <PageHero
        kicker="Events & Exhibitions"
        title={<>Meet us in the <span className="text-forest-600">clean-air conversation</span></>}
        lede="Trade shows, workshops and live demos across Delhi NCR and India. Walk in, see the machines run, and check the live numbers yourself."
        crumbs={[['Events']]}
      />

      <section className="container-x py-14">
        <SectionHead kicker="Upcoming" title="Where to find us next" />
        <div className="mt-9 grid gap-5">
          {EVENTS.upcoming.map((e, i) => (
            <Reveal key={e.title} delay={i % 2}>
              <TiltCard max={5} className="rounded-2xl">
                <div className="flex flex-col gap-5 rounded-2xl border border-gray-200/80 bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-forest-900/10 sm:flex-row md:p-7">
                  <div className="flex h-[84px] w-[74px] shrink-0 flex-col items-center justify-center rounded-xl bg-forest-700 font-extrabold text-white">
                    <span className="text-[1.7rem] leading-none">{e.day}</span>
                    <span className="mt-1 text-[0.72rem] uppercase tracking-[0.1em]">{e.mon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold">{e.title}</h3>
                    <div className="mt-1.5 flex flex-wrap gap-4 text-[0.85rem] text-ink-500">
                      <span className="flex items-center gap-1.5"><Icon.Pin className="h-3.5 w-3.5 text-forest-600" />{e.where}</span>
                      <span className="flex items-center gap-1.5"><Icon.Clock className="h-3.5 w-3.5 text-forest-600" />{e.time}</span>
                    </div>
                    <p className="mt-2.5 text-[0.92rem] text-ink-500">{e.body}</p>
                    <Link to="/contact" className="btn-primary btn-sm mt-4">Book a Slot</Link>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <SectionHead kicker="Past Highlights" title="Where we've been" />
          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {EVENTS.past.map((e, i) => (
              <Reveal key={e.title} delay={i}>
                <div className="card h-full">
                  <span className="chip mb-4">{e.when}</span>
                  <h3 className="text-lg font-extrabold">{e.title}</h3>
                  <p className="mt-2 text-[0.9rem] text-ink-500">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want VayuGuard at your event?" body="We bring live demo rigs, free IAQ testing and speaker sessions on indoor air quality." cta="Invite Us" />
      <div className="pb-8" />
    </>
  )
}
