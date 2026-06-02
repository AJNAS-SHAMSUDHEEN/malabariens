"use client";
import { useState, useEffect } from "react";
import s from "./ContactFooterFloat.module.css";
const BagIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "MALABARIANS Instant Avil Milk Mix",
          text: "Try this amazing Kerala Avil Milk Mix — Ready in 30 seconds! Only ₹50.",
          url: window.location.href,
        });
      } catch { /* dismissed */ }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      {/* Order Now float */}
      <a
        id="floating-order-btn"
        href="#order"
        className={s.orderFloat}
        aria-label="Order Now"
      >
        <BagIcon />
        <span>Order Now</span>
      </a>

      {/* Share */}
      <button
        id="share-btn"
        onClick={handleShare}
        className={s.shareBtn}
        aria-label={copied ? "Link copied!" : "Share product"}
        title={copied ? "Link copied!" : "Share product"}
      >
        {copied ? (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
          </svg>
        ) : (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
          </svg>
        )}
      </button>

      {/* Scroll to top */}
      <button
        id="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`${s.topBtn} ${showTop ? s.topBtnVisible : s.topBtnHidden}`}
        aria-label="Scroll to top"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7"/>
        </svg>
      </button>

      {/* Mobile sticky bar */}
      <div className={s.mobileBar} role="complementary" aria-label="Quick order bar">
        <div className={s.mobileBarPrice}>
          <p className={s.mobileBarAmt}>₹50</p>
          <p className={s.mobileBarSub}>per packet · Free delivery*</p>
        </div>
        <a href="#order" id="mobile-sticky-order" className={s.mobileBarBtn}>
          Order Now
        </a>
      </div>
    </>
  );
}
