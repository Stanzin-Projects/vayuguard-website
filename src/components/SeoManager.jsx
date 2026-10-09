import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, OG_IMAGE_PATH, PRODUCTS, routeMeta } from '../data/catalog.js'
import { graphFor } from '../data/schema.js'

/* Runtime per-route head management. The prerender step bakes the same data
   into the saved HTML, so crawlers see identical tags without executing JS. */

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    /* Product detail pages (/products/:id) get per-product meta derived
       straight from the catalog record. */
    const productMatch = pathname.match(/^\/products\/([\w-]+)$/)
    const product = productMatch ? PRODUCTS.find((p) => p.id === productMatch[1]) : null
    const meta = routeMeta(pathname)
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`
    const image = `${SITE_URL}${product ? product.img : OG_IMAGE_PATH}`

    document.title = meta.title
    upsertMeta('name', 'description', meta.description)
    upsertLink('canonical', url)
    upsertMeta('property', 'og:title', meta.title)
    upsertMeta('property', 'og:description', meta.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:image', image)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', meta.title)
    upsertMeta('name', 'twitter:description', meta.description)
    upsertMeta('name', 'twitter:image', image)

    let ld = document.getElementById('vg-route-jsonld')
    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.id = 'vg-route-jsonld'
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graphFor(pathname) })
  }, [pathname])

  return null
}
