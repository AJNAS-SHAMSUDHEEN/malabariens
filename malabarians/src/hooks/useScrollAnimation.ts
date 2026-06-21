"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollAnimationState {
  /** Normalized 0–1 progress through the hero scroll zone */
  progress: number;
  /** Current frame index (0-based) */
  frameIndex: number;
  /** Whether the hero zone is active (pinned) */
  isActive: boolean;
}

/**
 * Drives hero sequence animation from scroll position.
 * Returns a normalized progress 0→1 for the hero sticky zone.
 *
 * @param totalFrames  Total number of sequence frames
 * @param scrollHeight Total scroll height of the hero outer element (e.g. 4 * window.innerHeight)
 */
export function useScrollAnimation(
  totalFrames: number,
  outerRef: React.RefObject<HTMLElement | null>
): ScrollAnimationState {
  const [state, setState] = useState<ScrollAnimationState>({
    progress: 0,
    frameIndex: 0,
    isActive: false,
  });

  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const lastProgress = useRef(0);

  const update = useCallback(() => {
    if (!outerRef.current) return;

    const scrollY = window.scrollY;
    if (scrollY === lastScrollY.current) return; // no change
    lastScrollY.current = scrollY;

    const rect = outerRef.current.getBoundingClientRect();
    const outerTop = scrollY + rect.top; // absolute top of outer
    const outerHeight = outerRef.current.offsetHeight; // e.g. 4 * vh
    const vh = window.innerHeight;

    // Animation zone: from when outer enters viewport until it fully exits
    // Pinned phase: scrollY from outerTop → outerTop + outerHeight - vh
    const animStart = outerTop;
    const animEnd = outerTop + outerHeight - vh;

    let progress = 0;
    if (animEnd > animStart) {
      progress = Math.max(0, Math.min(1, (scrollY - animStart) / (animEnd - animStart)));
    }

    // Only update state if progress actually changed meaningfully
    if (Math.abs(progress - lastProgress.current) < 0.001) return;
    lastProgress.current = progress;

    const frameIndex = Math.min(
      totalFrames - 1,
      Math.round(progress * (totalFrames - 1))
    );

    setState({
      progress,
      frameIndex,
      isActive: progress > 0 && progress < 1,
    });
  }, [outerRef, totalFrames]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial call
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return state;
}
