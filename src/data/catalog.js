/* ─────────────────────────────────────────────────────────────────────────────
   SEO catalog + route metadata — JSX-free, importable by Vite config,
   prerender post-processing and React code alike.

   ⚠️ Values marked TODO are placeholders — replace with real business data.
───────────────────────────────────────────────────────────────────────────── */

export const SITE_URL = 'https://www.vayuguard.com' // TODO: real production domain
export const BRAND_NAME = 'VayuGuard'
export const LEGAL_NAME = 'VayuGuard Climate Tech Pvt Ltd'
export const CONTACT_PHONE = '+91 90000 00000' // TODO: real phone
export const CONTACT_PHONE_E164 = '+919000000000' // TODO: real phone, +91XXXXXXXXXX
export const CONTACT_EMAIL = 'hello@vayuguard.com' // TODO: real email
export const WHATSAPP_URL = 'https://wa.me/919000000000' // TODO: real WhatsApp link
export const LOGO_PATH = '/vayuguard-logo.png'
export const OG_IMAGE_PATH = '/hero-video-poster.jpg'

export const ADDRESS = {
  street: '', // TODO: full street address (left empty so UI hides it gracefully until set)
  city: 'New Delhi',
  region: 'Delhi',
  postalCode: '110001', // TODO: real PIN code
  country: 'IN',
}

export const CONTACT = {
  phone: CONTACT_PHONE,
  phoneE164: CONTACT_PHONE_E164,
  email: CONTACT_EMAIL,
  whatsapp: WHATSAPP_URL,
  openingHours: 'Mo-Sa 09:00-19:00', // TODO: real business hours
  address: ADDRESS,
}

/** Social profiles — footer links + Organization.sameAs. TODO: real URLs. */
export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/vayuguard' },
  { label: 'Instagram', href: 'https://www.instagram.com/vayuguard' },
  { label: 'X (Twitter)', href: 'https://x.com/vayuguard' },
  { label: 'YouTube', href: 'https://www.youtube.com/@vayuguard' },
]

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCT CATALOG — single source of truth for the product grid, the hover-
   flip images and the Product JSON-LD schema.

   img    = studio product photo (front face of the flip card)
   appImg = application/installation photo (revealed on hover) — optional
