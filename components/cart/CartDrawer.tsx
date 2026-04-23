'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/store/cart';
import { formatPrice } from '@/lib/format';
import { CakePlate } from '@/components/visual/CakePlate';

export function CartDrawer() {
  const { isOpen, close, items, setQuantity, remove, subtotalCents, clear } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

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
      {/* Backdrop — cocoa tinted, never pure black */}
      <div
        aria-hidden="true"
        onClick={close}
        className="fixed inset-0 z-40 transition-opacity duration-slow ease-out-soft"
        style={{
          background: 'rgba(74, 46, 38, 0.45)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          willChange: 'opacity',
        }}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed top-0 right-0 h-full w-full sm:w-[460px] z-50 border-l
                   transition-transform duration-slow ease-out-soft"
        style={{
          background: 'var(--bg-primary)',
          borderColor: 'var(--border-hair)',
          boxShadow: 'var(--shadow-hero)',
          transform: isOpen ? 'translate3d(0,0,0)' : 'translate3d(100%,0,0)',
          willChange: 'transform',
        }}
      >
        <div className="h-full flex flex-col">
          <header
            className="flex items-center justify-between px-6 py-5 border-b"
            style={{ borderColor: 'var(--border-hair)' }}
          >
            <h2 className="font-display text-2xl font-medium">Your cart</h2>
            <button
              type="button"
              onClick={close}
              aria-label="Close cart"
              className="h-10 w-10 grid place-items-center rounded-md text-fg-primary
                         transition-colors duration-base hover:bg-bg-surface"
            >
              <X size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-10 py-16 text-center">
                <div className="mx-auto mb-8 h-16 w-16 rounded-full grid place-items-center"
                  style={{ background: 'var(--bg-surface)' }}>
                  <ShoppingBag size={24} strokeWidth={1.5} className="text-fg-muted" />
                </div>
                <p className="eyebrow mb-4">Your cart is empty</p>
                <p className="text-sm text-fg-muted max-w-xs mx-auto leading-relaxed mb-8">
                  Every cake is made to order in our atelier. Choose something memorable.
                </p>
                <Link href="/shop" onClick={close} className="btn-secondary">
                  Visit the shop
                </Link>
              </div>
            ) : (
              <ul className="divide-y" style={{ borderColor: 'var(--border-hair)' }}>
                {items.map((item) => (
                  <li key={item.slug} className="px-6 py-5 flex gap-4">
                    <div className="w-20 h-24 flex-shrink-0 rounded-md overflow-hidden relative">
                      <CakePlate accent={item.imageAccent} tiers={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={close}
                          className="font-display text-lg font-medium leading-tight hover:text-rose-deep transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(item.slug)}
                          aria-label={`Remove ${item.name}`}
                          className="text-[11px] uppercase tracking-luxe text-fg-muted hover:text-rose-deep transition-colors"
                        >
                          remove
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div
                          className="inline-flex items-center rounded-md border text-sm"
                          style={{ borderColor: 'var(--border-soft)' }}
                        >
                          <button
                            type="button"
                            onClick={() => setQuantity(item.slug, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="h-9 w-9 hover:bg-bg-surface transition-colors"
                          >
                            −
                          </button>
                          <span className="h-9 w-10 flex items-center justify-center tabular-nums"
                                style={{ borderLeft: '1px solid var(--border-soft)', borderRight: '1px solid var(--border-soft)' }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.slug, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="h-9 w-9 hover:bg-bg-surface transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-display text-lg tabular-nums">
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
            <footer
              className="border-t px-6 py-6 space-y-5"
              style={{ borderColor: 'var(--border-hair)' }}
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="font-display text-3xl tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs text-fg-muted leading-relaxed">
                Taxes and delivery calculated at checkout. Lead times apply — see each cake.
              </p>
              <button type="button" className="btn-primary w-full" disabled>
                Checkout — available Phase II
              </button>
              <button
                type="button"
                onClick={clear}
                className="w-full text-center text-[11px] uppercase tracking-luxe text-fg-muted hover:text-rose-deep transition-colors"
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
