/* ─────────────────────────────────────────────────────────────────────────────
   JSON-LD schema builders (AEO backbone). JSX-free so the same functions serve
   the React app AND the prerender post-processor.
───────────────────────────────────────────────────────────────────────────── */
import { SITE_URL, BRAND_NAME, LEGAL_NAME, CONTACT_PHONE_E164, CONTACT_EMAIL, LOGO_PATH, ADDRESS, PRODUCT_CATALOG, SOLUTION_CATALOG, UP_EVENTS, FAQS, PRODUCTS, routeMeta } from './catalog.js'

const abs = (p) => `${SITE_URL}${p.startsWith('/') ? p : `/${p}`}`

export function orgNode() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: abs(LOGO_PATH),
    description: 'Make-in-India air purification company — patented HCAC hybrid HVAC cleaners, UVGI, bipolar ionization and live IAQ monitoring for Delhi NCR and India.',
    foundingDate: '2019',
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_PHONE_E164,
      email: CONTACT_EMAIL,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    sameAs: [
      'https://www.linkedin.com/company/vayuguard',
      'https://www.instagram.com/vayuguard',
      'https://x.com/vayuguard',
      'https://www.youtube.com/@vayuguard',
    ],
  }
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND_NAME,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  }
}

export function localBusinessNode() {
  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: BRAND_NAME,
    image: abs(LOGO_PATH),
    url: SITE_URL,
    telephone: CONTACT_PHONE_E164,
    email: CONTACT_EMAIL,
    priceRange: '₹₹',
    address: { '@type': 'PostalAddress', ...ADDRESS },
    areaServed: ['Delhi NCR', 'India'],
    openingHours: 'Mo-Sa 09:00-19:00',
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  }
}

export function breadcrumbNode(crumbs) {
  const items = (crumbs && crumbs.length ? crumbs : [['Home']]).map(([label, to], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: label,
    ...(to ? { item: abs(to) } : {}),
  }))
  return { '@type': 'BreadcrumbList', itemListElement: items }
}

function productNode(p) {
  return {
    '@type': 'Product',
    '@id': `${SITE_URL}${p.anchors[0]}#product`,
    name: p.name,
    alternateName: p.altNames,
    image: abs(p.image),
    category: p.category,
    description: p.description,
    sku: p.id,
    brand: { '@type': 'Brand', name: BRAND_NAME },
    manufacturer: { '@id': `${SITE_URL}/#organization` },
    countryOfOrigin: 'IN',
    additionalProperty: p.features.map((f) => ({ '@type': 'PropertyValue', name: f })),
    url: abs(p.anchors[0]),
  }
}

export function productNodes() {
  return PRODUCT_CATALOG.map(productNode)
}

export function serviceNodes() {
  return SOLUTION_CATALOG.map((s) => ({
    '@type': 'Service',
    '@id': `${SITE_URL}/solutions#${s.id}`,
    name: s.name,
    description: s.description,
    serviceType: s.name,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'India' },
    url: abs(`/solutions#${s.id}`),
  }))
}

export function eventNodes() {
  return UP_EVENTS.map((e) => ({
    '@type': 'Event',
    name: e.name,
    startDate: `${e.startDate}T10:00+05:30`,
    endDate: `${e.endDate}T18:00+05:30`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: e.venue, address: { '@type': 'PostalAddress', addressLocality: e.city, addressCountry: 'IN' } },
    description: e.body,
    organizer: { '@id': `${SITE_URL}/#organization` },
    url: abs('/events'),
  }))
}

export function faqNode(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function allFaqs() { return FAQS }

/* Legacy-compatible alias (older imports expected `@id` keyed maps). */
export const SCHEMA_NODES = { organization: orgNode, website: websiteNode, localBusiness: localBusinessNode }

/** Per-route @graph: global nodes + page-specific payloads. */
export function graphFor(path) {
  const graph = [orgNode(), websiteNode(), breadcrumbNode(routeMeta(path).crumbs)]
  if (path === '/') {
    graph.push(localBusinessNode())
  } else if (path === '/products') {
    graph.push(...productNodes())
    graph.push(faqNode(FAQS))
  } else if (/^\/products\/[\w-]+$/.test(path)) {
    const product = PRODUCTS.find((item) => path === `/products/${item.id}`)
    const productData = product && PRODUCT_CATALOG.find((item) => item.id === product.id)
    if (productData) graph.push(productNode(productData))
  } else if (path === '/solutions') {
    graph.push(...serviceNodes())
  } else if (path === '/events') {
    graph.push(...eventNodes())
  } else if (path === '/contact') {
    graph.push({ '@type': 'ContactPage', '@id': `${SITE_URL}/contact#contactpage`, name: 'Contact VayuGuard', url: abs('/contact') }, localBusinessNode())
  } else if (path === '/live-aqi') {
    graph.push({ '@type': 'WebPage', '@id': `${SITE_URL}/live-aqi#webpage`, name: 'Live AQI & Indoor Air Quality Dashboard', url: abs('/live-aqi') })
  }
  return graph
}

export function jsonLdScript(path) {
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graphFor(path) })}</script>`
}
