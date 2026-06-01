import Image from "next/image";
import s from "./HeroSection.module.css";
import { buildSimpleWhatsAppURL } from "@/lib/whatsapp";

const WaIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TAGS = ["🍌 Banana & Cardamom", "🌿 No Artificial Colours", "⚡ Ready in 30 Seconds", "🎒 Travel Friendly"];
const STATS = [
  { value: "30s", label: "Ready Time" },
  { value: "80g", label: "Net Weight" },
  { value: "₹50", label: "Price" },
  { value: "100%", label: "Natural" },
];

export default function HeroSection() {
  return (
    <section className={s.hero}>
      <div className={s.heroBg}>
        <div className={s.bgCircle1} />
        <div className={s.bgCircle2} />
        <div className={s.bgDots} />
      </div>

      <div className={`${s.heroInner} container`}>
        {/* ── Content ── */}
        <div className={s.content}>
          <div className={s.eyebrow}>
            Kerala Traditional Instant Beverage
          </div>

          <h1 className={s.headline}>
            <span className={s.headlineLine1}>Instant</span>
            <span className={s.headlineLine2}>Avil Milk</span>
            <span className={s.headlineLine3}>Mix</span>
          </h1>

          <p className={s.subtext}>
            Ready in just <strong>30 seconds</strong> — add water, stir, and enjoy the 
            authentic taste of <strong>Kerala Avil Milk</strong> anywhere, anytime.
          </p>

          <div className={s.tags}>
            {TAGS.map(t => <span key={t} className={s.tag}>{t}</span>)}
          </div>

          <div className={s.priceRow}>
            <div>
              <p className={s.priceLabel}>Price</p>
              <p className={s.price}>₹50</p>
              <p className={s.priceMeta}>per 80g packet</p>
            </div>
            <div>
              <span className={s.priceBadge}>
                <svg width="10" height="10" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                BEST VALUE
              </span>
            </div>
          </div>

          <div className={s.ctaRow}>
            <a id="hero-wa-btn" href={buildSimpleWhatsAppURL()} target="_blank" rel="noopener noreferrer" className={s.btnWa}>
              <WaIcon /> Order on WhatsApp
            </a>
            <a id="hero-details-btn" href="#about" className={s.btnDetails}>
              View Details
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </a>
          </div>

          <div className={s.statsBar}>
            {STATS.map(s2 => (
              <div key={s2.label} className={s.statItem}>
                <span className={s.statValue}>{s2.value}</span>
                <span className={s.statLabel}>{s2.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Visual ── */}
        <div className={s.visual}>
          <div className={s.visualRing}>
            <div className={s.ring1} />
            <div className={s.ring2} />
          </div>

          <Image
            src="/product-hero.png"
            alt="MALABARIANS Instant Avil Milk Mix – Banana & Cardamom 80g packet"
            width={460}
            height={560}
            priority
            className={s.productImage}
          />

          <div className={`${s.chip} ${s.chip1}`}>
            <div className={s.chipIcon} style={{ background: "var(--clr-green-50)" }}>⚡</div>
            <div>
              <span className={s.chipTitle}>30 Seconds</span>
              <span className={s.chipSub}>Ready to drink</span>
            </div>
          </div>

          <div className={`${s.chip} ${s.chip2}`}>
            <div className={s.chipIcon} style={{ background: "var(--clr-gold-50)" }}>🌿</div>
            <div>
              <span className={s.chipTitle}>100% Natural</span>
              <span className={s.chipSub}>No preservatives</span>
            </div>
          </div>
        </div>
      </div>

      <div className={s.scrollHint} aria-hidden="true">
        <span>Scroll</span>
        <div className={s.scrollLine} />
      </div>
    </section>
  );
}
