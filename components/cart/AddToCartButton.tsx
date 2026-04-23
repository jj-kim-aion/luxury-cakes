'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store/cart';

type Props = {
  slug: string;
  name: string;
  priceCents: number;
  imageEmoji: string;
  imageAccent: string;
  variant?: 'primary' | 'ghost';
  className?: string;
};

export function AddToCartButton({
  slug,
  name,
  priceCents,
  imageEmoji,
  imageAccent,
  variant = 'primary',
  className = '',
}: Props) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add({ slug, name, priceCents, imageEmoji, imageAccent }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const btnClass = variant === 'primary' ? 'btn-primary' : 'btn-ghost';

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="inline-flex items-stretch border border-[color:var(--fg)]">
        <button
          type="button"
          onClick={() => setQty(Math.max(1, qty - 1))}
          aria-label="Decrease quantity"
          className="w-11 hover:bg-[color:var(--fg)] hover:text-[color:var(--bg)] transition-colors"
        >
          −
        </button>
        <span className="w-12 flex items-center justify-center text-sm tabular-nums border-x border-[color:var(--fg)]">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty(qty + 1)}
          aria-label="Increase quantity"
          className="w-11 hover:bg-[color:var(--fg)] hover:text-[color:var(--bg)] transition-colors"
        >
          +
        </button>
      </div>
      <button type="button" onClick={handleAdd} className={`${btnClass} flex-1`}>
        {added ? '✓ Added to cart' : 'Add to cart'}
      </button>
    </div>
  );
}
