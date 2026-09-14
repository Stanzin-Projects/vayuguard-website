/* VayuGuard — shared behaviour: header/footer injection, dropdowns, mobile nav, reveal-on-scroll */

document.addEventListener("DOMContentLoaded", () => {
  injectChrome();
  initMobileNav();
  initReveal();
  initCounters();
});

/* ---------- Header + Footer ---------- */
function injectChrome() {
  const header = document.querySelector(".site-header");
  if (header) {
    header.innerHTML = `
      <div class="container header-inner">
        <a href="index.html" class="brand" aria-label="VayuGuard home">
          ${brandMark()}
          <span class="brand-text">
            <span class="brand-name">VayuGuard<sup>®</sup></span>
            <span class="brand-tag">Guarding You, Guarding Tomorrow.</span>
          </span>
        </a>

        <ul class="main-nav" id="mainNav">
          <li data-page="index"><a href="index.html">Home</a></li>
          <li data-page="about"><a href="about.html">About</a></li>
          <li data-page="live-aqi"><a href="live-aqi.html">Live AQI</a></li>
          <li data-page="products" class="has-dropdown">
            <a href="products.html">Products <svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg></a>
            <div class="dropdown">
              <a href="products.html#hcac"><strong>HCAC Hybrid HVAC Cleaners</strong><span>Patented in-duct purification for AHUs &amp; ducts</span></a>
              <a href="products.html#vayushield"><strong>VayuShield Split &amp; Cassette</strong><span>Purification modules for AC indoor units</span></a>
              <a href="products.html#uvgi"><strong>UVGI Systems</strong><span>Upper-room &amp; in-duct UV-C germicidal irradiation</span></a>
              <a href="products.html#plasm-ion"><strong>Plasm-ION Bipolar</strong><span>Ionization for odour, VOC &amp; microbe control</span></a>
              <a href="products.html#monitors"><strong>VayuView IAQ Monitors</strong><span>Live PM2.5, CO₂, TVOC &amp; AQI dashboards</span></a>
              <div class="dropdown-note">Not sure what fits your site? <a href="contact.html" style="color:var(--green-700);font-weight:700">Get a free consultation →</a></div>
            </div>
          </li>
          <li data-page="solutions" class="has-dropdown">
            <a href="solutions.html">Solutions <svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg></a>
            <div class="dropdown">
              <a href="solutions.html#homes"><strong>Homes &amp; Apartments</strong><span>Clean bedrooms, living rooms &amp; balconies</span></a>
              <a href="solutions.html#offices"><strong>Offices &amp; Workspaces</strong><span>Healthy HVAC for teams &amp; meeting rooms</span></a>
              <a href="solutions.html#healthcare"><strong>Hospitals &amp; Healthcare</strong><span>UVGI-grade air for wards, OTs &amp; ICUs</span></a>
              <a href="solutions.html#schools"><strong>Schools &amp; Institutes</strong><span>Safe classrooms for every season</span></a>
              <a href="solutions.html#hospitality"><strong>Hotels &amp; Hospitality</strong><span>Fresh, odour-free guest experiences</span></a>
              <a href="solutions.html#industry"><strong>Industry &amp; Warehouses</strong><span>Dust, fume &amp; odour control at scale</span></a>
            </div>
          </li>
          <li data-page="for-business"><a href="for-business.html">For Business</a></li>
          <li data-page="events"><a href="events.html">Events</a></li>
          <li data-page="contact"><a href="contact.html">Contact</a></li>
        </ul>

        <div class="header-cta">
          <a class="whatsapp-btn" href="https://wa.me/919000000000" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.94 1.35-.5.05-.98.23-3.3-.69-2.78-1.1-4.55-3.95-4.69-4.13-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.3.24-.27.53-.34.7-.34h.5c.16 0 .38-.06.6.45.24.55.8 1.9.87 2.04.07.14.11.3.02.48-.09.19-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.27.72 1.19 1.55 1.93.93.83 1.72 1.09 1.96 1.21.24.12.39.1.53-.06.14-.16.62-.72.78-.97.17-.24.33-.2.56-.12.23.09 1.45.68 1.7.8.24.12.4.18.46.28.06.1.06.59-.18 1.27Z"/></svg>
            WhatsApp
          </a>
          <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;

    const page = (document.body.dataset.page || "").toLowerCase();
    const active = header.querySelector(`li[data-page="${page}"]`);
    if (active) active.classList.add("active");
  }

  const footer = document.querySelector(".site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="brand">
              ${brandMark(true)}
              <span class="brand-text">
                <span class="brand-name">VayuGuard<sup>®</sup></span>
                <span class="brand-tag">Guarding You, Guarding Tomorrow.</span>
              </span>
            </a>
            <p>Make-in-India hybrid air purification — HCAC HVAC cleaners, UVGI, Plasm-ION and live IAQ monitoring for Delhi NCR and beyond.</p>
            <div class="footer-social">
              <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.16h4.52V23H.24V8.16Zm7.44 0h4.33v2.03h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.92V23h-4.5v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V23H7.68V8.16Z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.05a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm0 11.13a4.38 4.38 0 1 1 0-8.76 4.38 4.38 0 0 1 0 8.76Zm7.18-11.4a1.58 1.58 0 1 1-3.15 0 1.58 1.58 0 0 1 3.15 0Z"/></svg></a>
              <a href="#" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.9-6.4L6.5 22H3.35l7.24-8.28L2.4 2h6.4l4.42 5.85L18.9 2Zm-1.1 18.1h1.73L7.9 3.8H6.04L17.8 20.1Z"/></svg></a>
              <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z"/></svg></a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Products</h4>
            <ul>
              <li><a href="products.html#hcac">HCAC Hybrid HVAC</a></li>
              <li><a href="products.html#vayushield">VayuShield AC Units</a></li>
              <li><a href="products.html#uvgi">UVGI Systems</a></li>
              <li><a href="products.html#plasm-ion">Plasm-ION Bipolar</a></li>
              <li><a href="products.html#monitors">VayuView Monitors</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="solutions.html">Solutions</a></li>
              <li><a href="for-business.html">For Business</a></li>
              <li><a href="events.html">Events</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Get in Touch</h4>
            <div class="footer-contact">
              <a href="tel:+919000000000"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/></svg> +91 90000 00000</a>
              <a href="mailto:hello@vayuguard.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg> hello@vayuguard.com</a>
              <a href="contact.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> New Delhi, Delhi NCR, India</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} VayuGuard Climate Tech Pvt Ltd. All rights reserved.</span>
          <span>Guarding You, Guarding Tomorrow. <a href="index.html">vayuguard.com</a></span>
        </div>
      </div>
    `;
  }
}