───────────────────────────────────────────────────────────────────────────── */
export const PRODUCTS = [
  /* — For HVAC & Ducts — */
  {
    id: 'hcac-a-1000', cat: 'hvac', name: 'HCAC-A 1000 CFM',
    tag: 'Patented • Duct Mount', category: 'In-duct hybrid central air cleaner (1000 CFM)',
    altNames: ['HCAC 1000', 'Hybrid Central Air Cleaner'],
    desc: 'Patented Hybrid Central Air Cleaner for AHUs and ducts up to 1000 CFM — washable electro-charged media captures sub-micron PM2.5 with minimal pressure drop.',
    specs: ['1000 CFM duct-mounted design', 'Washable electro-charged media', 'Low pressure drop', 'Sub-micron PM2.5 capture'],
    img: '/products/hcac-a-1000.webp', appImg: '/products/hcac-a-1000-app.webp',
    video: '/products/hcac-a-1000-video.mp4',
  },
  {
    id: 'hcac-a-2000', cat: 'hvac', name: 'HCAC-A 2000 CFM',
    tag: 'Patented • Duct Mount', category: 'In-duct hybrid central air cleaner (2000 CFM)',
    altNames: ['HCAC 2000', 'Hybrid Central Air Cleaner'],
    desc: 'The 2000 CFM HCAC for larger AHUs and central plants — doubles clean-air throughput with the same washable, electro-charged low-pressure-drop media.',
    specs: ['2000 CFM duct-mounted design', 'Washable electro-charged media', 'Tool-less media access', 'Sub-micron PM2.5 capture'],
    img: '/products/hcac-a-2000.webp', appImg: '/products/hcac-a-2000-app.webp',
  },
  {
    id: 'hcac-cs-1000', cat: 'hvac', name: 'HCAC-CS 1000 CFM',
    tag: 'Patented • Cassette Style', category: 'Cassette-style hybrid central air cleaner (1000 CFM)',
    altNames: ['HCAC CS 1000', 'Cassette HCAC'],
    desc: 'Cassette-format HCAC that drops into ceiling systems — patented hybrid purification where floor space is scarce and access must stay tool-less.',
    specs: ['1000 CFM cassette format', 'Fits standard ceiling grids', 'Washable electro-charged media', 'Tool-less maintenance'],
    img: '/products/hcac-cs-1000.webp', appImg: '/products/hcac-cs-1000-app.webp',
  },
  {
    id: 'hcac-slim', cat: 'hvac', name: 'HCAC Slim',
    tag: 'Patented • Slim Profile', category: 'Slim-profile in-duct air cleaner',
    altNames: ['HCAC SLIM', 'Slim duct purifier'],
    desc: 'A low-profile HCAC for tight ceilings and shallow ducts — full hybrid purification in a chassis that slips where standard units cannot.',
    specs: ['Ultra-slim duct profile', 'Fits shallow ceiling voids', 'Washable electro-charged media', 'Low pressure drop'],
    img: '/products/hcac-slim.webp', appImg: '/products/hcac-slim-app.webp',
  },
  {
    id: 'fcu-hcac', cat: 'hvac', name: 'FCU-HCAC',
    tag: 'For Fan Coil Units', category: 'Hybrid purification stage for fan coil units',
    altNames: ['FCU air purifier', 'Fan coil unit purifier'],
    desc: 'Hybrid purification sized for fan coil units — brings HCAC-grade air cleaning to hotels, clinics and offices served by FCUs instead of ducted AHUs.',
    specs: ['Sized for standard FCUs', 'Washable electro-charged media', 'Protects coils & filters', 'Low pressure drop'],
    img: '/products/fcu-hcac.webp', appImg: '/products/fcu-hcac-app.webp',
  },
  {
    id: 'csu', cat: 'hvac', name: 'Ceiling Suspended Unit',
    tag: 'Ceiling Suspended', category: 'Ceiling-suspended hybrid air cleaner',
    altNames: ['CSU', 'Suspended air purifier'],
    desc: 'Standalone ceiling-suspended cleaner for halls, showrooms and waiting areas — hybrid multi-stage purification with no floor footprint at all.',
    specs: ['Ceiling-suspended install', 'Large-area coverage', 'Hybrid multi-stage media', 'No floor space needed'],
    img: '/products/csu.webp', appImg: '/products/csu-app.webp',
  },
  {
    id: 'pre-filter', cat: 'hvac', name: 'Pre Filter',
    tag: 'Pre Filtration', category: 'Washable HVAC pre-filtration',
    altNames: ['HVAC pre filter'],
    desc: 'First line of defense — captures lint, hair and debris, protects downstream filters and improves system performance.',
    specs: ['Captures lint, hair & debris', 'Protects downstream filters', 'Improves system performance', 'Washable, long-life media'],
    img: '/products/pre-filter.webp', appImg: null,
  },
  {
    id: 'erv', cat: 'hvac', name: 'Energy Recovery Ventilator',
    tag: 'Fresh Air • ERV', category: 'Energy recovery ventilation (ERV)',
    altNames: ['ERV', 'Energy Recovery Ventilation'],
    desc: 'Brings fresh outdoor air in and pushes stale air out while recovering heat and humidity — healthy ventilation without the energy penalty.',
    specs: ['Sensible & latent heat recovery', 'Continuous fresh-air supply', 'Reduces HVAC load', 'Filter-protected cores'],
    img: '/products/erv.webp', appImg: '/products/erv-app.webp',
  },

  /* — For Rooms & Spaces — */
  {
    id: 'vayushield-split', cat: 'rooms', name: 'VayuShield for Split AC',
    tag: 'Split AC Module', category: 'Purification module for split AC indoor units',
    altNames: ['VayuShield', 'split AC air purifier'],
    desc: 'Retractable purification module that fits inside split AC indoor units — turns the AC you already own into an air purifier with HEPA-grade filtration.',
    specs: ['Fits split AC indoor units', 'HEPA-grade filtration', 'Tool-less installation', 'Whisper-quiet operation'],
    img: '/products/vayushield-split.webp', appImg: '/products/vayushield-split-app.webp',
  },
  {
    id: 'vayushield-cassette', cat: 'rooms', name: 'VayuShield for Cassette AC',
    tag: 'Cassette AC Module', category: 'Purification module for cassette AC indoor units',
    altNames: ['VayuShield cassette', 'cassette AC purifier'],
    desc: 'The VayuShield module engineered for cassette ACs — purification rides your existing ceiling cassette, silent and invisible to the room.',
    specs: ['Fits cassette AC units', 'HEPA-grade filtration', 'Tool-less installation', 'Whisper-quiet operation'],
    img: '/products/vayushield-cassette.webp', appImg: '/products/vayushield-cassette-app.webp',
  },
  {
    id: 'hrac-small', cat: 'rooms', name: 'HRAC S — Small Room',
    tag: 'Hybrid Room Cleaner', category: 'Standalone hybrid room air cleaner (small)',
    altNames: ['HRAC small', 'room air purifier'],
    desc: 'Standalone hybrid room air cleaner for bedrooms and small offices — mechanical, electro-charged and UV-C stages in a compact chassis.',
    specs: ['3-stage hybrid purification', 'Small-room coverage', 'Air quality auto-mode', 'Washable pre-filter'],
    img: '/products/hrac-small.webp', appImg: '/products/hrac-small-app.webp',
  },
  {
    id: 'hrac-medium', cat: 'rooms', name: 'HRAC M — Medium Room',
    tag: 'Hybrid Room Cleaner', category: 'Standalone hybrid room air cleaner (medium)',
    altNames: ['HRAC medium'],
    desc: 'The medium-room HRAC — scaled airflow for living rooms, clinics and classrooms with the same three-stage hybrid purification.',
    specs: ['3-stage hybrid purification', 'Medium-room coverage', 'Air quality auto-mode', 'Washable pre-filter'],
    img: '/products/hrac-medium.webp', appImg: null,
  },
  {
    id: 'hrac-big', cat: 'rooms', name: 'HRAC XL — Large Room',
    tag: 'Hybrid Room Cleaner', category: 'Standalone hybrid room air cleaner (large)',
    altNames: ['HRAC big', 'HRAC XL'],
    desc: 'The flagship HRAC for halls and open offices — maximum clean-air delivery with three hybrid stages and washable long-life media.',
    specs: ['3-stage hybrid purification', 'Large-room coverage', 'Air quality auto-mode', 'Washable pre-filter'],
    img: '/products/hrac-big.webp', appImg: null,
  },
  {
    id: 'kitchen-unit', cat: 'rooms', name: 'Kitchen Air Purifier',
    tag: 'Commercial Kitchens', category: 'Kitchen exhaust air purification',
    altNames: ['kitchen unit', 'kitchen exhaust purifier'],
    desc: 'Cuts smoke, grease-laden vapour and cooking odour from commercial kitchen air — protects staff, diners and neighbouring properties.',
    specs: ['Targets smoke & grease mist', 'Neutralizes cooking odour', 'Protects exhaust systems', 'Serviceable washable stages'],
    img: '/products/kitchen-unit.webp', appImg: '/products/kitchen-unit-app.webp',
  },
  {
    id: 'afm', cat: 'rooms', name: 'Air Flushing Machine',
    tag: 'Heavy Duty', category: 'Heavy-duty post-construction air flushing (HEPA-equivalent)',
    altNames: ['AFM', 'post-construction dust removal'],
    desc: 'Indian-patented HEPA-equivalent machine that clears post-construction dust, VOCs and microbes from large volumes.',
    specs: ['HEPA-equivalent filtration', 'Removes PM, VOCs & microbes', 'Clears post-construction dust', 'Large-area coverage'],
    img: '/products/afm.webp', appImg: '/products/afm-app.webp',
  },

  /* — UVGI & Odour Control — */
  {
    id: 'uvgi-duct', cat: 'germicidal', name: 'Duct Mount UVGI',
    tag: 'In-Duct UV-C', category: 'In-duct UV-C germicidal irradiation',
    altNames: ['duct UVGI', 'in-duct UV-C'],
    desc: 'In-duct UV-C germicidal irradiation that breaks pathogen DNA/RNA as air moves through the HVAC system — silent, continuous disinfection.',
    specs: ['In-duct UV-C emitters', 'Kills viruses, bacteria & fungi', 'SHIELD-tested dosage', 'Plug & play installation'],
    img: '/products/uvgi-duct.webp', appImg: '/products/uvgi-duct-app.webp',
  },
  {
    id: 'uvgi-upper', cat: 'germicidal', name: 'Upper Room UVGI',
    tag: 'Occupied Spaces', category: 'Upper-room UV-C germicidal irradiation',
    altNames: ['upper-room UV', 'upper room UVGI'],
    desc: 'Upper-room UVGI disinfects occupied spaces continuously — air circulates through the UV-C zone above head height while people stay below it.',
    specs: ['Upper-room UV-C emitters', 'Safe for occupied rooms', 'Kills airborne pathogens', 'SHIELD-tested dosage'],
    img: '/products/uvgi-upper.webp', appImg: null,
  },
  {
    id: 'anop-duct', cat: 'germicidal', name: 'ANOP In-Duct',
    tag: 'UL Certified • Bipolar', category: 'In-duct bipolar ionization odour control',
    altNames: ['ANOP', 'Plasm-ION in-duct'],
    desc: 'ANOP in-duct bipolar ionization neutralizes odours, VOCs and smoke inside HVAC loops — continuous, ozone-safe operation.',
    specs: ['Dual-polarity ionization', 'Neutralizes odors & VOCs', 'Continuous in-duct operation', 'Ozone-safe by design'],
    img: '/products/anop-duct.webp', appImg: '/products/anop-duct-app.webp',
  },
  {
    id: 'anop-candle', cat: 'germicidal', name: 'ANOP Candle Unit',
    tag: 'Standalone Ionization', category: 'Standalone bipolar ionization odour control unit',
    altNames: ['ANOP candle', 'standalone ionizer'],
    desc: 'The candle-shaped standalone ANOP — bipolar ionization for washrooms, meeting rooms and small spaces, no ductwork required.',
    specs: ['Standalone bipolar ionizer', 'Neutralizes odours & VOCs', 'Compact candle design', 'Zero consumables'],
    img: '/products/anop-candle.webp', appImg: '/products/anop-candle-app.webp',
  },
  {
    id: 'anob', cat: 'germicidal', name: 'ANOB Cabinet Unit',
    tag: 'Bipolar • Cabinet', category: 'Cabinet-style bipolar ionization unit',
    altNames: ['ANOB'],
    desc: 'Cabinet-format bipolar ionization for larger rooms and zoned HVAC — concentrated odour, VOC and microbe control where ducts cannot reach.',
    specs: ['Cabinet bipolar ionization', 'Zoned odour & VOC control', 'UL-certified module', 'Ozone-safe by design'],
    img: '/products/anob.webp', appImg: '/products/anob-app.webp',
  },
  {
    id: 'plasm-ion', cat: 'germicidal', name: 'Plasm-ION Bipolar',
    tag: 'UL Certified', category: 'Bipolar ionization module',
    altNames: ['Plasm-ION', 'bipolar ionization'],
    desc: 'UL-certified Plasm-ION bipolar ionization — ions cluster around PM0.1, VOCs and odour molecules, dropping them out of the air you breathe.',
    specs: ['Dual-polarity ionization', 'Targets PM0.1, VOCs & odour', 'Continuous operation', 'Ozone-safe by design'],
    img: '/products/plasm-ion.webp', appImg: '/products/plasm-ion-app.webp',
    video: '/products/plasm-ion-video.mp4',
  },
  {
    id: 'plasm-ion-wearable', cat: 'germicidal', name: 'Plasm-ION Wearable',
    tag: 'Wearable', category: 'Personal clean-air wearable',
    altNames: ['ionizer pendant', 'wearable air purifier'],
    desc: 'Personal ionizer pendant that creates a cleaner breathing zone — ideal for commutes and outdoor exposure.',
    specs: ['Personal clean-air zone', 'USB-C fast charging', 'Ultra-light & silent', 'Zero consumables'],
    img: '/products/plasm-ion-wearable.webp', appImg: '/products/plasm-ion-wearable-app.webp',
  },

  /* — Gas Phase Filtration — */
  {
    id: 'activated-carbon', cat: 'gas-phase', name: 'Activated Carbon Filter',
    tag: 'Odour & VOC Removal', category: 'Activated carbon gas-phase filter',
    altNames: ['carbon filter', 'VOC filter'],
    desc: 'Activated carbon media adsorbs odours, VOCs and reactive gases — the workhorse gas-phase stage for AHUs and dedicated fresh-air systems.',
    specs: ['Adsorbs odours & VOCs', 'Wide-spectrum gas capture', 'AHU / FAU compatible', 'Replaceable carbon cassettes'],
    img: '/products/activated-carbon.webp', appImg: '/products/activated-carbon-app.webp',
  },
  {
    id: 'granular-carbon', cat: 'gas-phase', name: 'Granular Carbon Filter',
    tag: 'Deep Gas Phase', category: 'Granular activated carbon gas-phase filter',
    altNames: ['granular carbon', 'deep-bed carbon'],
    desc: 'Deep-bed granular carbon for heavy gas loads — long residence time strips industrial odours and corrosive gases before they reach people or coils.',
    specs: ['Deep-bed granular media', 'High gas-holding capacity', 'Targets corrosive gases', 'Long service intervals'],
    img: '/products/granular-carbon.webp', appImg: '/products/granular-carbon-app.webp',
  },
  {
    id: 'chemical-gas-phase', cat: 'gas-phase', name: 'Chemical & Gas Phase Filtration',
    tag: 'Industrial Gases', category: 'Chemical gas-phase filtration systems',
    altNames: ['chemical filtration', 'gas phase filter'],
    desc: 'Impregnated chemical media engineered for specific industrial gases — SO₂, NOₓ, H₂S and ammonia captured before they harm people or processes.',
    specs: ['Impregnated chemical media', 'Targets SO₂, NOₓ, H₂S, NH₃', 'Custom-engineered blends', 'Staged multi-pass design'],
    img: '/products/chemical-gas-phase.webp', appImg: '/products/chemical-gas-phase-app.webp',
  },
  {
    id: 'v-shape-absorber', cat: 'gas-phase', name: 'V-Shape Absorber',
    tag: 'AHU Cassette', category: 'V-formation gas-phase absorber for AHUs',
    altNames: ['V shape absorber', 'AHU carbon cassette'],
    desc: 'V-formation absorber cassettes that maximize media area inside standard AHU sections — more gas-phase capacity in the same footprint.',
    specs: ['V-formation media panels', 'Maximum surface area', 'Fits standard AHU sections', 'Fast cassette change-out'],
    img: '/products/v-shape-absorber.webp', appImg: '/products/v-shape-absorber-app.webp',
  },

  /* — Monitoring & Software — */
  {
    id: 'vayuview-indoor', cat: 'monitoring', name: 'VayuView Indoor Monitor',
    tag: 'IAQ Monitor', category: 'Indoor air quality monitor',
    altNames: ['VayuView', 'IAQ monitor'],
    desc: 'Real-time indoor PM2.5, PM10, CO₂, TVOC, temperature and humidity — wall-mounted monitor with cloud dashboards, alerts and BMS/API integration.',
    specs: ['PM2.5 / PM10 / CO₂ / TVOC', 'Cloud dashboard & alerts', 'Wired & wireless variants', 'BMS / API integration'],
    img: '/products/vayuview-indoor.webp', appImg: '/products/vayuview-indoor-app.webp',
  },
  {
    id: 'vayuview-outdoor', cat: 'monitoring', name: 'VayuView Outdoor Monitor',
    tag: 'Ambient AQI', category: 'Outdoor ambient air quality monitor',
    altNames: ['outdoor AQI monitor'],
    desc: 'Weatherproof ambient AQI monitor for campuses, townships and industrial boundaries — feed site-wide dashboards and compliance reports.',
    specs: ['Ambient PM2.5 / PM10 / gases', 'Weatherproof enclosure', 'Campus & township networks', 'Compliance-ready reports'],
    img: '/products/vayuview-outdoor.webp', appImg: '/products/vayuview-outdoor-app.webp',
  },
  {
    id: 'vayuview-dashboard', cat: 'monitoring', name: 'VayuView Cloud Dashboard',
    tag: 'Software • Alerts', category: 'IAQ cloud dashboard and alerting software',
    altNames: ['VayuView dashboard', 'IAQ software'],
    desc: 'The VayuView cloud console — every unit, every site, one dashboard with live trends, threshold alerts, AMC logs and exportable IAQ reports.',
    specs: ['Multi-site live dashboard', 'Threshold alerts & logs', 'LEED/IGBC/NABH exports', 'BMS / API integration'],
    img: '/products/vayuview-dashboard.webp', appImg: '/products/vayuview-dashboard-app.webp',
  },

  /* — Specialized — */
  {
    id: 'hemac-stp', cat: 'specialized', name: 'HEMAC STP Solution',
    tag: 'STP Odour Control', category: 'Odour control for sewage treatment plants',
    altNames: ['HEMAC', 'STP odour control'],
    desc: 'Purpose-built purification for sewage treatment plant (STP) air — neutralizes odour and harmful gases at the source, before they reach neighbours.',
    specs: ['STP-specific engineering', 'Neutralizes H₂S & organic odour', 'Ducted source capture', 'Corrosion-resistant build'],
    img: '/products/hemac-stp.webp', appImg: null,
  },
]

