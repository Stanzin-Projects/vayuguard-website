/* Central icon set — inline SVGs so no icon library is needed */
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Icon = {
  Leaf: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <defs>
        <linearGradient id="vg-leaf-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffc9ba" />
          <stop offset="55%" stopColor="#e07657" />
          <stop offset="100%" stopColor="#b8492e" />
        </linearGradient>
        <linearGradient id="vg-leaf-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* stem */}
      <path d="M12.7 21.2 11.6 13.6" stroke="#61290f" strokeWidth="1.1" strokeLinecap="round" />
      {/* blade */}
      <path
        d="M11.6 13.6C11.2 8.4 14.2 3.4 19.9 2.1c.9 3.6-.2 8.3-3.3 11.3-2 1.9-4 2.1-5 .2Z"
        fill="url(#vg-leaf-grad)"
      />
      {/* sheen */}
      <path
        d="M11.6 13.6C11.2 8.4 14.2 3.4 19.9 2.1c.9 3.6-.2 8.3-3.3 11.3-2 1.9-4 2.1-5 .2Z"
        fill="url(#vg-leaf-sheen)"
      />
      {/* midrib + veins */}
      <path
        d="M11.6 13.6C13.8 12.9 16.4 11.6 18.6 9.5M13 10.7c1-.2 2-.6 2.9-1.3M13.9 8c.8-.2 1.6-.5 2.3-1M14.7 5.4c.7-.2 1.4-.5 2-.9"
        stroke="#61290f"
        strokeOpacity="0.45"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={2.2} {...p}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
  ),
  Chat: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 21l2-4.9a8.4 8.4 0 1 1 16-4.6Z" /></svg>
  ),
  WhatsApp: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.94 1.35-.5.05-.98.23-3.3-.69-2.78-1.1-4.55-3.95-4.69-4.13-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.3.24-.27.53-.34.7-.34h.5c.16 0 .38-.06.6.45.24.55.8 1.9.87 2.04.07.14.11.3.02.48-.09.19-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.27.72 1.19 1.55 1.93.93.83 1.72 1.09 1.96 1.21.24.12.39.1.53-.06.14-.16.62-.72.78-.97.17-.24.33-.2.56-.12.23.09 1.45.68 1.7.8.24.12.4.18.46.28.06.1.06.59-.18 1.27Z" /></svg>
  ),
  Caret: (p) => (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={2.4} {...p}><path d="m6 9 6 6 6-6" /></svg>
  ),
  Mountain: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="m8 3 4 8 5-5 5 15H2L8 3Z" /></svg>
  ),
  Filter: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z" /></svg>
  ),
  Bolt: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 3 5 6v5c0 4.4 3 8.4 7 9.5 4-1.1 7-5.1 7-9.5V6l-7-3Z" /><path d="m9.5 11.5 2 2 3.5-3.5" /></svg>
  ),
  Sun: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></svg>
  ),
  Home: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M3 21V8l9-5 9 5v13" /><path d="M9 21v-6h6v6" /></svg>
  ),
  Chart: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="m3 12 4-4 5 5 4-4 5 5" /><path d="M3 18h18" /></svg>
  ),
  Bulb: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10.5c-.6.6-1 1.4-1 2.5h-6c0-1.1-.4-1.9-1-2.5A6 6 0 0 1 12 3Z" /></svg>
  ),
  Target: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="m14.5 9.5-1.2 3.8-3.8 1.2 1.2-3.8 3.8-1.2Z" /></svg>
  ),
  Pulse: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M3 12h4l2-5 4 10 2-5h6" /></svg>
  ),
  Ion: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>
  ),
  Bell: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M10.3 21a2 2 0 0 0 3.4 0" /></svg>
  ),
  Monitor: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 21h8M12 18v3" /></svg>
  ),
  Briefcase: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" /></svg>
  ),
  Cross: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 4v16M4 12h16" /><rect x="3" y="3" width="18" height="18" rx="4" /></svg>
  ),
  Cap: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" /></svg>
  ),
  Hotel: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" /></svg>
  ),
  Industry: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M2 20h20M4 20V9l5 3V9l5 3V7l6 4v9" /></svg>
  ),
  Heart: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" /></svg>
  ),
  Recycle: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M7 19H4.8a1.6 1.6 0 0 1-1.4-2.4L7 10M17 19h2.2a1.6 1.6 0 0 0 1.4-2.4L17 10M12 3l3 5h-6l3-5ZM12 21l-3-5h6l-3 5Z" /></svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
  ),
  Pin: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
  Phone: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" /></svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={2.5} {...p}><path d="m5 13 4 4L19 7" /></svg>
  ),
  Users: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ),
  Wrench: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M14.7 6.3a5 5 0 0 0-7.07 7.07l-4.3 4.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l4.3-4.3a5 5 0 0 0 7.07-7.07Z" /></svg>
  ),
  Trend: (p) => (
    <svg viewBox="0 0 24 24" {...base} {...p}><path d="M3 3v18h18" /><path d="m7 15 4-6 4 3 5-8" /></svg>
  ),
  LinkedIn: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.16h4.52V23H.24V8.16Zm7.44 0h4.33v2.03h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.92V23h-4.5v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V23H7.68V8.16Z" /></svg>
  ),
  Instagram: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.05a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm0 11.13a4.38 4.38 0 1 1 0-8.76 4.38 4.38 0 0 1 0 8.76Zm7.18-11.4a1.58 1.58 0 1 1-3.15 0 1.58 1.58 0 0 1 3.15 0Z" /></svg>
  ),
  X: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.9-6.4L6.5 22H3.35l7.24-8.28L2.4 2h6.4l4.42 5.85L18.9 2Zm-1.1 18.1h1.73L7.9 3.8H6.04L17.8 20.1Z" /></svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={2.2} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
  ),
  YouTube: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" /></svg>
  ),
}

export const BrandMark = ({ className = 'h-11 w-auto' }) => (
  <img
    src="/vayuguard-logo.png"
    alt="VayuGuard — Innovation. Wellbeing. Sustainability."
    className={`block ${className}`}
    draggable={false}
  />
)
