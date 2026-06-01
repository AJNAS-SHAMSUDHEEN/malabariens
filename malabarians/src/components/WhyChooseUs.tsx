"use client";
import s from "./WhyChooseUs.module.css";

const REASONS = [
  { icon: "🌾", title: "Premium Ingredients", desc: "Finest flattened rice, organic banana, and hand-picked cardamom sourced freshly for every production batch." },
  { icon: "🧼", title: "Hygienic Packaging", desc: "Manufactured in a certified clean-room facility with tamper-proof sealing to ensure maximum product safety." },
  { icon: "🏡", title: "Authentic Taste", desc: "Our recipe is inspired by traditional Kerala households — delivering the real, uncompromised heritage flavour." },
  { icon: "⚡", title: "30-Second Prep", desc: "From pack to glass in under half a minute. No boiling, no blending, no mess — convenience redefined." },
  { icon: "💚", title: "Best Value at ₹50", desc: "Premium-quality authentic taste at just ₹50 per serving — accessible to every family across Kerala." },
];

export default function WhyChooseUs() {
  return (
    <section className={s.section}>
      <div className={s.bgGlow1} aria-hidden="true" />
      <div className={s.bgGlow2} aria-hidden="true" />
      <div className={s.topLine} aria-hidden="true" />
      <div className={s.bottomLine} aria-hidden="true" />

      <div className="container">
        <header className={s.sectionHead}>
          <p className={s.pill}>Our Promise</p>
          <h2 className={s.h2}>
            Why Choose{" "}
            <span className={s.h2Highlight}>MALABARIANS?</span>
          </h2>
          <div className={s.divider} />
          <p className={s.subtext}>
            A commitment to quality, tradition, and your complete satisfaction — every single sip.
          </p>
        </header>

        <div className={s.grid}>
          {REASONS.map(r => (
            <article key={r.title} className={s.card}>
              <div className={s.cardIcon} role="img" aria-label={r.title}>{r.icon}</div>
              <h3 className={s.cardTitle}>{r.title}</h3>
              <p className={s.cardDesc}>{r.desc}</p>
              <div className={s.cardLine} />
            </article>
          ))}

          {/* CTA card */}
          <div className={s.ctaCard}>
            <div>
              <p className={s.ctaLabel}>Limited Availability</p>
              <p className={s.ctaTitle}>Try It<br />Today</p>
              <p className={s.ctaSub}>Join hundreds of satisfied families across Kerala who trust MALABARIANS.</p>
            </div>
            <a href="#order" className={s.ctaBtn}>
              Order Now — ₹50
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
