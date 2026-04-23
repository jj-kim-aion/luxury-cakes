'use client';

/**
 * Orbs — DESIGN.md §8.3
 * Floating particle orbs in warm pastel palette.
 * GPU-accelerated transforms only. Caps to 8 orbs on mobile (<=768px).
 * Respects prefers-reduced-motion via globals.css media query.
 */
import { useMemo } from 'react';

type Orb = {
  left: string; top: string; size: number; dx: string; dy: string;
  dur: number; delay: number; color: string; blur: number;
};

const PALETTE = [
  'var(--color-rose)',
  'var(--color-gold)',
  'var(--color-champagne)',
  'var(--color-cream)',
  'var(--color-rose-deep)',
];

function rand(seed: number, max = 1, min = 0) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  const v = x - Math.floor(x);
  return min + v * (max - min);
}

export function Orbs({ count = 14, className = '' }: { count?: number; className?: string }) {
  const orbs = useMemo<Orb[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      left: `${rand(i + 1, 95, 5).toFixed(1)}%`,
      top:  `${rand(i + 11, 95, 5).toFixed(1)}%`,
      size: Math.round(rand(i + 21, 140, 40)),
      dx:   `${(rand(i + 31, 10, -10)).toFixed(1)}%`,
      dy:   `${(rand(i + 41, 10, -10)).toFixed(1)}%`,
      dur:  Math.round(rand(i + 51, 32, 14)),
      delay: Math.round(rand(i + 61, 8, 0)),
      color: PALETTE[i % PALETTE.length],
      blur: Math.round(rand(i + 71, 24, 10)),
    }));
  }, [count]);

  return (
    <div className={`orbs ${className}`} aria-hidden="true">
      {orbs.map((o, i) => (
        <span
          key={i}
          className="orb"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter: `blur(${o.blur}px)`,
            ['--orb-dx' as string]: o.dx,
            ['--orb-dy' as string]: o.dy,
            ['--orb-dur' as string]: `${o.dur}s`,
            ['--orb-delay' as string]: `${o.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
