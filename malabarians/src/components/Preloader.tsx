"use client";

import { useEffect, useRef, useState } from "react";
import s from "./Preloader.module.css";

const PalmIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C10 2 8.5 3.5 8 5c-.8-1-2.2-1.5-3.5-1C3 4.5 2.5 6 3 7.5c-1.2.2-2 1.2-2 2.5 0 1.5 1.2 2.5 2.5 2.5H11v8a1 1 0 002 0v-8h7.5C21.8 12.5 23 11.5 23 10c0-1.3-.8-2.3-2-2.5.5-1.5 0-3-1.5-3.5C18.2 3.5 16.8 4 16 5c-.5-1.5-2-3-4-3z"/>
  </svg>
);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Particle animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const GOLD_COLORS = [
      "rgba(212,170,80,",
      "rgba(255,215,100,",
      "rgba(240,190,70,",
      "rgba(255,235,150,",
      "rgba(200,155,60,",
    ];

    const particles: Particle[] = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const spawnBurst = () => {
      const count = 40;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 0.4 + Math.random() * 1.8;
        particles.push({
          x: cx + (Math.random() - 0.5) * 60,
          y: cy + (Math.random() - 0.5) * 60,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.3,
          size: 1 + Math.random() * 2.5,
          alpha: 0.6 + Math.random() * 0.4,
          decay: 0.008 + Math.random() * 0.012,
          color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
        });
      }
    };

    // Spawn ambient particles continuously
    const spawnAmbient = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.2 - Math.random() * 0.6,
        size: 0.5 + Math.random() * 1.5,
        alpha: 0.2 + Math.random() * 0.4,
        decay: 0.004 + Math.random() * 0.006,
        color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
      });
    };

    let frame = 0;
    spawnBurst();

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn ambient particles every 3 frames
      if (frame % 3 === 0) spawnAmbient();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.015; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Schedule fade-out
    const fadeTimer = window.setTimeout(() => {
      setFadeOut(true);
    }, 1200);

    // Call onComplete after full fade
    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`${s.preloader} ${fadeOut ? s.fadeOut : ""}`} aria-hidden="true">
      <canvas ref={canvasRef} className={s.particleCanvas} />
      <div className={s.bloom} />
      <div className={s.wordmark}>
        <div className={s.wordmarkIcon}>
          <PalmIcon />
        </div>
        <span className={s.wordmarkName}>Malabarians</span>
        <span className={s.wordmarkSub}>Goodness in Every Choice</span>
      </div>
    </div>
  );
}
