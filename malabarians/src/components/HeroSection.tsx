"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./HeroSection.module.css";

/* ─────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────── */

const TOTAL_FRAMES = 240;
const FRAME_PATH = (n: number) =>
  `/herosequences/ezgif-frame-${String(n).padStart(3, "0")}.png`;

/* ─────────────────────────────────────────────────
   HERO SECTION — Preload-gated GSAP ScrollTrigger
   ───────────────────────────────────────────────── */

export default function HeroSection() {
  const outerRef      = useRef<HTMLDivElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const introRef      = useRef<HTMLDivElement>(null);
  const loaderRef      = useRef<HTMLDivElement>(null);
  const progressBarRef  = useRef<HTMLDivElement>(null);
  const percentRef      = useRef<HTMLSpanElement>(null);
  const textLayerRef    = useRef<HTMLDivElement>(null);
  const scrollIndRef    = useRef<HTMLDivElement>(null);
  const canvasWrapRef   = useRef<HTMLDivElement>(null);
  const lightRaysRef    = useRef<HTMLDivElement>(null);

  /* Frame cache */
  const framesRef       = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);

  /* ── Draw frame — COVER fit, no letterboxing ── */
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const img = framesRef.current[frameIndex];
    if (!img) return;

    const { naturalWidth: iw, naturalHeight: ih } = img;
    const cw = canvas.width;
    const ch = canvas.height;
    const imgAspect    = iw / ih;
    const canvasAspect = cw / ch;

    let drawW: number, drawH: number, drawX: number, drawY: number;
    if (imgAspect > canvasAspect) {
      drawH = ch; drawW = ch * imgAspect;
      drawX = (cw - drawW) / 2; drawY = 0;
    } else {
      drawW = cw; drawH = cw / imgAspect;
      drawX = 0; drawY = (ch - drawH) / 2;
    }
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    currentFrameRef.current = frameIndex;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas  = canvasRef.current;
    const outer   = outerRef.current;
    const sticky  = stickyRef.current;
    if (!canvas || !outer || !sticky) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    /* ── Step 1: Load ALL frames sequentially, update progress bar ── */
    let loadedCount = 0;

    const loadOne = (index: number): Promise<void> =>
      new Promise((resolve) => {
        if (framesRef.current[index]) { resolve(); return; }
        const img = new Image();
        img.src = FRAME_PATH(index + 1);
        img.onload = () => {
          framesRef.current[index] = img;
          loadedCount++;
          const pct = loadedCount / TOTAL_FRAMES;
          const pctInt = Math.round(pct * 100);
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${pctInt}%`;
          }
          if (percentRef.current) {
            percentRef.current.textContent = `${pctInt}%`;
          }
          resolve();
        };
        img.onerror = () => { loadedCount++; resolve(); };
      });

    // Load 8 at a time (parallel batches) for speed
    const loadAllFrames = async () => {
      const CONCURRENCY = 8;
      for (let i = 0; i < TOTAL_FRAMES; i += CONCURRENCY) {
        const batch: Promise<void>[] = [];
        for (let j = i; j < Math.min(i + CONCURRENCY, TOTAL_FRAMES); j++) {
          batch.push(loadOne(j));
        }
        await Promise.all(batch);
      }
    };

    // Draw frame 0 as soon as it's ready, before all frames are loaded
    loadOne(0).then(() => drawFrame(0));

    // Load all, then boot the scroll animation
    loadAllFrames().then(() => {
      drawFrame(0);
      bootScrollAnimation();
    });

    /* ── Step 2: Boot scroll animation after all frames loaded ── */
    const bootScrollAnimation = () => {
      const loaderEl = loaderRef.current;
      const introEl  = introRef.current;

      // Hide loader bar
      if (loaderEl) {
        gsap.to(loaderEl, {
          opacity: 0, duration: 0.4, ease: "power2.out",
          onComplete: () => { loaderEl.style.display = "none"; },
        });
      }

      // Fade out black intro overlay
      if (introEl) {
        gsap.to(introEl, {
          opacity: 0, duration: 1.0, ease: "power2.inOut", delay: 0.1,
          onComplete: () => introEl.remove(),
        });
      }

      // Fade in scroll indicator
      const scrollInd = scrollIndRef.current;
      if (scrollInd) {
        gsap.fromTo(scrollInd,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 1.2 }
        );
      }

      // FRAME SEQUENCE — now all frames are in memory, no loading can stall this
      const frameProxy = { frame: 0 };
      const frameTween = gsap.to(frameProxy, {
        frame: TOTAL_FRAMES - 1,
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub: isMobile ? 1.0 : isTablet ? 1.2 : 1.8,
        },
        onUpdate() {
          let frameIndex = Math.round(frameProxy.frame);
          if (isMobile) {
            const step = 3;
            frameIndex = Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex / step) * step);
          } else if (isTablet) {
            const step = 2;
            frameIndex = Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex / step) * step);
          }
          if (frameIndex !== currentFrameRef.current) drawFrame(frameIndex);
        },
      });

      // CAMERA ZOOM
      const zoomAmount = isMobile ? 0.04 : isTablet ? 0.05 : 0.1;
      const zoomTl = gsap.fromTo(
        canvasWrapRef.current,
        { scale: 1 },
        {
          scale: 1 + zoomAmount, ease: "none",
          scrollTrigger: {
            trigger: outer, start: "top top", end: "bottom bottom",
            scrub: isMobile ? 1.0 : isTablet ? 1.2 : 1.8,
          },
        }
      );

      // NAVBAR + TEXT REVEAL (middle of animation: 35%→55%)
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: outer, start: "35% top", end: "55% top", scrub: 1.2,
        },
      });
      const navEl = document.querySelector("nav");
      if (navEl) {
        revealTl.fromTo(navEl, { opacity: 0, y: -20 }, { opacity: 1, y: 0, ease: "none" }, 0);
      }
      const tagline = textLayerRef.current?.querySelector(`.${s.tagline}`);
      const headline = textLayerRef.current?.querySelector(`.${s.headline}`);
      const subtext  = textLayerRef.current?.querySelector(`.${s.subtext}`);
      const ctaBtn   = textLayerRef.current?.querySelector(`.${s.ctaBtn}`);
      if (tagline)  revealTl.fromTo(tagline,  { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none" }, 0);
      if (headline) revealTl.fromTo(headline, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none" }, 0.1);
      if (subtext)  revealTl.fromTo(subtext,  { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none" }, 0.2);
      if (ctaBtn)   revealTl.fromTo(ctaBtn,   { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none" }, 0.3);

      // SCROLL INDICATOR FADE
      const indTl = gsap.to(scrollIndRef.current, {
        opacity: 0, y: 10, ease: "power1.in",
        scrollTrigger: { trigger: outer, start: "top top", end: "8% top", scrub: 0.5 },
      });

      // LIGHT RAYS INTENSIFY
      const rayTl = gsap.fromTo(
        lightRaysRef.current,
        { "--ray-opacity": 0.4 } as gsap.TweenVars,
        {
          "--ray-opacity": 0.9, ease: "none",
          scrollTrigger: { trigger: outer, start: "top top", end: "bottom bottom", scrub: 2 },
        } as gsap.TweenVars
      );

      // RESIZE HANDLER
      const onResize = () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFrame(currentFrameRef.current);
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize, { passive: true });

      // Store cleanup refs on outer element for teardown
      (outer as any).__heroCleanup = () => {
        frameTween.kill();
        zoomTl.scrollTrigger?.kill();
        revealTl.scrollTrigger?.kill(); revealTl.kill();
        indTl.scrollTrigger?.kill(); indTl.kill();
        rayTl.scrollTrigger?.kill(); rayTl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        window.removeEventListener("resize", onResize);
      };
    };

    /* ── Cleanup ── */
    return () => {
      const cleanup = (outer as any).__heroCleanup;
      if (cleanup) cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─────────────────────────────────────────────────
     RENDER
     ───────────────────────────────────────────────── */
  return (
    <section className={s.heroOuter} ref={outerRef} id="hero">
      <div className={s.heroSticky} ref={stickyRef}>

        {/* BLACK INTRO OVERLAY */}
        <div className={s.introOverlay} ref={introRef} aria-hidden="true" />

        {/* BRANDED PRELOADER — centered, fades out once all frames are ready */}
        <div className={s.loaderWrap} ref={loaderRef} aria-hidden="true">
          {/* Logo mark */}
          <div className={s.loaderLogo}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor" className={s.loaderPalmIcon}>
              <path d="M12 2C10 2 8.5 3.5 8 5c-.8-1-2.2-1.5-3.5-1C3 4.5 2.5 6 3 7.5c-1.2.2-2 1.2-2 2.5 0 1.5 1.2 2.5 2.5 2.5H11v8a1 1 0 002 0v-8h7.5C21.8 12.5 23 11.5 23 10c0-1.3-.8-2.3-2-2.5.5-1.5 0-3-1.5-3.5C18.2 3.5 16.8 4 16 5c-.5-1.5-2-3-4-3z"/>
            </svg>
          </div>
          <p className={s.loaderBrand}>Malabarians</p>
          <p className={s.loaderTagline}>— Goodness in Every Choice —</p>

          {/* Progress track */}
          <div className={s.loaderTrack}>
            <div className={s.loaderBar} ref={progressBarRef} />
          </div>
          <span className={s.loaderPercent} ref={percentRef}>0%</span>
        </div>

        {/* Black background */}
        <div className={s.heroBg} aria-hidden="true" />

        {/* Volumetric light rays */}
        <div className={s.lightRays} ref={lightRaysRef} aria-hidden="true" />

        {/* CSS floating particles */}
        <div className={s.particles} aria-hidden="true">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className={`${s.particle} ${s[`p${i + 1}`]}`} />
          ))}
        </div>

        {/* Canvas sequence — full-cover */}
        <div className={s.canvasWrapper} ref={canvasWrapRef}>
          <canvas
            ref={canvasRef}
            className={s.seqCanvas}
            aria-label="Malabarians Avil Milk product reveal animation"
            role="img"
          />
        </div>

        {/* Dark vignette */}
        <div className={s.vignette} aria-hidden="true" />

        {/* Text layer */}
        <div className={s.textLayer} ref={textLayerRef}>
          <div className={s.tagline}>
            <span className={s.taglineDot} />
            Authentic Kerala Flavour
          </div>
          <h1 className={s.headline}>
            Premium. Rich.
            <span className={s.headlineAccent}>Authentic Taste.</span>
          </h1>
          <p className={s.subtext}>
            Malabarians Instant Avil Milk Mix —<br />
            Tradition in a cup, convenience in every sip.
          </p>
          <a id="hero-discover-btn" href="#product" className={s.ctaBtn}>
            <span>Discover Our Product</span>
            <span className={s.ctaArrow} aria-hidden="true">→</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className={s.scrollIndicator} ref={scrollIndRef} aria-hidden="true">
          <span className={s.scrollText}>Scroll to explore</span>
          <span className={s.scrollChevrons}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              style={{ color: "rgba(255,255,255,0.6)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              style={{ color: "rgba(255,255,255,0.3)", marginTop: "-4px" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

      </div>
    </section>
  );
}
