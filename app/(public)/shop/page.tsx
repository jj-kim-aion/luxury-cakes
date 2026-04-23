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
  return value && valid.includes(value)
    ? (value as 'price-asc' | 'price-desc' | 'name' | 'featured')
    : undefined;
}

export default function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const category = parseCategory(searchParams.category);
  const search = searchParams.q?.trim() || undefined;
  const sort = parseSort(searchParams.sort);

  const products = getAllProducts({ category, search, sort });
  const categoryMeta = category ? CATEGORIES.find((c) => c.value === category) : null;

  return (
    <>
      {/* ─── Header ─────────────────────────────────────── */}
      <section
        className="relative border-b overflow-hidden"
        style={{ borderColor: 'var(--border-hair)' }}
      >
        <div
          className="container-luxe"
          style={{
            paddingTop: 'clamp(4rem, 8vw, 7rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          <span className="eyebrow">
            {categoryMeta ? categoryMeta.blurb : 'The full collection'}
          </span>
          <h1 className="mt-6 font-display text-display font-medium leading-[1.02] tracking-tight max-w-4xl">
            {categoryMeta ? (
              <>
                {categoryMeta.label}{' '}
                <em className="italic text-fg-muted">cakes.</em>
              </>
            ) : (
              <>
                Shop{' '}
                <em className="italic text-fg-muted">the collection.</em>
              </>
            )}
          </h1>
          <p className="lead mt-8">
            Every cake is made to order in our atelier. Lead times vary by composition —
            see each piece for the detail. Collection or London delivery.
          </p>
        </div>
      </section>

      {/* ─── Filters ────────────────────────────────────── */}
      <section
        className="border-b sticky top-[72px] md:top-[76px] z-20"
        style={{
          borderColor: 'var(--border-hair)',
          background: 'var(--bg-elevated)',
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
        }}
      >
        <div className="container-luxe py-5">
          <Suspense
            fallback={<div className="eyebrow animate-shimmer">Loading filters…</div>}
          >
            <ShopFilters />
          </Suspense>
        </div>
      </section>

      {/* ─── Grid ───────────────────────────────────────── */}
      <section>
        <div
          className="container-luxe"
          style={{
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          }}
        >
          <div className="mb-10 flex items-baseline justify-between">
            <p className="eyebrow">
              {products.length} {products.length === 1 ? 'cake' : 'cakes'}
              {search ? (
                <span className="ml-3 normal-case tracking-normal text-fg-muted">
                  for “{search}”
                </span>
              ) : null}
            </p>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}
