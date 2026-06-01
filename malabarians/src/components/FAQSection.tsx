"use client";
import { useState } from "react";
import s from "./FAQSection.module.css";

const FAQS = [
  { q: "How do I prepare MALABARIANS Instant Avil Milk Mix?", a: "Open the pack, pour the contents into a glass, add 60ml of cold or room-temperature water, and stir or shake well for 10–15 seconds. Your authentic Kerala Avil Milk is ready in under 30 seconds." },
  { q: "Does it contain artificial colours or preservatives?", a: "No. MALABARIANS contains no artificial colours and no preservatives. Only carefully selected natural ingredients for authentic taste and your family's health." },
  { q: "What is the net weight and how much water should I use?", a: "Each packet contains 80g of the mix. Use 60ml of water for one perfect serving. You can adjust slightly to your taste preference." },
  { q: "How can I place an order?", a: "Click any 'Order on WhatsApp' button on this page, fill in your delivery details, and we'll confirm your order within minutes directly on WhatsApp." },
  { q: "What is the shelf life of the product?", a: "Please check the best-before date printed on the packaging. Store in a cool, dry place away from direct sunlight and moisture for optimal freshness." },
  { q: "Do you offer bulk orders for tea shops or businesses?", a: "Yes! We offer special pricing for bulk orders. Contact us on WhatsApp at +91 99466 05923 to discuss quantities, pricing, and delivery arrangements for your business." },
  { q: "Is delivery available outside Trivandrum?", a: "Yes, we deliver across Kerala. For orders outside Trivandrum, please contact us on WhatsApp and we'll arrange the best delivery option for your location." },
  { q: "Can I use milk instead of water for preparation?", a: "Absolutely! Mixing with chilled milk instead of water gives a richer, creamier Avil Milk experience. Both methods work perfectly — it's a matter of personal preference." },
];

const WaIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/>
  </svg>
);

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className={s.section}>
      <div className="container" style={{ maxWidth: "760px" }}>
        <header className={s.sectionHead}>
          <p className={s.pill}>FAQ</p>
          <h2 className={s.h2}>
            Frequently Asked <span>Questions</span>
          </h2>
          <div className={s.divider} />
        </header>

        <div className={s.list} role="list">
          {FAQS.map((f, i) => (
            <div key={i} className={`${s.item} ${open === i ? s.itemOpen : ""}`} role="listitem">
              <button
                id={`faq-btn-${i}`}
                className={s.trigger}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className={`${s.icon} ${open === i ? s.iconOpen : ""}`}>
                  <PlusIcon />
                </span>
                <span className={`${s.question} ${open === i ? s.questionOpen : ""}`}>
                  {f.q}
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                className={`${s.answer} ${open === i ? s.answerOpen : ""}`}
                role="region"
                aria-hidden={open !== i}
              >
                <p className={s.answerInner}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={s.ctaBox}>
          <p className={s.ctaTitle}>Still have questions?</p>
          <p className={s.ctaSub}>We&apos;re just a WhatsApp message away — any time, any day.</p>
          <a href="https://wa.me/919946605923" target="_blank" rel="noopener noreferrer" className={s.ctaBtn}>
            <WaIcon /> Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
