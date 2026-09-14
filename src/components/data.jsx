import { Icon } from './Icon.jsx'

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Live AQI', to: '/live-aqi' },
  {
    label: 'Products',
    to: '/products',
    children: [
      { label: 'HCAC Hybrid HVAC Cleaners', sub: 'Patented in-duct purification for AHUs & ducts', to: '/products#hcac' },
      { label: 'VayuShield Split & Cassette', sub: 'Purification modules for AC indoor units', to: '/products#vayushield' },
      { label: 'UVGI Systems', sub: 'Upper-room & in-duct UV-C germicidal irradiation', to: '/products#uvgi' },
      { label: 'Plasm-ION Bipolar', sub: 'Ionization for odour, VOC & microbe control', to: '/products#plasm-ion' },
      { label: 'VayuView IAQ Monitors', sub: 'Live PM2.5, CO₂, TVOC & AQI dashboards', to: '/products#monitors' },
    ],
  },
  {
    label: 'Solutions',
    to: '/solutions',
    children: [
      { label: 'Homes & Apartments', sub: 'Clean bedrooms, living rooms & balconies', to: '/solutions#homes' },
      { label: 'Offices & Workspaces', sub: 'Healthy HVAC for teams & meeting rooms', to: '/solutions#offices' },
      { label: 'Hospitals & Healthcare', sub: 'UVGI-grade air for wards, OTs & ICUs', to: '/solutions#healthcare' },
      { label: 'Schools & Institutes', sub: 'Safe classrooms for every season', to: '/solutions#schools' },
      { label: 'Hotels & Hospitality', sub: 'Fresh, odour-free guest experiences', to: '/solutions#hospitality' },
      { label: 'Industry & Warehouses', sub: 'Dust, fume & odour control at scale', to: '/solutions#industry' },
    ],
  },
  { label: 'For Business', to: '/for-business' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]

export const STATS = [
  { value: 99.97, decimals: 2, suffix: '%', label: 'Pollutants Removed', icon: Icon.Sun },
  { value: 500, suffix: '+', label: 'Installations', icon: Icon.Home },
  { value: 10, suffix: '+', label: 'Patented Technologies', icon: Icon.Bulb },
  { value: null, display: '24/7', label: 'Air Quality Monitoring', icon: Icon.Chart },
]

