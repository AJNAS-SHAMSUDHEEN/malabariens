import Image from "next/image";
import s from "./AboutSection.module.css";

const STEPS = [
  { n: "01", title: "Open the Pack", desc: "Pour all contents into a glass or cup." },
  { n: "02", title: "Add 60ml Water", desc: "Cold or room-temperature water works perfectly." },
  { n: "03", title: "Stir or Shake", desc: "Mix well for 10–15 seconds until smooth." },
  { n: "04", title: "Enjoy! 🎉", desc: "Your authentic Kerala Avil Milk is ready." },
];

export default function AboutSection() {
  return (
    <section id="about" className={s.section}>
      <div className="container">
        <div className={s.grid}>

          {/* ── Visual ── */}
          <div className={s.visual}>
            <div className={s.mainImageWrap}>
              <Image
                src="/product-glass.png"
                alt="Malabarians Avil Milk served in a glass — authentic Kerala recipe"
                width={640}
                height={480}
                className="object-cover"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className={s.imageOverlay} />
              <div className={s.imageCaption}>
                <span className={s.imageCaptionLabel}>Malabarians</span>
                <p className={s.imageCaptionTitle}>
                  Authentic Kerala<br />Avil Milk Experience
                </p>
              </div>
            </div>

            <div className={s.chipTop}>
              <div className={s.chipIcon} style={{ background: "var(--clr-green-50)" }}>⚡</div>
              <div>
                <span className={s.chipVal}>30s</span>
                <span className={s.chipLbl}>Ready Time</span>
              </div>
            </div>

            <div className={s.chipBot}>
              <div className={s.chipIcon} style={{ background: "var(--clr-gold-50)" }}>🌿</div>
              <div>
                <span className={s.chipVal} style={{ fontSize: "16px" }}>100%</span>
                <span className={s.chipLbl}>Natural Ingredients</span>
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className={s.content}>
            <p className={s.pill}>About the Product</p>
            <h2 className={s.h2}>
              The Authentic Kerala<br />
              <span>Avil Milk</span>
            </h2>
            <div className={s.divider} />

            <p className={s.body}>
              MALABARIANS Instant Avil Milk Mix brings the beloved Kerala Avil Milk experience into 
              a convenient ready-to-mix format. Made with premium flattened rice, banana essence, and 
              aromatic cardamom — every sip takes you back to the warmth of God&apos;s Own Country.
            </p>
            <p className={`${s.body} ${s.bodyLast}`}>
              Whether at home, in the office, or on the road — enjoy your favourite traditional drink 
              in under 30 seconds with zero compromise on taste or quality.
            </p>

            <div className={s.stepsCard}>
              <div className={s.stepsHead}>
                <div className={s.stepsHeadIcon}>
                  <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <span className={s.stepsHeadTitle}>How to Prepare</span>
              </div>
              <div className={s.stepsBody}>
                {STEPS.map(st => (
                  <div key={st.n} className={s.step}>
                    <div className={s.stepNum}>{st.n}</div>
                    <div className={s.stepText}>
                      <p className={s.stepTitle}>{st.title}</p>
                      <p className={s.stepDesc}>{st.desc}</p>
                    </div>
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
