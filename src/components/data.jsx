import { Icon } from './Icon.jsx'

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Live AQI', to: '/live-aqi' },
  {
    label: 'Products',
    to: '/products',
    children: [
      { label: 'HCAC Duct & AHU Cleaners', sub: 'Patented in-duct purification — 1000 to 2000 CFM', to: '/products#hcac-a-1000' },
      { label: 'VayuShield AC Modules', sub: 'Split & cassette AC purification modules', to: '/products#vayushield-split' },
      { label: 'UVGI Systems', sub: 'Upper-room & in-duct UV-C germicidal irradiation', to: '/products#uvgi-duct' },
      { label: 'ANOP / Plasm-ION', sub: 'Bipolar ionization for odour, VOC & microbe control', to: '/products#anop-duct' },
      { label: 'Gas Phase Filtration', sub: 'Activated carbon & chemical media for gases', to: '/products#activated-carbon' },
      { label: 'VayuView IAQ Monitors', sub: 'Live PM2.5, CO₂, TVOC & AQI dashboards', to: '/products#vayuview-indoor' },
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
  { display: 'Advanced', label: 'Pollutant Removal', icon: Icon.Sun },
  { display: 'Trusted', label: 'Installations Across India', icon: Icon.Home },
  { display: 'Patented', label: 'Climate Technologies', icon: Icon.Bulb },
  { display: 'Live', label: 'Air Quality Monitoring', icon: Icon.Chart },
]

export const SOLUTIONS = [
  {
    id: 'homes', kicker: 'Homes & Apartments', title: 'Bedrooms, living rooms & balconies',
    body: 'Winter smog, cooking smoke, dust and pollen — homes face it all. VayuShield turns your existing split or cassette AC into a purifier, while HRAC units cover larger living spaces and VayuView shows you your air quality in real time.',
    points: ['Whisper-quiet night modes for bedrooms', 'No extra remotes — purification rides your AC', 'App dashboard for the whole family'],
    products: ['VayuShield', 'HRAC', 'VayuView'], icon: Icon.Home, a: '#c15235', b: '#5e2416', cta: 'Get a Home Assessment',
  },
  {
    id: 'offices', kicker: 'Offices & Workspaces', title: 'Healthy HVAC for teams & meeting rooms',
    body: 'Clean air is productivity infrastructure. HCAC units treat your entire AHU supply path, ANOP handles meeting-room odours and CO₂ build-up, and live dashboards give facilities teams proof of performance.',
    points: ['Whole-floor coverage from existing ducts', 'Lower sick days and higher focus scores', 'LEED / IGBC-friendly IAQ documentation'],
    products: ['HCAC 1000', 'ANOP', 'VayuView'], icon: Icon.Briefcase, a: '#c65a3c', b: '#57200e', cta: 'Business Enquiries',
  },
  {
    id: 'healthcare', kicker: 'Hospitals & Healthcare', title: 'UVGI-grade air for wards, OTs & ICUs',
    body: 'Healthcare demands germicidal certainty. Upper-room and in-duct UVGI break pathogen DNA/RNA, while HCAC’s washable media keeps filtration continuous even in always-on facilities.',
    points: ['NABH-aligned infection-control support', 'Zero-downtime washable filtration', 'Continuous IAQ logs for audits'],
    products: ['UVGI', 'HCAC CS 1000', 'ANOP'], icon: Icon.Cross, a: '#a8442b', b: '#4a1c10', cta: 'Healthcare Consultation',
  },
  {
    id: 'schools', kicker: 'Schools & Institutes', title: 'Safe classrooms for every season',
    body: 'Children breathe faster and sit closer to the floor, where settled dust resuspends. Our classroom bundles combine in-duct purification, room units and live AQI displays that double as teaching tools.',
    points: ['Per-classroom AQI display boards', 'Budget-friendly phased rollout plans', 'Low-maintenance washable media'],
    products: ['HCAC', 'HRAC', 'VayuView'], icon: Icon.Cap, a: '#cd6042', b: '#7a3a26', cta: 'School Program Enquiry',
  },
  {
    id: 'hospitality', kicker: 'Hotels & Hospitality', title: 'Fresh, odour-free guest experiences',
    body: 'Lobbies, banquet halls and rooms each have their own air signature. ANOP strips smoke and odour molecules from HVAC loops, while VayuShield keeps every room’s AC delivering visibly cleaner air.',
    points: ['Banquet & smoke-zone odour control', 'Discreet, silent in-room operation', 'Guest-facing IAQ badges for marketing'],
    products: ['ANOP', 'VayuShield', 'UVGI'], icon: Icon.Hotel, a: '#b34c31', b: '#5e2416', cta: 'Hospitality Enquiry',
  },
  {
    id: 'industry', kicker: 'Industry & Warehouses', title: 'Dust, fume & odour control at scale',
    body: 'High ceilings, heavy dust loads and shift-based occupancy demand industrial-grade air handling. Our Air Flushing Machines clear post-construction and process dust while HCAC keeps central systems efficient.',
    points: ['Post-construction dust clearance', 'Coil & filter protection reduces O&M costs', 'Worker-safety IAQ compliance reports'],
    products: ['Air Flushing Machine', 'Pre Filter', 'HCAC'], icon: Icon.Industry, a: '#c15235', b: '#3d160c', cta: 'Industrial Solutions',
  },
]

export const EVENTS = {
  upcoming: [
    { day: '18', mon: 'Oct', title: 'Delhi Clean Air Expo 2026', where: 'Pragati Maidan, New Delhi', time: '10:00 AM – 6:00 PM', body: 'Live HCAC demo rig with before/after PM2.5 counters. Our engineering team will size systems for your floor plans on the spot.' },
    { day: '05', mon: 'Nov', title: 'Hospital IAQ & Infection Control Workshop', where: 'Gurugram, Haryana', time: '9:30 AM – 1:30 PM', body: 'A half-day workshop for hospital facility heads on UVGI deployment, NABH-aligned IAQ logs and coil hygiene economics.' },
    { day: '22', mon: 'Nov', title: 'School Air Safety Summit', where: 'Noida, Uttar Pradesh', time: '11:00 AM – 4:00 PM', body: 'For school administrators: phased clean-classroom rollouts, per-class AQI displays and winter-readiness checklists.' },
  ],
  past: [
    { when: 'Mar 2026', title: 'ACREX India', body: 'Showcased the patented HCAC 1000 to thousands of HVAC professionals; pilot agreements signed with facility majors.' },
    { when: 'Jan 2026', title: 'Delhi Smog Response Drive', body: 'Installed dozens of emergency clean-air rooms with NGO partners during the winter peak, monitored live via VayuView.' },
    { when: 'Nov 2025', title: 'IAQ for Industry Conclave', body: 'Presented washable-media economics for industrial parks — significantly lower filter O&M across a multi-year pilot.' },
  ],
}

export const PHONE = '+91 90000 00000'
export const EMAIL = 'hello@vayuguard.com'
export const WHATSAPP = 'https://wa.me/919000000000'
export const SOCIAL = [
  { label:'linkedin', href :'https://www.linkedin.com/company/vayuguard'},
  {label :'instagram', href :"https://www.instagram.com/vayuguard"},
  
]