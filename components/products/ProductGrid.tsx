import type { Product } from '@/lib/products';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
  emptyHeading?: string;
  emptyBody?: string;
};

export function ProductGrid({
  products,
  emptyHeading = 'No cakes match your filters',
  emptyBody = 'Try a different category, or clear your search to see the full collection.',
}: Props) {
  if (products.length === 0) {
    return (
      <div className="border border-[color:var(--rule)] p-16 text-center">
        <div className="text-5xl mb-6 opacity-40">✴</div>
        <h2 className="font-display text-2xl mb-3">{emptyHeading}</h2>
        <p className="text-sm text-[color:var(--fg-muted)] max-w-md mx-auto">{emptyBody}</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {products.map((p) => (
        <li key={p.id} className="animate-fade-up" style={{ animationDelay: `${p.id * 40}ms` }}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
