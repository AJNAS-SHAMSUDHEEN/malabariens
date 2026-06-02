"use client";
import { useRef, useEffect, useState } from "react";
import s from "./WhyChooseUs.module.css";
import c from "./Carousel.module.css";
import { useCarousel } from "@/hooks/useCarousel";

const REASONS = [
  { icon: "🌾", title: "Premium Ingredients", desc: "Finest flattened rice, organic banana, and hand-picked cardamom sourced freshly for every production batch." },
  { icon: "🧼", title: "Hygienic Packaging", desc: "Manufactured in a certified clean-room facility with tamper-proof sealing to ensure maximum product safety." },
  { icon: "🏡", title: "Authentic Taste", desc: "Our recipe is inspired by traditional Kerala households — delivering the real, uncompromised heritage flavour." },
  { icon: "⚡", title: "30-Second Prep", desc: "From pack to glass in under half a minute. No boiling, no blending, no mess — convenience redefined." },
  { icon: "💚", title: "Best Value at ₹50", desc: "Premium-quality authentic taste at just ₹50 per serving — accessible to every family across Kerala." },
];

const GAP = 20;

export default function WhyChooseUs() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [perView, setPerView] = useState(3);
  const [slideW, setSlideW] = useState(0);

  useEffect(() => {
    const calc = () => {
      const w = wrapRef.current?.offsetWidth ?? 0;
      const pv = w >= 1024 ? 3 : w >= 640 ? 2 : 1;
      setPerView(pv);
      setSlideW((w - GAP * (pv - 1)) / pv);
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const { active, goTo, prev, next, maxIndex, onMouseEnter, onMouseLeave } =
    useCarousel(REASONS.length, perView, 3000);

  const translateX = active * (slideW + GAP);

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

        {/* ── Carousel ── */}
        <div
          ref={wrapRef}
          className={c.carouselWrap}
          style={{ "--dot-idle": "rgba(255,255,255,0.25)", "--dot-active": "var(--clr-gold-400)" } as React.CSSProperties}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Left arrow */}
          <button
            className={`${c.arrowBtn} ${c.left} ${s.arrow}`}
            onClick={prev}
            aria-label="Previous reason"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <div style={{ overflow: "hidden" }}>
            <div
              className={c.track}
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {REASONS.map(r => (
                <div
                  key={r.title}
                  className={c.slide}
                  style={{ "--slide-w": `${slideW}px` } as React.CSSProperties}
                >
                  <article className={s.card}>
                    <div className={s.cardIcon} role="img" aria-label={r.title}>{r.icon}</div>
                    <h3 className={s.cardTitle}>{r.title}</h3>
                    <p className={s.cardDesc}>{r.desc}</p>
                    <div className={s.cardLine} />
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            className={`${c.arrowBtn} ${c.right} ${s.arrow}`}
            onClick={next}
            aria-label="Next reason"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* ── Dots ── */}
        <div
          className={c.dotsRow}
          style={{ "--dot-idle": "rgba(255,255,255,0.25)", "--dot-active": "var(--clr-gold-400)" } as React.CSSProperties}
          role="tablist"
          aria-label="Why choose us slides"
        >
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              className={`${c.dot} ${i === active ? c.active : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* ── CTA card (always visible below carousel) ── */}
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
    </section>
  );
}
