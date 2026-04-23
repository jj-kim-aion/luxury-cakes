'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store/cart';
import { formatPrice } from '@/lib/format';

export function CartDrawer() {
  const { isOpen, close, items, setQuantity, remove, subtotalCents, clear } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  // Lock body scroll
  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, mounted]);

  if (!mounted) return null;

  const subtotal = subtotalCents();

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-40 bg-[color:var(--noir-900,#17120e)]/60 backdrop-blur-sm transition-opacity duration-500
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ willChange: 'opacity' }}
      />
      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-[color:var(--bg)] z-50
          border-l border-[color:var(--rule)] shadow-luxe
          transition-transform duration-500 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ willChange: 'transform' }}
      >
        <div className="h-full flex flex-col">
          <header className="flex items-center justify-between p-6 border-b border-[color:var(--rule)]">
            <h2 className="font-display text-2xl">Your cart</h2>
            <button
              onClick={close}
              aria-label="Close cart"
              className="h-8 w-8 text-lg hover:text-[color:var(--accent)] transition-colors"
            >
              ✕
            </button>
          </header>

          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-10 text-center">
                <div className="text-5xl mb-6 opacity-40">🎂</div>
                <p className="eyebrow mb-4">Your cart is empty</p>
                <p className="text-sm text-[color:var(--fg-muted)] mb-8">
                  Every cake is made to order in our atelier. Choose something memorable.
                </p>
                <Link href="/shop" onClick={close} className="btn-ghost">
                  Visit the shop
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-[color:var(--rule)]">
                {items.map((item) => (
                  <li key={item.slug} className="p-6 flex gap-4">
                    <div
                      className="w-20 h-20 flex-shrink-0 flex items-center justify-center text-4xl border border-[color:var(--rule)]"
                      style={{ backgroundColor: item.imageAccent + '20' }}
                    >
                      {item.imageEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={close}
                          className="font-display text-lg leading-tight hover:text-[color:var(--accent)] transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => remove(item.slug)}
                          aria-label={`Remove ${item.name}`}
                          className="text-xs text-[color:var(--fg-muted)] hover:text-[color:var(--accent)]"
                        >
                          remove
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-[color:var(--rule)]">
                          <button
                            onClick={() => setQuantity(item.slug, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="h-8 w-8 hover:bg-[color:var(--bg-alt)] transition-colors"
                          >
                            −
                          </button>
                          <span className="h-8 w-10 flex items-center justify-center text-sm tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(item.slug, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="h-8 w-8 hover:bg-[color:var(--bg-alt)] transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm tabular-nums">
                          {formatPrice(item.priceCents * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <footer className="border-t border-[color:var(--rule)] p-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="font-display text-2xl tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs text-[color:var(--fg-muted)] leading-relaxed">
                Taxes and delivery calculated at checkout. Lead times apply — see each cake for details.
              </p>
              <button className="btn-primary w-full" disabled>
                Checkout — available Phase II
              </button>
              <button
                onClick={clear}
                className="w-full text-center text-[11px] uppercase tracking-[0.22em] text-[color:var(--fg-muted)] hover:text-[color:var(--accent)] transition-colors"
              >
                Clear cart
              </button>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
}
