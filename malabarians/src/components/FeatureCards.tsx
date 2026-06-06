import s from "./FeatureCards.module.css";

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"/>
      </svg>
    ),
    title: "Quality Ingredients",
    desc: "Carefully chosen for better taste and nutrition.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    ),
    title: "Loved by Many",
    desc: "Trusted by customers across Kerala and beyond.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: "Easy & Quick",
    desc: "Just add water, shake and enjoy!",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: "Inspired by Kerala",
    desc: "Traditional flavors, made for modern life.",
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className={s.strip}>
      <div className={`${s.stripInner} container`}>
        {FEATURES.map((f, i) => (
          <div key={f.title} className={s.item}>
            {i > 0 && <div className={s.sep} aria-hidden="true" />}
            <div className={s.itemContent}>
              <div className={s.iconWrap}>{f.icon}</div>
              <div>
                <h3 className={s.title}>{f.title}</h3>
                <p className={s.desc}>{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
