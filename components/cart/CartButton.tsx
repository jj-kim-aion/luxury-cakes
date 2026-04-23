'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/lib/store/cart';

export function CartButton() {
  const toggle = useCart((s) => s.toggle);
  const items = useCart((s) => s.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = mounted ? items.reduce((sum, i) => sum + i.quantity, 0) : 0;

  return (
    <button
      onClick={toggle}
      aria-label={`Cart (${count} items)`}
      className="relative h-9 px-4 border border-[color:var(--fg)] text-[11px] uppercase tracking-[0.22em]
                 transition-all duration-300 hover:bg-[color:var(--fg)] hover:text-[color:var(--bg)]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]"
    >
      <span className="hidden sm:inline">Cart</span>
      <span className="sm:hidden">◇</span>
      {mounted && count > 0 && (
        <span
          aria-hidden="true"
          className="ml-2 inline-block min-w-[20px] h-5 px-1 bg-[color:var(--accent)] text-[color:var(--bg)] text-[10px] leading-5 text-center"
        >
          {count}
        </span>
      )}
    </button>
  );
}
