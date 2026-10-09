import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Icon, BrandMark } from './Icon.jsx'
import { NAV } from './data.jsx'
import { SOCIALS, CONTACT, LEGAL_NAME, SITE_URL, WHATSAPP_URL } from '../data/catalog.js'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [openSub, setOpenSub] = useState(null)
  const location = useLocation()
  const closeTimer = useRef(null)
  const cancelClose = () => clearTimeout(closeTimer.current)
  const armClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 180)
  }
  useEffect(() => () => clearTimeout(closeTimer.current), [])
  /* Click/tap toggles the drawer (works for mouse, touch and keyboard).
     With a mouse, leaving the open drawer closes it after a short grace period
     so travelling toward it never slams it shut. */
  const onBurgerClick = () => { cancelClose(); setOpen((o) => !o) }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setOpenSub(null) }, [location.pathname])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl shadow-md shadow-flame-900/5' : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-3 py-3 xl:gap-6">
        <Link to="/" className="flex shrink-0" aria-label="VayuGuard home">
          <BrandMark className="h-11 w-auto md:h-16" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {NAV.map((item) => (
              <li key={item.label} className="relative group">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2.5 rounded-lg text-[0.87rem] font-semibold transition-colors xl:px-3.5 xl:text-[0.93rem] ${
                      isActive ? 'text-flame-700' : 'text-ink-700 hover:text-flame-700'
                    }`
                  }
                >
                  {item.label}
                  {item.children && <Icon.Caret className="w-3 h-3 opacity-60 transition-transform duration-200 group-hover:rotate-180" />}                </NavLink>
                {item.children && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                    <div className="min-w-[300px] rounded-xl border border-gray-200/80 bg-white p-2.5 shadow-2xl shadow-flame-900/15">
                      {item.children.map((c) => (
                        <Link key={c.label} to={c.to} className="block rounded-lg px-3 py-2.5 hover:bg-flame-50">
                          <span className="block text-[0.9rem] font-bold text-ink-900">{c.label}</span>
                          <span className="block text-[0.76rem] text-ink-500">{c.sub}</span>
                        </Link>
                      ))}
                      <div className="mt-1.5 border-t border-dashed border-gray-200 px-3 pt-2.5 pb-1 text-[0.78rem] text-ink-500">
                        Not sure what fits? <Link to="/contact" className="font-bold text-flame-700">Get a free consultation →</Link>
                      </div>
                    </div>
                  </div>
                )}
                {/* active underline */}
                <span className="pointer-events-none absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-flame-600 transition-transform duration-200 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100 xl:inset-x-3.5" />
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="btn-ghost btn-sm !gap-2">
            <Icon.WhatsApp className="w-[18px] h-[18px] text-[#25d366]" /> <span className="hidden xl:inline">WhatsApp</span>
          </a>
        </div>

        {/* Mobile toggle — click/tap opens the drawer, animates to an ✕ */}
        <button
          type="button"
          className="group/burger lg:hidden relative z-50 flex h-11 w-11 items-center justify-center rounded-lg"
          onClick={onBurgerClick}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span
            className={`pointer-events-none grid h-11 w-11 place-items-center transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
            aria-hidden="true"
          >
            {open
              ? <Icon.Close className="h-6 w-6 text-ink-900" />
              : (
                <span className="flex flex-col items-center gap-[5px]">
                  <span className="h-0.5 w-6 rounded bg-ink-900 transition-transform duration-300 group-hover/burger:translate-x-0.5" />
                  <span className="h-0.5 w-6 rounded bg-ink-900 transition-transform duration-300 group-hover/burger:-translate-x-0.5" />
                  <span className="h-0.5 w-6 rounded bg-ink-900 transition-transform duration-300 group-hover/burger:translate-x-0.5" />
                </span>
              )}
          </span>
        </button>
      </div>
    </header>

      {/* Mobile drawer — sits outside the blurred header so its fixed
          positioning resolves against the viewport and covers the full screen */}
      <div
        id="mobile-nav"
        data-open={String(open)}
        onMouseEnter={cancelClose}
        onMouseLeave={armClose}
        className={`fixed inset-0 top-0 z-40 bg-white transition-[opacity,visibility,transform] duration-300 lg:hidden ${
          open ? 'visible translate-x-0 opacity-100' : 'invisible translate-x-3 opacity-0'
        }`}
      >
        <div className="container-x pt-[76px] pb-10 md:pt-[96px] overflow-y-auto h-full max-h-[100dvh]">
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
                    <div className={`grid overflow-hidden transition-all duration-300 ${openSub === item.label ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]'}`}>
                      <div className="min-h-0 overflow-hidden">
                        {item.children.map((c) => (
                          <Link key={c.label} to={c.to} className="block rounded-lg px-3 py-2.5 text-ink-700 hover:bg-flame-50">
                            <span className="block text-[0.92rem] font-bold">{c.label}</span>
                            <span className="block text-[0.75rem] text-ink-500">{c.sub}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={item.to} className="block py-4 text-lg font-bold text-ink-900">{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
            <Icon.WhatsApp className="w-5 h-5" /> Chat on WhatsApp</a>
          <div className="mt-4 flex items-center justify-center gap-3 pb-4">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`VayuGuard on ${s.label}`} className="grid h-9 w-9 place-items-center rounded-lg bg-flame-100 text-flame-700 transition hover:bg-flame-200">
                {s.label.startsWith('LinkedIn') && <Icon.LinkedIn className="h-[17px] w-[17px]" />}
                {s.label.startsWith('Instagram') && <Icon.Instagram className="h-[17px] w-[17px]" />}
                {s.label.startsWith('X ') && <Icon.X className="h-[17px] w-[17px]" />}
                {s.label.startsWith('YouTube') && <Icon.YouTube className="h-[17px] w-[17px]" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 bg-gradient-to-b from-flame-900 to-[#3d160c] text-flame-100">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="flex">
            <BrandMark className="h-12 w-auto md:h-16" />
          </Link>
          <p className="mt-4 max-w-[300px] text-[0.92rem] text-flame-200/70">
            Make-in-India hybrid air purification — HCAC HVAC cleaners, UVGI, Plasm-ION and live IAQ monitoring for Delhi NCR and beyond.
          </p>
          <div className="mt-5 flex gap-2.5">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`VayuGuard on ${s.label}`} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 transition hover:bg-white/20">
                {s.label.startsWith('LinkedIn') && <Icon.LinkedIn className="h-[17px] w-[17px]" />}
                {s.label.startsWith('Instagram') && <Icon.Instagram className="h-[17px] w-[17px]" />}
                {s.label.startsWith('X ') && <Icon.X className="h-[17px] w-[17px]" />}
                {s.label.startsWith('YouTube') && <Icon.YouTube className="h-[17px] w-[17px]" />}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-white">Products</h4>
          <ul className="space-y-2.5 text-[0.92rem]">
            {[
              ['HCAC Duct & AHU', '/products#hcac-a-1000'], ['VayuShield AC Modules', '/products#vayushield-split'],
              ['UVGI Systems', '/products#uvgi-duct'], ['ANOP / Plasm-ION', '/products#anop-duct'],
              ['Gas Phase Filtration', '/products#activated-carbon'], ['VayuView Monitors', '/products#vayuview-indoor'],
            ].map(([label, to]) => (
              <li key={to}><Link to={to} className="text-flame-200/70 transition hover:text-white">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-white">Company</h4>
          <ul className="space-y-2.5 text-[0.92rem]">
            {[['About Us', '/about'], ['Solutions', '/solutions'], ['For Business', '/for-business'], ['Events', '/events'], ['Contact', '/contact']].map(([label, to]) => (
              <li key={to}><Link to={to} className="text-flame-200/70 transition hover:text-white">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-white">Get in Touch</h4>
          <ul className="space-y-3 text-[0.92rem]">
            <li><a href={`tel:${CONTACT.phoneE164}`} className="flex items-start gap-2.5 text-flame-200/70 hover:text-white"><Icon.Phone className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" /> {CONTACT.phone}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="flex items-start gap-2.5 text-flame-200/70 hover:text-white"><Icon.Mail className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" /> {CONTACT.email}</a></li>
            <li><span className="flex items-start gap-2.5 text-flame-200/70"><Icon.Pin className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" /> {CONTACT.address.street ? `${CONTACT.address.street}, ` : ''}{CONTACT.address.city}, Delhi NCR, India</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-5 text-[0.82rem] text-flame-200/60">
          <span>© {year} {LEGAL_NAME}. All rights reserved.</span>
          <a href={SITE_URL} className="hover:text-white">vayuguard.com</a>
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-[68px] md:pt-[88px]">{children}</main>
      <Footer />
    </>
  )
}
