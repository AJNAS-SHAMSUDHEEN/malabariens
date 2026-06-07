"use client";

import Image from "next/image";
import s from "./HeroSection.module.css";

const BADGES = [
  {
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
      </svg>
    ),
    label: "Carefully\nSelected Ingredients",
  },
  {
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    label: "Ready in\n30 Seconds",
  },
  {
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    label: "Hygienically\nPrepared",
  },
];

export default function HeroSection() {
  return (
    <section className={s.hero}>
      <div className={s.heroInner}>

        {/* ── Left: Text Content ── */}
        <div className={s.content}>
          <div className={s.tagline}>
            <span className={s.taglineDot} />
            Authentic Kerala Flavour
          </div>

          <h1 className={s.headline}>
            <span className={s.word}>Premium.</span>
            <span className={s.word}>Rich.</span>
            <span className={s.word}>Authentic Taste.</span>
          </h1>

          <p className={s.subtext}>
            Malabarians Instant Avil Milk Mix –<br />
            Tradition in a cup, Convenience in every sip.
          </p>

          <div className={s.badges}>
            {BADGES.map((b, i) => (
              <div key={b.label} className={s.badge} style={{ animationDelay: `${0.6 + i * 0.12}s` }}>
                <div className={s.badgeCircle}>{b.icon}</div>
                <span className={s.badgeLabel}>{b.label}</span>
              </div>
            ))}
          </div>

          <a id="hero-discover-btn" href="#product" className={s.btnDiscover}>
            <span className={s.btnText}>Discover Our Product</span>
            <span className={s.btnArrow}>→</span>
          </a>
        </div>

        {/* ── Right: Product Image — desktop only ── */}
        <div className={s.visual}>
          <Image
            src="/hero-bg.png"
            alt="Malabarians Instant Avil Milk Mix – Banana & Cardamom with glass of avil milk on a wooden board"
            fill
            priority
            quality={92}
            className={s.productImg}
          />
          <div className={s.blendEdge} aria-hidden="true" />
          <div className={s.floatRing} aria-hidden="true" />
        </div>

      </div>

      {/* Scroll-down hint — mobile only */}
      <div className={s.scrollHint}>
        <span className={s.scrollHintText}>Scroll to explore</span>
        <span className={s.scrollHintArrow}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </span>
      </div>
    </section>
  );
}
