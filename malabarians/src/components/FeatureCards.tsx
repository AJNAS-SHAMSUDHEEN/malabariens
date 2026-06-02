"use client";
import { useRef, useState, useEffect } from "react";
import s from "./FeatureCards.module.css";
import c from "./Carousel.module.css";
import { useCarousel } from "@/hooks/useCarousel";

const FEATURES = [
  { icon: "⚡", title: "Ready in 30 Seconds", desc: "No cooking, no blending. Just add 60ml water, stir for 10 seconds, and your Kerala Avil Milk is ready.", accent: "#f5a623", bg: "#fff8ee" },
  { icon: "🍌", title: "Banana & Cardamom", desc: "Authentic flavour combination — ripe banana sweetness with the warm aroma of hand-picked cardamom.", accent: "#2d7a18", bg: "#edf7e8" },
  { icon: "🌾", title: "Premium Ingredients", desc: "Finest flattened rice, select nuts, and traditional spices — every batch crafted for genuine taste.", accent: "#c47208", bg: "#fffbeb" },
  { icon: "🚫", title: "No Artificial Colours", desc: "Zero synthetic dyes, zero preservatives. 100% natural ingredients for your family's health and trust.", accent: "#2d7a18", bg: "#edf7e8" },
  { icon: "🎒", title: "Take it Anywhere", desc: "Slim 80g pack fits in your pocket, bag, or lunchbox — perfect for office, college, or travel.", accent: "#f5a623", bg: "#fff8ee" },
  { icon: "🏡", title: "Traditional Kerala Taste", desc: "The same Avil Milk that generations have cherished — now in a modern, convenient instant format.", accent: "#c47208", bg: "#fffbeb" },
];

const GAP = 20; // px — matches var(--sp-5)

export default function FeatureCards() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [perView, setPerView] = useState(3);
  const [slideW, setSlideW] = useState(0);

  // Compute perView & slide width on mount / resize
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
    useCarousel(FEATURES.length, perView, 3000);

  const translateX = active * (slideW + GAP);

  return (
    <section id="features" className={s.section}>
      <div className="container">
        <header className={s.sectionHead}>
          <p className={s.pill}>Why You&apos;ll Love It</p>
          <h2 className={s.h2}>
            Everything You Need,<br />
            <em>Nothing You Don&apos;t</em>
          </h2>
          <div className={s.divider} />
          <p className={s.subtext}>
            Six reasons why MALABARIANS is Kerala&apos;s favourite instant beverage mix.
          </p>
        </header>

        {/* ── Carousel ── */}
        <div
          ref={wrapRef}
          className={c.carouselWrap}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Left arrow */}
          <button
            className={`${c.arrowBtn} ${c.left} ${s.arrow}`}
            onClick={prev}
            aria-label="Previous feature"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Track */}
          <div style={{ overflow: "hidden" }}>
            <div
              className={c.track}
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className={c.slide}
                  style={{ "--slide-w": `${slideW}px` } as React.CSSProperties}
                >
                  <article className={s.card}>
                    <span className={s.cardNum} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={s.iconBox}
                      style={{ background: f.bg, border: `1.5px solid ${f.accent}22` }}
                    >
                      <span role="img" aria-label={f.title}>{f.icon}</span>
                    </div>
                    <h3 className={s.cardTitle}>{f.title}</h3>
                    <p className={s.cardDesc}>{f.desc}</p>
                    <div
                      className={s.cardBar}
                      style={{ background: `linear-gradient(90deg, ${f.accent}, transparent)` }}
                    />
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            className={`${c.arrowBtn} ${c.right} ${s.arrow}`}
            onClick={next}
            aria-label="Next feature"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* ── Dots ── */}
        <div className={c.dotsRow} role="tablist" aria-label="Feature slides">
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
      </div>
    </section>
  );
}
