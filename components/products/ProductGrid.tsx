import type { Product } from '@/lib/products';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
  variant?: 'default' | 'glass';
  emptyHeading?: string;
  emptyBody?: string;
};

export function ProductGrid({
  products,
  variant = 'default',
  emptyHeading = 'No cakes match your filters',
  emptyBody = 'Try a different category, or clear your search to see the full collection.',
}: Props) {
  if (products.length === 0) {
    return (
      <div
        className="rounded-xl p-16 text-center"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-soft)',
        }}
      >
        {/* Abstract mark instead of emoji */}
        <div className="mx-auto mb-8 h-14 w-14 rounded-full grid place-items-center"
             style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-soft)' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor"
               strokeWidth="1.2" className="text-fg-muted" aria-hidden="true">
            <circle cx="10" cy="10" r="7" />
            <path d="M4 14 L16 14" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="font-display text-3xl md:text-4xl mb-3 tracking-tight">
          {emptyHeading}
        </h2>
        <p className="text-sm text-fg-muted max-w-md mx-auto leading-relaxed">
          {emptyBody}
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {products.map((p, i) => (
        <li
          key={p.id}
          className="animate-fade-up"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <ProductCard product={p} variant={variant} />
        </li>
      ))}
    </ul>
  );
}
