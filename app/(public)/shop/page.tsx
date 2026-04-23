import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllProducts, CATEGORIES, type ProductCategory } from '@/lib/db';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ShopFilters } from '@/components/products/ShopFilters';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Shop the collection',
  description:
    'Browse Maison Saveur signature cakes, seasonal compositions, wedding tiers, and bespoke commissions.',
};

type SearchParams = {
  category?: string;
  q?: string;
  sort?: string;
};

function parseCategory(value?: string): ProductCategory | undefined {
  const valid: ProductCategory[] = ['signature', 'seasonal', 'wedding', 'bespoke'];
  return value && (valid as string[]).includes(value) ? (value as ProductCategory) : undefined;
}

function parseSort(value?: string): 'price-asc' | 'price-desc' | 'name' | 'featured' | undefined {
  const valid = ['price-asc', 'price-desc', 'name', 'featured'];
  return value && valid.includes(value) ? (value as 'price-asc' | 'price-desc' | 'name' | 'featured') : undefined;
}

export default function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const category = parseCategory(searchParams.category);
  const search = searchParams.q?.trim() || undefined;
  const sort = parseSort(searchParams.sort);

  const products = getAllProducts({ category, search, sort });
  const categoryMeta = category ? CATEGORIES.find((c) => c.value === category) : null;

  return (
    <>
      {/* Header */}
      <section className="border-b border-[color:var(--rule)]">
        <div className="container-luxe pt-20 pb-14 md:pt-28 md:pb-20">
          <span className="eyebrow">{categoryMeta ? categoryMeta.blurb : 'The full collection'}</span>
          <h1 className="mt-4 font-display text-5xl md:text-7xl tracking-[-0.015em]">
            {categoryMeta ? (
              <>
                {categoryMeta.label} <span className="italic text-[color:var(--fg-muted)]">cakes.</span>
              </>
            ) : (
              <>
                Shop <span className="italic text-[color:var(--fg-muted)]">the collection.</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-[color:var(--fg-muted)] leading-relaxed">
            Every cake is made to order in our atelier. Lead times vary by composition — see
            each piece for details. Collection or London delivery.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-[color:var(--rule)] bg-[color:var(--bg-alt)]">
        <div className="container-luxe py-8">
          <Suspense fallback={<div className="eyebrow animate-shimmer">Loading filters…</div>}>
            <ShopFilters />
          </Suspense>
        </div>
      </section>

      {/* Grid */}
      <section>
        <div className="container-luxe py-16 md:py-24">
          <div className="mb-10 flex items-baseline justify-between">
            <p className="eyebrow">
              {products.length} {products.length === 1 ? 'cake' : 'cakes'}
              {search ? <span className="ml-2 normal-case tracking-normal text-[color:var(--fg-muted)]">for “{search}”</span> : null}
            </p>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}
