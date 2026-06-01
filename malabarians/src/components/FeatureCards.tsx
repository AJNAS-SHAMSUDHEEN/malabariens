import s from "./FeatureCards.module.css";

const FEATURES = [
  { icon: "⚡", title: "Ready in 30 Seconds", desc: "No cooking, no blending. Just add 60ml water, stir for 10 seconds, and your Kerala Avil Milk is ready.", accent: "#f5a623", bg: "#fff8ee" },
  { icon: "🍌", title: "Banana & Cardamom", desc: "Authentic flavour combination — ripe banana sweetness with the warm aroma of hand-picked cardamom.", accent: "#2d7a18", bg: "#edf7e8" },
  { icon: "🌾", title: "Premium Ingredients", desc: "Finest flattened rice, select nuts, and traditional spices — every batch crafted for genuine taste.", accent: "#c47208", bg: "#fffbeb" },
  { icon: "🚫", title: "No Artificial Colours", desc: "Zero synthetic dyes, zero preservatives. 100% natural ingredients for your family's health and trust.", accent: "#2d7a18", bg: "#edf7e8" },
  { icon: "🎒", title: "Take it Anywhere", desc: "Slim 80g pack fits in your pocket, bag, or lunchbox — perfect for office, college, or travel.", accent: "#f5a623", bg: "#fff8ee" },
  { icon: "🏡", title: "Traditional Kerala Taste", desc: "The same Avil Milk that generations have cherished — now in a modern, convenient instant format.", accent: "#c47208", bg: "#fffbeb" },
];

export default function FeatureCards() {
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

        <div className={s.grid}>
          {FEATURES.map((f, i) => (
            <article key={f.title} className={s.card}>
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
          ))}
        </div>
      </div>
    </section>
  );
}