export const PRODUCTS = [
  {
    id: 'hcac', cat: 'hvac', name: 'HCAC 1000 / CS 1000',
    tag: 'Patented • HVAC In-Duct',
    desc: 'Hybrid Central Air Cleaner for AHUs and ducts — washable electro-charged media, low pressure drop, sub-micron capture.',
    specs: ['Washable & reusable filters', 'Low pressure drop filtration', 'Electro-charged media', 'Removes sub-micron pollutants'],
    shape: 'wide',
  },
  {
    id: 'vayushield', cat: 'rooms', name: 'VayuShield',
    tag: 'Split & Cassette AC',
    desc: 'Retractable purification module that fits split and cassette AC indoor units — turns every AC into an air purifier.',
    specs: ['Fits split & cassette indoor units', 'HEPA-grade filtration', 'Tool-less installation', 'Whisper-quiet operation'],
    shape: 'tall',
  },
  {
    id: 'hrac', cat: 'rooms', name: 'HRAC Room Unit',
    tag: 'Hybrid Room Air Cleaner',
    desc: 'Standalone hybrid room air cleaner combining mechanical, electro-charged and UV-C stages for large rooms.',
    specs: ['3-stage hybrid purification', 'Covers up to 600 sq ft', 'Air quality auto-mode', 'Washable pre-filter'],
    shape: 'box',
  },
  {
    id: 'uvgi', cat: 'hvac', name: 'UVGI Systems',
    tag: 'UV-C Germicidal',
    desc: 'Upper Room and Duct Mount UVGI systems use UV-C to break pathogen DNA/RNA — proven kill of viruses, bacteria and fungi.',
    specs: ['Upper Room & Duct Mount types', 'Kills viruses, bacteria & fungi', 'Plug & play installation', 'SHIELD-tested dosage'],
    shape: 'wide',
  },
  {
    id: 'plasm-ion', cat: 'hvac', name: 'ANOP Odour Control',
    tag: 'UL Certified • Bipolar',
    desc: 'Neutralizes odors & VOCs, reduces smoke and microbes, and delivers continuous HVAC in-duct purification with dual-polarity ionization.',
    specs: ['Dual-polarity ionization', 'Neutralizes odors & VOCs', 'Continuous in-duct operation', 'Ozone-safe by design'],
    shape: 'box',
  },
  {
    id: 'monitors', cat: 'monitoring', name: 'VayuView Monitor',
    tag: 'Live IAQ / AQI',
    desc: 'Real-time PM2.5, PM10, CO₂, TVOC, temperature and humidity — with cloud dashboards, alerts and remote control.',
    specs: ['PM2.5 / PM10 / CO₂ / TVOC', 'Cloud dashboard & alerts', 'Wired & wireless variants', 'BMS / API integration'],
    shape: 'box',
  },
  {
    id: 'wearable', cat: 'monitoring', name: 'Plasm-ION Wearable',
    tag: 'Wearable',
    desc: 'Personal ionizer pendant that creates a cleaner breathing zone — ideal for commutes and outdoor exposure.',
    specs: ['Personal clean-air zone', 'USB-C fast charging', 'Ultra-light & silent', 'Zero consumables'],
    shape: 'tall',
  },
  {
    id: 'pre-filter', cat: 'hvac', name: 'Pre Filter',
    tag: 'Pre Filtration',
    desc: 'First line of defense — captures lint, hair and debris, protects downstream filters and improves system performance.',
    specs: ['Captures lint, hair & debris', 'Protects downstream filters', 'Improves system performance', 'Washable, long-life media'],
    shape: 'wide',
  },
  {
    id: 'afm', cat: 'rooms', name: 'Air Flushing Machine',
    tag: 'Heavy Duty',
    desc: 'Indian-patented HEPA-equivalent machine that clears post-construction dust, VOCs and microbes from large volumes.',
    specs: ['HEPA-equivalent filtration', 'Removes PM, VOCs & microbes', 'Clears post-construction dust', 'Large-area coverage'],
    shape: 'box',
  },
]

