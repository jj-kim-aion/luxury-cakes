import Link from 'next/link';
import type { Product } from '@/lib/products';

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group card-frame flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]"
    >
      <div
        className="relative aspect-[4/5] overflow-hidden flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${product.imageAccent}22 0%, ${product.imageAccent}44 100%)`,
        }}
      >
        <div
          className="text-[128px] leading-none transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ willChange: 'transform' }}
          aria-hidden="true"
        >
          {product.imageEmoji}
        </div>
        {product.featured && (
          <span className="absolute top-4 left-4 eyebrow bg-[color:var(--bg)] px-2 py-1">
            Signature
          </span>
        )}
        <span className="absolute top-4 right-4 eyebrow">{product.category}</span>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-2">
        <h3 className="font-display text-2xl leading-tight group-hover:text-[color:var(--accent)] transition-colors duration-500">
          {product.name}
        </h3>
        {product.tagline && (
          <p className="text-sm text-[color:var(--fg-muted)] leading-relaxed line-clamp-2">
            {product.tagline}
          </p>
        )}
        <div className="mt-auto pt-5 flex items-baseline justify-between border-t border-[color:var(--rule)]">
          <span className="text-lg tabular-nums">{product.price}</span>
          <span className="eyebrow">{product.serves.replace('Serves ', '')}</span>
        </div>
      </div>
    </Link>
  );
}
