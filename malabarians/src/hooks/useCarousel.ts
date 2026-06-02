"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Carousel hook — auto-advances every `intervalMs` (default 3 000 ms).
 * Pauses auto-scroll while the user hovers over the track.
 *
 * @param total     total number of slides
 * @param perView   how many cards visible at once (used to cap the active index)
 * @param intervalMs auto-advance interval in ms
 */
export function useCarousel(total: number, perView: number, intervalMs = 3000) {
  const maxIndex = Math.max(0, total - perView);
  const [active, setActive] = useState(0);
  const hovering = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number) => setActive(Math.max(0, Math.min(idx, maxIndex))),
    [maxIndex]
  );
  const prev = useCallback(() => setActive(i => (i <= 0 ? maxIndex : i - 1)), [maxIndex]);
  const next = useCallback(() => setActive(i => (i >= maxIndex ? 0 : i + 1)), [maxIndex]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!hovering.current) {
        setActive(i => (i >= maxIndex ? 0 : i + 1));
      }
    }, intervalMs);
  }, [maxIndex, intervalMs]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const onMouseEnter = () => { hovering.current = true; };
  const onMouseLeave = () => { hovering.current = false; };

  return { active, goTo, prev, next, maxIndex, onMouseEnter, onMouseLeave };
}
