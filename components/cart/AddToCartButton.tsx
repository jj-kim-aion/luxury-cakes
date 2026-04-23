'use client';

import { useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import { useCart } from '@/lib/store/cart';

type Props = {
  slug: string;
  name: string;
  priceCents: number;
  imageEmoji: string;
  imageAccent: string;
  variant?: 'primary' | 'secondary' | 'dark';
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
    setTimeout(() => setAdded(false), 1800);
  }

  const btnClass =
    variant === 'secondary' ? 'btn-secondary' :
    variant === 'dark'      ? 'btn-dark' :
                              'btn-primary';

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      {/* Qty stepper */}
      <div
        className="inline-flex items-stretch rounded-md overflow-hidden border"
        style={{ borderColor: 'var(--border-strong)' }}
      >
        <button
          type="button"
          onClick={() => setQty(Math.max(1, qty - 1))}
          aria-label="Decrease quantity"
          className="w-12 grid place-items-center transition-colors duration-base hover:bg-bg-surface"
        >
          <Minus size={14} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <span
          className="w-14 grid place-items-center text-sm tabular-nums font-medium"
          style={{
            borderLeft: '1px solid var(--border-strong)',
            borderRight: '1px solid var(--border-strong)',
          }}
        >
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty(qty + 1)}
          aria-label="Increase quantity"
          className="w-12 grid place-items-center transition-colors duration-base hover:bg-bg-surface"
        >
          <Plus size={14} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={`${btnClass} flex-1`}
        aria-live="polite"
      >
        {added ? (
          <>
            <Check size={16} strokeWidth={2} aria-hidden="true" />
            Added to cart
          </>
        ) : (
          <>Reserve this cake</>
        )}
      </button>
    </div>
  );
}
