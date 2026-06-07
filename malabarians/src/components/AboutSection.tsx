"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import s from "./AboutSection.module.css";

const BULLETS = [
  "Made with Avil (Poha), Banana Powder, Milk Powder, Nuts, Raisins & Cardamom",
  "Goodness in every sip",
  "Perfect for breakfast, travel, or anytime hunger",
  "No cooking required",
];

const STEPS = [
  {
    step: "01",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
      </svg>
    ),
    text: "Add 5-6 tbsp (≈30g) of Avil Milk Mix",
  },
  {
    step: "02",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13l-.87.5M4.21 17.5l-.87.5M20.66 17.5l-.87-.5M4.21 6.5l-.87-.5M21 12h-1M4 12H3"/>
      </svg>
    ),
    text: "Add 60 ml of cold water",
  },
  {
    step: "03",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
    ),
    text: "Shake or stir well and enjoy!",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add(s.visible); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={s.section}>
      <div className="container">

        {/* Section Header */}
        <div className={s.header}>
          <p className={s.eyebrow}>— OUR PRODUCT —</p>
          <h2 className={s.h2}>Malabarians Instant Avil Milk Mix</h2>
        </div>

        {/* ── 3-column layout
              Mobile:  [image | prepare]  then [bullets full-width]
              Desktop: [bullets | image | prepare] all in one row
        ── */}
        <div className={s.layout}>

          {/* Col 1 (desktop-left / mobile-bottom): Bullet points */}
          <div className={s.colLeft}>
            <ul className={s.bullets}>
              {BULLETS.map((b, i) => (
                <li key={b} className={s.bullet} style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                  <span className={s.bulletCheck}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 (center / mobile-top-left): Product image */}
          <div className={s.colCenter}>
            <div className={s.imageWrap}>
              <Image
                src="/product-flatlay.png"
                alt="Malabarians Instant Avil Milk Mix product display"
                width={480}
                height={420}
                className={s.centerImg}
              />
            </div>
          </div>

          {/* Col 3 (right / mobile-top-right): How to prepare */}
          <div className={s.colRight}>
            <div className={s.prepCard}>
              <h3 className={s.prepTitle}>HOW TO PREPARE</h3>
              <div className={s.prepSteps}>
                {STEPS.map((step, i) => (
                  <div key={i} className={s.prepStep} style={{ animationDelay: `${0.35 + i * 0.13}s` }}>
                    <div className={s.prepIcon}>
                      <span className={s.stepNum}>{step.step}</span>
                      <span className={s.stepIcon}>{step.icon}</span>
                    </div>
                    <p className={s.prepText}>{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
