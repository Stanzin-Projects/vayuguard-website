import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Icon, BrandMark } from './Icon.jsx'
import { NAV, PHONE, EMAIL, WHATSAPP } from './data.jsx'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [openSub, setOpenSub] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setOpenSub(null) }, [location.pathname])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl shadow-md shadow-forest-900/5' : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6 py-3">
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="VayuGuard home">
          <BrandMark className="w-11 h-11" />
          <span className="flex flex-col leading-none">
            <span className="text-[1.3rem] font-extrabold tracking-tight text-ink-900">
              VayuGuard<sup className="text-[0.55rem] text-ink-500">®</sup>
            </span>
            <span className="mt-1 text-[0.6rem] font-bold tracking-[0.08em] uppercase text-forest-600">
              Guarding You, Guarding Tomorrow.
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.label} className="relative group">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-[0.93rem] font-semibold transition-colors ${
                      isActive ? 'text-forest-700' : 'text-ink-700 hover:text-forest-700'
                    }`
                  }
                >
                  {item.label}
                  {item.children && <Icon.Caret className="w-3 h-3 opacity-60 transition-transform duration-200 group-hover:rotate-180" />}                </NavLink>
                {item.children && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                    <div className="min-w-[300px] rounded-xl border border-gray-200/80 bg-white p-2.5 shadow-2xl shadow-forest-900/15">
                      {item.children.map((c) => (
                        <Link key={c.label} to={c.to} className="block rounded-lg px-3 py-2.5 hover:bg-forest-50">
                          <span className="block text-[0.9rem] font-bold text-ink-900">{c.label}</span>
                          <span className="block text-[0.76rem] text-ink-500">{c.sub}</span>
                        </Link>
                      ))}
                      <div className="mt-1.5 border-t border-dashed border-gray-200 px-3 pt-2.5 pb-1 text-[0.78rem] text-ink-500">
                        Not sure what fits? <Link to="/contact" className="font-bold text-forest-700">Get a free consultation →</Link>
                      </div>
                    </div>
                  </div>
                )}
                {/* active underline */}
                <span className="pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-forest-600 transition-transform duration-200 group-hover:scale-x-100" />
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm !gap-2">
            <Icon.WhatsApp className="w-[18px] h-[18px] text-[#25d366]" /> WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-lg"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className={`h-0.5 w-6 rounded bg-ink-900 transition-all duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 rounded bg-ink-900 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 rounded bg-ink-900 transition-all duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-0 z-40 bg-white transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container-x pt-24 pb-10 overflow-y-auto h-full">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-gray-100">
                {item.children ? (
                  <>
                    <button
                      className="flex w-full items-center justify-between py-4 text-left text-lg font-bold text-ink-900"
                      onClick={() => setOpenSub(openSub === item.label ? null : item.label)}
                    >
                      {item.label}
                      <Icon.Caret className={`w-4 h-4 transition-transform ${openSub === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openSub === item.label ? 'max-h-96 pb-3' : 'max-h-0'}`}>
                      {item.children.map((c) => (
                        <Link key={c.label} to={c.to} className="block rounded-lg px-3 py-2.5 text-ink-700 hover:bg-forest-50">
                          <span className="block text-[0.92rem] font-bold">{c.label}</span>
                          <span className="block text-[0.75rem] text-ink-500">{c.sub}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link to={item.to} className="block py-4 text-lg font-bold text-ink-900">{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
            <Icon.WhatsApp className="w-5 h-5" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 bg-gradient-to-b from-forest-900 to-[#082b20] text-forest-100">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <BrandMark light className="w-11 h-11" />
            <span className="flex flex-col leading-none">
              <span className="text-[1.3rem] font-extrabold tracking-tight text-white">
                VayuGuard<sup className="text-[0.55rem] text-forest-300">®</sup>
              </span>
              <span className="mt-1 text-[0.6rem] font-bold tracking-[0.08em] uppercase text-forest-400">
                Guarding You, Guarding Tomorrow.
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-[300px] text-[0.92rem] text-forest-200/70">
            Make-in-India hybrid air purification — HCAC HVAC cleaners, UVGI, Plasm-ION and live IAQ monitoring for Delhi NCR and beyond.
          </p>
          <div className="mt-5 flex gap-2.5">
            {[Icon.LinkedIn, Icon.Instagram, Icon.X, Icon.YouTube].map((I, i) => (
              <a key={i} href="#" aria-label="social link" className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 transition hover:bg-white/20">
                <I className="h-[17px] w-[17px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-white">Products</h4>
          <ul className="space-y-2.5 text-[0.92rem]">
            {[
              ['HCAC Hybrid HVAC', '/products#hcac'], ['VayuShield AC Units', '/products#vayushield'],
              ['UVGI Systems', '/products#uvgi'], ['Plasm-ION Bipolar', '/products#plasm-ion'],
              ['VayuView Monitors', '/products#monitors'],
            ].map(([label, to]) => (
              <li key={to}><Link to={to} className="text-forest-200/70 transition hover:text-white">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-white">Company</h4>
          <ul className="space-y-2.5 text-[0.92rem]">
            {[['About Us', '/about'], ['Solutions', '/solutions'], ['For Business', '/for-business'], ['Events', '/events'], ['Contact', '/contact']].map(([label, to]) => (
              <li key={to}><Link to={to} className="text-forest-200/70 transition hover:text-white">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-white">Get in Touch</h4>
          <ul className="space-y-3 text-[0.92rem]">
            <li><a href={`tel:${PHONE}`} className="flex items-start gap-2.5 text-forest-200/70 hover:text-white"><Icon.Phone className="mt-0.5 h-4 w-4 shrink-0 text-forest-400" /> {PHONE}</a></li>
            <li><a href={`mailto:${EMAIL}`} className="flex items-start gap-2.5 text-forest-200/70 hover:text-white"><Icon.Mail className="mt-0.5 h-4 w-4 shrink-0 text-forest-400" /> {EMAIL}</a></li>
            <li><span className="flex items-start gap-2.5 text-forest-200/70"><Icon.Pin className="mt-0.5 h-4 w-4 shrink-0 text-forest-400" /> New Delhi, Delhi NCR, India</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-5 text-[0.82rem] text-forest-200/60">
          <span>© {year} VayuGuard Climate Tech Pvt Ltd. All rights reserved.</span>
          <span>Guarding You, Guarding Tomorrow. <Link to="/" className="hover:text-white">vayuguard.com</Link></span>
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-[72px]">{children}</main>
      <Footer />
    </>
  )
}