/* Quote-modal gallery extras: two detail crops per product, generated from
   the studio photos by scripts/make-quote-gallery.mjs. */
for (const p of PRODUCTS) {
  p.detail1 = `/products/${p.id}-detail-1.webp`
  p.detail2 = `/products/${p.id}-detail-2.webp`
  /* Gallery video: generated slideshow for every product unless the entry
     carries real footage (see scripts/make-product-videos.mjs). */
  p.video = p.video || `/products/${p.id}-video.mp4`
}

/* Product JSON-LD derives from the same list — no duplicated copy. */
export const PRODUCT_CATALOG = PRODUCTS.map((p) => ({
  id: p.id,
  name: `VayuGuard ${p.name}`,
  altNames: p.altNames,
  category: p.category,
  description: p.desc,
  features: p.specs,
  image: p.img,
  anchors: [`/products/${p.id}`],
}))

/* ── Solutions as services (JSON-LD + llms.txt) ── */
export const SOLUTION_CATALOG = [
  { id: 'homes', name: 'Home & Apartment Air Purification', description: 'VayuShield modules, HRAC room units and VayuView dashboards that keep bedrooms, living rooms and balconies clean through Delhi NCR winters.' },
  { id: 'offices', name: 'Office & Workspace Air Purification', description: 'HCAC in-duct purification across AHUs, ANOP odour control and live IAQ dashboards for healthy, productive offices.' },
  { id: 'healthcare', name: 'Hospital & Healthcare Air Purification', description: 'Upper-room and in-duct UVGI plus washable HCAC filtration for NABH-aligned infection control in wards, OTs and ICUs.' },
  { id: 'schools', name: 'School & Institute Air Purification', description: 'Phased clean-classroom rollouts with in-duct purification, room units and per-classroom AQI displays.' },
  { id: 'hospitality', name: 'Hotel & Hospitality Air Purification', description: 'ANOP smoke and odour control for HVAC loops plus discreet VayuShield in-room purification for fresh guest experiences.' },
  { id: 'industry', name: 'Industrial & Warehouse Air Purification', description: 'Air Flushing Machines and HCAC systems for dust, fume and odour control in high-ceiling industrial spaces.' },
]