export const SOLUTIONS = [
  {
    id: 'homes', kicker: 'Homes & Apartments', title: 'Bedrooms, living rooms & balconies',
    body: 'Winter smog, cooking smoke, dust and pollen — homes face it all. VayuShield turns your existing split or cassette AC into a purifier, while HRAC units cover larger living spaces and VayuView shows you the numbers in real time.',
    points: ['Whisper-quiet night modes for bedrooms', 'No extra remotes — purification rides your AC', 'App dashboard for the whole family'],
    products: ['VayuShield', 'HRAC', 'VayuView'], icon: Icon.Home, a: '#0f6f4f', b: '#0b3d2e', cta: 'Get a Home Assessment',
  },
  {
    id: 'offices', kicker: 'Offices & Workspaces', title: 'Healthy HVAC for teams & meeting rooms',
    body: 'Clean air is productivity infrastructure. HCAC units treat your entire AHU supply path, ANOP handles meeting-room odours and CO₂ build-up, and live dashboards give facilities teams proof of performance.',
    points: ['Whole-floor coverage from existing ducts', 'Lower sick days and higher focus scores', 'LEED / IGBC-friendly IAQ documentation'],
    products: ['HCAC 1000', 'ANOP', 'VayuView'], icon: Icon.Briefcase, a: '#14805d', b: '#0a3126', cta: 'Business Enquiries',
  },
  {
    id: 'healthcare', kicker: 'Hospitals & Healthcare', title: 'UVGI-grade air for wards, OTs & ICUs',
    body: 'Healthcare demands germicidal certainty. Upper-room and in-duct UVGI break pathogen DNA/RNA, while HCAC’s washable media keeps filtration continuous even in 24×7 facilities.',
    points: ['NABH-aligned infection-control support', 'Zero-downtime washable filtration', 'Continuous IAQ logs for audits'],
    products: ['UVGI', 'HCAC CS 1000', 'ANOP'], icon: Icon.Cross, a: '#10493a', b: '#082b20', cta: 'Healthcare Consultation',
  },
  {
    id: 'schools', kicker: 'Schools & Institutes', title: 'Safe classrooms for every season',
    body: 'Children breathe faster and sit closer to the floor, where settled dust resuspends. Our classroom bundles combine in-duct purification, room units and live AQI displays that double as teaching tools.',
    points: ['Per-classroom AQI display boards', 'Budget-friendly phased rollout plans', 'Low-maintenance washable media'],
    products: ['HCAC', 'HRAC', 'VayuView'], icon: Icon.Cap, a: '#1d9a6f', b: '#0d5841', cta: 'School Program Enquiry',
  },
  {
    id: 'hospitality', kicker: 'Hotels & Hospitality', title: 'Fresh, odour-free guest experiences',
    body: 'Lobbies, banquet halls and rooms each have their own air signature. ANOP strips smoke and odour molecules from HVAC loops, while VayuShield keeps every room’s AC delivering visibly cleaner air.',
    points: ['Banquet & smoke-zone odour control', 'Discreet, silent in-room operation', 'Guest-facing IAQ badges for marketing'],
    products: ['ANOP', 'VayuShield', 'UVGI'], icon: Icon.Hotel, a: '#0e5c41', b: '#0b3d2e', cta: 'Hospitality Enquiry',
  },
  {
    id: 'industry', kicker: 'Industry & Warehouses', title: 'Dust, fume & odour control at scale',
    body: 'High ceilings, heavy dust loads and shift-based occupancy demand industrial-grade air handling. Our Air Flushing Machines clear post-construction and process dust while HCAC keeps central systems efficient.',
    points: ['Post-construction dust clearance', 'Coil & filter protection reduces O&M costs', 'Worker-safety IAQ compliance reports'],
    products: ['Air Flushing Machine', 'Pre Filter', 'HCAC'], icon: Icon.Industry, a: '#128a60', b: '#082b20', cta: 'Industrial Solutions',
  },
]

export const EVENTS = {
  upcoming: [
    { day: '18', mon: 'Oct', title: 'Delhi Clean Air Expo 2026', where: 'Pragati Maidan, New Delhi', time: '10:00 AM – 6:00 PM', body: 'Live HCAC demo rig with before/after PM2.5 counters. Our engineering team will size systems for your floor plans on the spot.' },
    { day: '05', mon: 'Nov', title: 'Hospital IAQ & Infection Control Workshop', where: 'Gurugram, Haryana', time: '9:30 AM – 1:30 PM', body: 'A half-day workshop for hospital facility heads on UVGI deployment, NABH-aligned IAQ logs and coil hygiene economics.' },
    { day: '22', mon: 'Nov', title: 'School Air Safety Summit', where: 'Noida, Uttar Pradesh', time: '11:00 AM – 4:00 PM', body: 'For school administrators: phased clean-classroom rollouts, per-class AQI displays and winter-readiness checklists.' },
  ],
  past: [
    { when: 'Mar 2026', title: 'ACREX India', body: 'Showcased the patented HCAC 1000 to 12,000+ HVAC professionals; three pilot agreements signed with facility majors.' },
    { when: 'Jan 2026', title: 'Delhi Smog Response Drive', body: 'Installed 40+ emergency clean-air rooms with NGO partners during the winter peak, monitored live via VayuView.' },
    { when: 'Nov 2025', title: 'IAQ for Industry Conclave', body: 'Presented washable-media economics for industrial parks — 38% lower filter O&M across a 2-year pilot.' },
  ],
}

export const PHONE = '+91 90000 00000'
export const EMAIL = 'hello@vayuguard.com'
export const WHATSAPP = 'https://wa.me/919000000000'
