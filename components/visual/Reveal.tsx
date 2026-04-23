'use client';

/**
 * Reveal — Lightweight scroll-triggered fade-rise (DESIGN.md §6.4 "Fade-rise").
 * Uses IntersectionObserver + CSS (opacity + translateY via transform).
 * No layout-thrashing properties. Respects reduced-motion (CSS media query
 * neutralizes transition).
 */
import { ReactNode, useEffect, useRef, useState } from 'react';

type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  delay?: number;
  distance?: number;
  once?: boolean;
  className?: string;
};

export function Reveal({
  as = 'div',
  children,
  delay = 0,
  distance = 24,
  once = true,
  className = '',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const Tag = as as unknown as React.ElementType;

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : `translate3d(0, ${distance}px, 0)`,
        transition: `opacity 700ms var(--ease-out-soft) ${delay}ms, transform 700ms var(--ease-out-soft) ${delay}ms`,
        willChange: visible ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </Tag>
  );
}