/* ── FAQs — answer-first copy for FAQPage schema, FAQ sections and llms.txt.
      Each answer stands alone: who, what, how — no dangling pronouns. ── */
export const FAQS = [
  {
    q: 'What is the VayuGuard HCAC and how does it work?',
    a: 'The VayuGuard HCAC (Hybrid Central Air Cleaner) is a patented, made-in-India purification stage installed inside AHUs and HVAC ducts. Air passes through washable electro-charged media that captures sub-micron particles like PM2.5 with very low pressure drop, so the entire building breathes filtered air from one central system — no disposable filters and no room-by-room units.',
  },
  {
    q: 'Does VayuShield work with my existing split or cassette AC?',
    a: 'Yes. VayuShield is a retractable purification module designed for standard split and cassette AC indoor units. It installs tool-less in minutes, adds HEPA-grade filtration to the AC airflow, and runs whisper-quiet — turning the AC you already own into an air purifier.',
  },
  {
    q: 'How does UVGI kill airborne pathogens?',
    a: 'VayuGuard UVGI systems expose air to UV-C light at germicidal wavelengths, which breaks the DNA/RNA of viruses, bacteria and fungi so they cannot replicate. Upper-room units disinfect occupied spaces continuously, while in-duct versions treat air moving through HVAC systems. Dosages are validated by SHIELD testing.',
  },
  {
    q: 'Do VayuGuard systems need filter replacement?',
    a: 'The core HCAC media is washable and reusable — you rinse it on a schedule instead of buying replacement filters, which keeps operating costs low and avoids disposable-filter waste. Room units use a washable pre-filter plus long-life stages; VayuView monitoring alerts you when any stage needs attention.',
  },
  {
    q: 'Which spaces does VayuGuard serve?',
    a: 'VayuGuard serves homes and apartments, offices and workspaces, hospitals and healthcare facilities, schools and institutes, hotels, and industrial sites across Delhi NCR and India — with engineered sizing for each space, occupancy and usage pattern.',
  },
  {
    q: 'How much does a VayuGuard system cost?',
    a: 'Pricing depends on the space and system configuration. VayuGuard provides free site assessments across Delhi NCR — engineers measure baseline PM2.5, CO₂ and airflow, then quote within 48 hours. Use the contact form or WhatsApp to book an assessment.',
  },
  {
    q: 'Can VayuGuard show proof that the air is actually cleaner?',
    a: 'Yes. Every deployment includes live IAQ monitoring via VayuView — real-time PM2.5, PM10, CO₂ and TVOC on cloud dashboards with alerts and reports, so facilities teams and families see measured before/after results, not promises.',
  },
  {
    q: 'Where is VayuGuard based and do you install outside Delhi NCR?',
    a: 'VayuGuard Climate Tech Pvt Ltd is based in New Delhi, Delhi NCR, India. Free site assessments cover Delhi NCR, and installations ship across India — contact the team with your location and floor plan for a scoped rollout.',
  },
]

