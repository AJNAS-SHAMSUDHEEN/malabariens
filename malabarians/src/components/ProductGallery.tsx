"use client";
import { useState } from "react";
import Image from "next/image";
import s from "./ProductGallery.module.css";

const IMAGES = [
  { src: "/product-hero.png",       alt: "MALABARIANS Avil Milk Mix — product packaging",       caption: "Product Pack",       tag: "Hero Shot",    featured: true  },
  { src: "/product-flatlay.png",    alt: "Avil Milk Mix flat lay with Kerala ingredients",       caption: "Fresh Ingredients",  tag: "Flat Lay",     featured: false },
  { src: "/product-glass.png",      alt: "Malabarians Avil Milk served in a glass",              caption: "Ready to Drink",     tag: "Serve",        featured: false },
  { src: "/product-lifestyle.png",  alt: "Enjoying Malabarians on the go — lifestyle photo",     caption: "Enjoy Anywhere",     tag: "Lifestyle",    featured: false },
  { src: "/kerala-ingredients.png", alt: "Traditional Kerala ingredients — banana and cardamom", caption: "Kerala Ingredients", tag: "Ingredients",  featured: false },
];

const IconZoom  = () => <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>;
const IconClose = () => <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>;
const IconPrev  = () => <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>;
const IconNext  = () => <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>;

export default function ProductGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className={s.section}>
      <div className="container">
        <header className={s.sectionHead}>
          <p className={s.pill}>Product Gallery</p>
          <h2 className={s.h2}>See the <span>Goodness</span></h2>
          <div className={s.divider} />
          <p className={s.hint}>Click any image to view full screen</p>
        </header>

        <div className={s.grid}>
          {IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`${s.gridItem} ${img.featured ? s.featured : ""}`}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
              aria-label={`View ${img.caption}`}
              onKeyDown={e => e.key === "Enter" && setActive(i)}
            >
              {/* Image */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
              />

              {/* Hover overlays */}
              <div className={s.itemOverlay} />
              <div className={s.itemTag}>{img.tag}</div>
              <div className={s.itemCaption}>
                <p className={s.captionText}>{img.caption}</p>
              </div>
              <div className={s.zoomBtn} aria-hidden="true"><IconZoom /></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {active !== null && (
        <div
          className={s.lightbox}
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Close */}
          <button className={s.lbClose} onClick={() => setActive(null)} aria-label="Close viewer">
            <IconClose />
          </button>

          {/* Prev */}
          <button
            className={s.lbPrev}
            onClick={e => { e.stopPropagation(); setActive((active - 1 + IMAGES.length) % IMAGES.length); }}
            aria-label="Previous image"
          >
            <IconPrev />
          </button>

          {/* Image */}
          <div className={s.lightboxContent} onClick={e => e.stopPropagation()}>
            <div className={s.lightboxImgWrap}>
              <Image
                src={IMAGES[active].src}
                alt={IMAGES[active].alt}
                fill
                style={{ objectFit: "contain" }}
                sizes="880px"
                priority
              />
            </div>
            <p className={s.lightboxMeta}>
              {IMAGES[active].caption} &nbsp;·&nbsp; {active + 1} / {IMAGES.length}
            </p>
          </div>

          {/* Next */}
          <button
            className={s.lbNext}
            onClick={e => { e.stopPropagation(); setActive((active + 1) % IMAGES.length); }}
            aria-label="Next image"
          >
            <IconNext />
          </button>
        </div>
      )}
    </section>
  );
}
