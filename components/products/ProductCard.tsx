import Link from 'next/link';
import type { Product } from '@/lib/products';
import { CakePlate } from '@/components/visual/CakePlate';

type Props = {
  product: Product;
  priority?: boolean;
  variant?: 'default' | 'glass';
};

export function ProductCard({ product, variant = 'default' }: Props) {
  const tiers = product.category === 'wedding' ? 3 : product.category === 'bespoke' ? 3 : 2;
  const isGlass = variant === 'glass';

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group block relative rounded-xl overflow-hidden transition-transform duration-base ease-out-soft
                  focus-visible:outline-none ${isGlass ? 'glass-card' : ''}`}
      style={{
        background: isGlass ? undefined : 'var(--bg-surface)',
        border: isGlass ? undefined : '1px solid var(--border-soft)',
        willChange: 'transform',
      }}
    >
      {/* Media — CakePlate (no emoji, §11 compliant) */}
      <div className="product-media relative overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-slow ease-out-soft group-hover:scale-[1.04]"
          style={{ willChange: 'transform' }}
        >
          <CakePlate accent={product.imageAccent} tiers={tiers} />
        </div>

        {/* Meta ribbons */}
        {product.featured && (
          <span
            className="absolute top-4 left-4 eyebrow px-3 py-1.5 rounded-full"
            style={{
              background: 'var(--bg-elevated)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: 'var(--fg-primary)',
              border: '1px solid var(--border-hair)',
            }}
          >
            Signature
          </span>
        )}
        <span
          className="absolute top-4 right-4 eyebrow px-3 py-1.5 rounded-full capitalize"
          style={{
            background: 'var(--bg-elevated)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: 'var(--fg-primary)',
            border: '1px solid var(--border-hair)',
          }}
        >
          {product.category}
        </span>

        {/* Hover CTA strip */}
        <div
          className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between opacity-0 translate-y-2
                     group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-base ease-out-soft"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(74,46,38,0.55) 100%)',
            willChange: 'opacity, transform',
          }}
        >
          <span className="eyebrow" style={{ color: 'var(--color-cream)' }}>
            View composition
          </span>
          <svg
            width="20" height="10" viewBox="0 0 20 10" fill="none"
            stroke="currentColor" strokeWidth="1.4" style={{ color: 'var(--color-cream)' }}
            aria-hidden="true"
          >
            <line x1="0" y1="5" x2="19" y2="5" strokeLinecap="round" />
            <polyline points="14,1 19,5 14,9" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>

      {/* Copy */}
      <div className="p-6 flex flex-col gap-2 relative">
        <h3 className="font-display text-2xl md:text-[1.625rem] font-medium leading-tight tracking-tight text-fg-primary
                       group-hover:text-rose-deep transition-colors duration-base">
          {product.name}
        </h3>
        {product.tagline && (
          <p className="text-sm text-fg-muted leading-relaxed line-clamp-2">
            {product.tagline}
          </p>
        )}
        <div
          className="mt-3 pt-4 flex items-baseline justify-between border-t"
          style={{ borderColor: 'var(--border-hair)' }}
        >
          <span className="font-display text-xl md:text-2xl tabular-nums text-fg-primary">
            {product.price}
          </span>
          <span className="eyebrow">
            {product.serves.replace('Serves ', '')}
          </span>
        </div>
      </div>
    </Link>
  );
}