export const FAQS_HOME = FAQS.slice(0, 4)

/* ── Upcoming events (structured data mirrors data.jsx EVENTS.upcoming) ── */
export const UP_EVENTS = [
  { name: 'Delhi Clean Air Expo 2026', startDate: '2026-10-18', endDate: '2026-10-18', time: '10:00 AM – 6:00 PM', venue: 'Pragati Maidan', city: 'New Delhi', body: 'Live HCAC demo rig with before/after PM2.5 counters. Our engineering team will size systems for your floor plans on the spot.' },
  { name: 'Hospital IAQ & Infection Control Workshop', startDate: '2026-11-05', endDate: '2026-11-05', time: '9:30 AM – 1:30 PM', venue: 'Gurugram', city: 'Gurugram', body: 'A half-day workshop for hospital facility heads on UVGI deployment, NABH-aligned IAQ logs and coil hygiene economics.' },
  { name: 'School Air Safety Summit', startDate: '2026-11-22', endDate: '2026-11-22', time: '11:00 AM – 4:00 PM', venue: 'Noida', city: 'Noida', body: 'For school administrators: phased clean-classroom rollouts, per-class AQI displays and winter-readiness checklists.' },
]

/* ── Per-route meta: title / description / canonical / OG / breadcrumbs ── */
export const ROUTE_META = {
  '/': {
    title: 'Air Purifiers & Indoor Air Quality Solutions in India | VayuGuard',
    description: 'Make-in-India air purifiers: patented HCAC hybrid HVAC cleaners, UVGI, Plasm-ION and live IAQ monitors for homes, offices, hospitals and schools across Delhi NCR and India.',
    crumbs: [['Home']],
  },
  '/products': {
    title: 'Air Purifier Products — HVAC, Room & Monitoring | VayuGuard',
    description: 'Explore VayuGuard air purification products: HCAC in-duct HVAC cleaners, VayuShield split-AC modules, UVGI systems, Plasm-ION, IAQ monitors and industrial air flushers.',
    crumbs: [['Home', '/'], ['Products']],
  },
  '/solutions': {
    title: 'Clean Air Solutions for Homes, Offices, Hospitals & Schools | VayuGuard',
    description: 'Engineered air purification for every environment — VayuGuard sizes hybrid HVAC and room systems for homes, offices, hospitals, schools, hotels and industry across India.',
    crumbs: [['Home', '/'], ['Solutions']],
  },
  '/about': {
    title: 'About VayuGuard — Make-in-India Climate Tech, Patented HCAC',
    description: 'VayuGuard is a New Delhi climate-tech company founded by HVAC engineers — patented HCAC hybrid purification, UVGI and live IAQ monitoring engineered for Indian air.',
    crumbs: [['Home', '/'], ['About']],
  },
  '/live-aqi': {
    title: 'Live AQI & Indoor Air Quality Dashboard for Delhi NCR | VayuGuard',
    description: 'Check live Delhi NCR outdoor AQI and indoor PM2.5, PM10, CO₂ and TVOC readings from the VayuView monitor network — the dashboard included with every VayuGuard deployment.',
    crumbs: [['Home', '/'], ['Live AQI']],
  },
  '/for-business': {
    title: 'Commercial Air Purification & IAQ Programs for Business | VayuGuard',
    description: 'VayuGuard for business: site audits, phased rollouts, central IAQ dashboards, LEED/IGBC/NABH documentation and AMC with SLAs for campuses, hospitals, schools and industry.',
    crumbs: [['Home', '/'], ['For Business']],
  },
  '/events': {
    title: 'Events & Exhibitions — Meet VayuGuard | Clean Air India',
    description: 'Meet VayuGuard at clean-air trade shows, workshops and live demos across Delhi NCR and India — see HCAC and UVGI systems running with live PM2.5 counters.',
    crumbs: [['Home', '/'], ['Events']],
  },
  '/contact': {
    title: 'Contact VayuGuard — Free Air Quality Consultation Delhi NCR',
    description: 'Book a free site assessment anywhere in Delhi NCR. VayuGuard engineers respond within 48 hours — phone, WhatsApp, email or the enquiry form.',
    crumbs: [['Home', '/'], ['Contact']],
  },
}

export const DEFAULT_META = ROUTE_META['/']

/* Flat nav for sitemap generation (order = priority). */
export const NAV_ROUTES = [
  ['/', 'Home'],
  ['/products', 'Products'],
  ['/solutions', 'Solutions'],
  ['/about', 'About'],
  ['/live-aqi', 'Live AQI'],
  ['/for-business', 'For Business'],
  ['/events', 'Events'],
  ['/contact', 'Contact'],
]

export const SEO_ROUTES = [
  ...NAV_ROUTES,
  ...PRODUCTS.map((product) => [`/products/${product.id}`, product.name]),
]

export function routeMeta(path) {
  const productMatch = path.match(/^\/products\/([\w-]+)$/)
  const product = productMatch && PRODUCTS.find((item) => item.id === productMatch[1])
  if (product) {
    return {
      title: `${product.name} — ${product.category} | VayuGuard`,
      description: product.desc,
      crumbs: [['Home', '/'], ['Products', '/products'], [product.name]],
    }
  }
  return ROUTE_META[path] || DEFAULT_META
}
