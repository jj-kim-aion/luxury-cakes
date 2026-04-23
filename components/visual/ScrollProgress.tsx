'use client';

/**
 * ScrollProgress — DESIGN.md §13
 * 2px gold bar at top that fills left→right as the user scrolls.
 * Uses transform: scaleX (GPU-safe). rAF-throttled, respects reduced-motion.
 */
import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !barRef.current) return;

    function update() {
      if (!barRef.current) return;
      const doc = document.documentElement;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const ratio = Math.min(1, Math.max(0, doc.scrollTop / max));
      barRef.current.style.transform = `scaleX(${ratio})`;
    }

    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          update();
          ticking.current = false;
        });
        ticking.current = true;
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}
