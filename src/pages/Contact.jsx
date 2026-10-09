import { useState } from 'react'
import { Reveal } from '../components/motion.jsx'
import { PageHero } from '../components/ui.jsx'
import { Icon } from '../components/Icon.jsx'
import { PHONE, EMAIL, WHATSAPP } from '../components/data.jsx'
import { ADDRESS, LEGAL_NAME } from '../data/catalog.js'
import { usePendingProduct, setPendingProduct } from '../components/pendingProduct.js'

const TYPES = ['My home / apartment', 'Office / workplace', 'Hospital / healthcare', 'School / institute', 'Hotel / hospitality', 'Industry / warehouse', 'Partnership / distribution']

const inputCls = (err) =>
  `w-full rounded-xl border-[1.5px] bg-flame-50 px-4 py-3 text-[0.95rem] outline-none transition-colors placeholder:text-ink-400/70 focus:bg-white ${
    err ? 'border-red-400' : 'border-gray-200 focus:border-flame-600'
  }`

export default function Contact() {
  const [pendingProduct] = usePendingProduct()
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: TYPES[0], city: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = true
    if (!form.phone.trim()) errs.phone = true
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = true
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSent(true)
  }

  return (
    <>
      <PageHero
        kicker="Contact Us"
        title={<>Let's talk about <span className="text-flame-600">your air</span></>}
        lede="Free site assessments across Delhi NCR. Share a few details and our engineers will respond within 48 hours."
        crumbs={[['Contact']]}
        leaves
      />

      <section className="container-x grid items-start gap-8 py-14 lg:grid-cols-[1.15fr_1fr]">
        {/* form */}
        <Reveal>
          <div className="rounded-3xl border border-gray-200/80 bg-white p-8 shadow-xl shadow-flame-900/5 md:p-10">
            {sent ? (
              <div className="py-12 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-flame-100">
                  <Icon.Check className="h-8 w-8 text-flame-700" />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold">Enquiry received!</h3>
                <p className="mx-auto mt-2 max-w-sm text-ink-500">
                  Our air-quality engineers will reach out within 48 hours. For anything urgent, WhatsApp us anytime.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold">Request a free consultation</h2>
                <form className="mt-6" onSubmit={submit} noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[0.86rem] font-bold text-ink-700">Full Name *</span>
                      <input className={inputCls(errors.name)} placeholder="e.g. Priya Sharma" value={form.name} onChange={set('name')} />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[0.86rem] font-bold text-ink-700">Phone *</span>
                      <input className={inputCls(errors.phone)} placeholder="+91 98XXX XXXXX" value={form.phone} onChange={set('phone')} />
                    </label>
                  </div>
                  <label className="mt-4 block">
                    <span className="mb-1.5 block text-[0.86rem] font-bold text-ink-700">Email *</span>
                    <input className={inputCls(errors.email)} placeholder="you@company.com" value={form.email} onChange={set('email')} />
                  </label>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[0.86rem] font-bold text-ink-700">I am enquiring for</span>
                      <select className={inputCls()} value={form.type} onChange={set('type')}>
                        {TYPES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[0.86rem] font-bold text-ink-700">City</span>
                      <input className={inputCls()} placeholder="New Delhi" value={form.city} onChange={set('city')} />
                    </label>
                  </div>
                  <label className="mt-4 block">
                    <span className="mb-1.5 flex items-center gap-2 text-[0.86rem] font-bold text-ink-700">
                      Product interest
                      {pendingProduct && (
                        <button
                          type="button"
                          onClick={() => setPendingProduct(null)}
                          className="inline-flex items-center gap-1 rounded-full bg-flame-100 px-2.5 py-0.5 text-[0.72rem] font-bold text-flame-700 transition hover:bg-flame-200"
                        >
                          {pendingProduct} <Icon.Close className="h-3 w-3" />
                        </button>
                      )}
                    </span>
                    <input
                      className={inputCls()}
                      placeholder="e.g. HCAC for my office AHU"
                      value={pendingProduct ?? ''}
                      onChange={(e) => setPendingProduct(e.target.value)}
                    />
                    <span className="mt-1.5 block text-[0.86rem] font-bold text-ink-700">Tell us about your space</span>
                    <textarea rows="4" className={inputCls()} placeholder="Approximate area, number of ACs / AHUs, main concerns (dust, odour, AQI)…" value={form.message} onChange={set('message')} />
                  </label>
                  <button type="submit" className="btn-primary mt-6 w-full">Send Enquiry</button>
                  <p className="mt-3 text-[0.8rem] text-ink-400">By submitting, you agree to be contacted about VayuGuard products. We never share your data.</p>
                </form>
              </>
            )}
          </div>
        </Reveal>

        {/* info */}
        <Reveal delay={1}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-flame-800 to-flame-950 p-8 text-white md:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-flame-400/20 blur-3xl" />
            <h3 className="text-2xl font-extrabold">Reach us directly</h3>
            <p className="mt-2 text-[0.94rem] text-flame-100/75">Prefer to talk first? We're a message away.</p>

            <div className="mt-8 grid gap-6">
              {[
                { icon: Icon.Phone, title: 'Phone / WhatsApp', lines: [<a key="t" href={`tel:${PHONE}`} className="hover:text-white">{PHONE}</a>, 'Mon–Sat, 9 AM – 7 PM'] },
                { icon: Icon.Mail, title: 'Email', lines: [<a key="m" href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a>, 'replies within 24 hrs'] },
                { icon: Icon.Pin, title: 'Head Office', lines: [LEGAL_NAME, ADDRESS.street, `${ADDRESS.city}, ${ADDRESS.region} ${ADDRESS.postalCode}, India`].filter(Boolean) },
                { icon: Icon.Clock, title: 'Response Time', lines: ['Site assessments scheduled within 48 hours across NCR'] },
              ].map((c) => (
                <div key={c.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-flame-300"><c.icon /></span>
                  <div>
                    <strong className="block text-[0.95rem]">{c.title}</strong>
                    <span className="block text-[0.88rem] text-flame-100/75">{c.lines.map((l, i) => <span key={i} className="block">{l}</span>)}</span>
                  </div>
                </div>
              ))}
            </div>

            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-white mt-9 w-full justify-center">Chat on WhatsApp</a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