function brandMark(light) {
  const stroke = light ? "#ffffff" : "#0f6f4f";
  return `
  <svg class="brand-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="44" height="44" rx="12" fill="${light ? "rgba(255,255,255,0.1)" : "#e6f4ec"}"/>
    <path d="M13 14h22L24.5 34 13 14Z" stroke="${stroke}" stroke-width="2.6" stroke-linejoin="round" fill="none"/>
    <path d="M18.5 14 24.5 25l6-11" stroke="${stroke}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M24.5 34v-9" stroke="${stroke}" stroke-width="2.6" stroke-linecap="round"/>
  </svg>`;
}

/* ---------- Mobile nav ---------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  nav.querySelectorAll(".has-dropdown > a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.matchMedia("(max-width: 960px)").matches && link.getAttribute("href").includes("#") === false) {
        // allow navigation on desktop; on mobile first tap opens the submenu
        const li = link.parentElement;
        if (!li.classList.contains("open")) {
          e.preventDefault();
          li.classList.add("open");
        }
      }
    });
  });
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const els = [...document.querySelectorAll(".reveal")];
  if (!els.length) return;

  const inView = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.92 && r.bottom > 0;
  };
  const show = (el) => el.classList.add("visible");

  // Reveal anything already in the viewport right away.
  els.forEach((el) => { if (inView(el)) { show(el); } });

  let pending = els.filter((el) => !el.classList.contains("visible"));
  if (!pending.length) return;

  // Scroll fallback (also covers environments where IO events don't fire).
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      pending = pending.filter((el) => {
        if (inView(el)) { show(el); return false; }
        return true;
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // IntersectionObserver as the primary driver where supported.
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            pending = pending.filter((el) => el !== entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    pending.forEach((el) => io.observe(el));
  }
}

/* ---------- Animated counters ---------- */
function initCounters() {
  const counters = [...document.querySelectorAll("[data-count]")];
  if (!counters.length) return;

  const animate = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split(".")[1] || "").length;
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const inView = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  };

  // Safety net: animate anything still pending shortly after load.
  setTimeout(() => counters.forEach((el) => { if (inView(el)) animate(el); }), 600);
  window.addEventListener("scroll", () => counters.forEach((el) => { if (inView(el)) animate(el); }), { passive: true, once: false });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => io.observe(el));
  } else {
    counters.forEach(animate);
  }
}
