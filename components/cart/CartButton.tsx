'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/store/cart';

export function CartButton() {
  const toggle = useCart((s) => s.toggle);
  const items = useCart((s) => s.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = mounted ? items.reduce((sum, i) => sum + i.quantity, 0) : 0;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Cart — ${count} ${count === 1 ? 'item' : 'items'}`}
      className="relative inline-flex items-center gap-2 h-10 px-4 rounded-md border text-[11px] uppercase tracking-luxe
                 transition-[background-color,color,border-color,transform] duration-base ease-out-soft
                 hover:bg-ink hover:text-cream hover:border-ink hover:-translate-y-[1px]
                 focus-visible:outline-none"
      style={{ borderColor: 'var(--border-strong)', color: 'var(--fg-primary)' }}
    >
      <ShoppingBag size={14} strokeWidth={1.5} aria-hidden="true" />
      <span className="hidden sm:inline">Cart</span>
      {mounted && count > 0 && (
        <span
          aria-hidden="true"
          className="inline-grid place-items-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] leading-none font-medium tabular-nums"
          style={{
            background: 'var(--color-gold)',
            color: 'var(--color-ink)',
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
