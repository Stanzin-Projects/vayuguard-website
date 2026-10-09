import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Reveal } from '../components/motion.jsx'
import { PageHero } from '../components/ui.jsx'
import { Icon } from '../components/Icon.jsx'
import { setPendingProduct } from '../components/pendingProduct.js'
import { PRODUCTS } from '../data/catalog.js'

const HERO_VIDEO = '/hero-section-video.mp4'

/* Dedicated product page opened by a card's "Get Quote" button.
   Layout: media gallery (studio → installed → detail crops → video) on the
   left, product story + specs + enquiry CTAs on the right. Related products
   from the same category sit below. */

function buildSlides(p) {
  const slides = [{ type: 'img', src: p.img, alt: `${p.name} — ${p.category}`, label: 'Product' }]
  if (p.appImg) slides.push({ type: 'img', src: p.appImg, alt: `${p.name} installed on site`, label: 'Installed on site' })
  if (p.detail1) slides.push({ type: 'img', src: p.detail1, alt: `${p.name} — construction detail`, label: 'Build detail' })
  if (p.detail2) slides.push({ type: 'img', src: p.detail2, alt: `${p.name} — base & access detail`, label: 'Base detail' })
  slides.push({ type: 'video', src: p.video || HERO_VIDEO, alt: 'VayuGuard system in action', label: 'In action' })
  return slides
}

export default function ProductDetail() {
  const { productId } = useParams()
  const product = useMemo(() => PRODUCTS.find((p) => p.id === productId), [productId])
  const slides = useMemo(() => (product ? buildSlides(product) : []), [product])
  const [idx, setIdx] = useState(0)

  useEffect(() => { setIdx(0) }, [productId])

  if (!product) return <Navigate to="/products" replace />

  const s = slides[idx]
  const related = PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 3)

  return (
    <>
      <PageHero
        kicker={product.tag}
        title={<>{product.name.split('—')[0].trim()} <span className="text-flame-600">— clean air, engineered</span></>}
        lede={product.category}
        crumbs={[['Products', '/products'], [product.name.split('—')[0].trim()]]}
      />

      <section className="container-x grid items-start gap-10 py-14 lg:grid-cols-[1.1fr_1fr]">
        {/* ── Media gallery ── */}
        <Reveal>
          <div className="quote-slide-stage relative overflow-hidden rounded-3xl border border-gray-200/80 bg-gradient-to-b from-flame-50 to-[#fdeee3] shadow-sm">
            <div className="relative aspect-[4/3] w-full">
              {s.type === 'video' ? (
                <video
                  key={s.src}
                  src={s.src}
                  poster="/hero-video-poster.jpg"
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              ) : (
                <img
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  className="quote-slide-img h-full w-full object-contain p-6"
                />
              )}
              <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-flame-800/85 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
                {s.label}
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2.5">
            {slides.map((sl, i) => (
              <button
                key={sl.src}
                onClick={() => setIdx(i)}
                aria-label={`Show ${sl.label}`}
                aria-current={i === idx}
                className={`quote-thumb overflow-hidden rounded-xl ring-2 transition ${
                  i === idx ? 'ring-flame-700' : 'ring-transparent opacity-60 hover:opacity-100'
                }`}
              >
                {sl.type === 'video' ? (
                  <span className="grid h-16 w-24 place-items-center rounded-xl bg-flame-900 text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M8 5.5v13l11-6.5-11-6.5Z" /></svg>
                  </span>
                ) : (
                  <img src={sl.src} alt="" loading="lazy" className="h-16 w-24 object-cover" />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Story + quote actions ── */}
        <Reveal delay={1}>
          <div className="flex flex-col gap-4">
            <span className="chip w-fit">{product.tag}</span>
            <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">{product.name}</h2>
            <p className="text-[1.02rem] leading-relaxed text-ink-500">{product.desc}</p>

            <ul className="mt-2 grid gap-2.5">
              {product.specs.map((spec) => (
                <li key={spec} className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-ink-700">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-flame-100">
                    <Icon.Check className="h-3 w-3 text-flame-700" />
                  </span>
                  {spec}
                </li>
              ))}
            </ul>

            <div className="mt-4 grid gap-3 rounded-2xl border border-gray-200/80 bg-flame-50/60 p-5 sm:grid-cols-2">
              <Link
                to="/contact"
                className="btn-primary btn-sm justify-center"
                onClick={() => setPendingProduct(product.name)}
              >
                Get a Quote <Icon.Arrow className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/919000000000?text=${encodeURIComponent(`Hi VayuGuard, I'd like a quote for the ${product.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost btn-sm justify-center"
              >
                <Icon.WhatsApp className="h-4 w-4 text-flame-600" /> WhatsApp
              </a>
              <p className="text-[0.8rem] text-ink-400 sm:col-span-2">
                Free site assessment across Delhi NCR — engineers respond within 48 hours.
              </p>
            </div>

            <Link to="/products" className="mt-1 inline-flex items-center gap-1.5 text-[0.88rem] font-bold text-flame-700 hover:text-flame-800">
              <Icon.Arrow className="h-3.5 w-3.5 rotate-180" /> Back to all products
            </Link>
          </div>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="container-x pb-16">
          <Reveal>
            <h3 className="text-2xl font-extrabold">
              More from <span className="text-flame-600">{product.tag}</span>
            </h3>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i % 3}>
                <Link
                  to={`/products/${p.id}`}
                  className="group block overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-flame-600/25 hover:shadow-xl hover:shadow-flame-900/10"
                >
                  <div className="relative grid h-44 place-items-center overflow-hidden bg-gradient-to-b from-flame-50 to-[#fdeee3] p-4">
                    <img src={p.img} alt={`${p.name} — ${p.category}`} loading="lazy" className="max-h-full w-auto max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-[1.05]" />
                  </div>
                  <div className="flex flex-col gap-1.5 p-5">
                    <span className="chip w-fit">{p.tag}</span>
                    <strong className="text-[0.98rem] font-extrabold leading-snug">{p.name}</strong>
                    <span className="line-clamp-2 text-[0.84rem] text-ink-500">{p.desc}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
