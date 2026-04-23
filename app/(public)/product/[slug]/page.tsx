import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from '@/lib/db';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { ProductCard } from '@/components/products/ProductCard';
import { leadTimeLabel } from '@/lib/format';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Not found' };
  return {
    title: product.name,
    description: product.tagline || product.description.slice(0, 160),
  };
}

export default function ProductDetailPage({ params }: { params: Params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug, product.category, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-[color:var(--rule)]">
        <div className="container-luxe py-5 text-xs uppercase tracking-[0.22em] text-[color:var(--fg-muted)]">
          <Link className="link-underline" href="/">Atelier</Link>
          <span className="mx-2">/</span>
          <Link className="link-underline" href="/shop">Shop</Link>
          <span className="mx-2">/</span>
          <Link className="link-underline" href={`/shop?category=${product.category}`}>
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[color:var(--fg)]">{product.name}</span>
        </div>
      </div>

      {/* Product */}
      <section>
        <div className="container-luxe py-12 md:py-20 grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Image */}
          <div className="lg:col-span-6">
            <div
              className="aspect-square flex items-center justify-center border border-[color:var(--rule)] relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${product.imageAccent}22 0%, ${product.imageAccent}55 100%)`,
              }}
            >
              <div
                className="text-[240px] leading-none animate-fade-in"
                style={{ willChange: 'transform' }}
                aria-hidden="true"
              >
                {product.imageEmoji}
              </div>
              <div className="absolute top-5 left-5 eyebrow bg-[color:var(--bg)] px-3 py-1.5">
                № {String(product.id).padStart(3, '0')}
              </div>
            </div>

            {/* Secondary thumbs (emoji repeated as compositional plates) */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square flex items-center justify-center border border-[color:var(--rule)] text-5xl opacity-70"
                  style={{
                    background: `linear-gradient(${45 + i * 40}deg, ${product.imageAccent}14 0%, ${product.imageAccent}33 100%)`,
                  }}
                  aria-hidden="true"
                >
                  {product.imageEmoji}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="eyebrow">{product.category}</span>
            <h1 className="mt-4 font-display text-5xl md:text-6xl tracking-[-0.015em] leading-[1.02]">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="mt-4 text-lg italic text-[color:var(--fg-muted)] leading-snug">
                {product.tagline}
              </p>
            )}

            <div className="mt-8 flex items-baseline gap-6">
              <span className="font-display text-4xl tabular-nums">{product.price}</span>
              <span className="eyebrow">{product.serves}</span>
            </div>

            <p className="mt-8 text-[color:var(--fg-muted)] leading-relaxed text-base">
              {product.description}
            </p>

            {/* Key facts */}
            <dl className="mt-10 grid grid-cols-2 gap-5 border-t border-b border-[color:var(--rule)] py-6">
              <div>
                <dt className="eyebrow">Lead time</dt>
                <dd className="mt-1 text-sm">{leadTimeLabel(product.leadTimeDays)}</dd>
              </div>
              <div>
                <dt className="eyebrow">Finish</dt>
                <dd className="mt-1 text-sm">Hand-finished</dd>
              </div>
              <div>
                <dt className="eyebrow">Category</dt>
                <dd className="mt-1 text-sm capitalize">{product.category}</dd>
              </div>
              <div>
                <dt className="eyebrow">Service</dt>
                <dd className="mt-1 text-sm">{product.serves}</dd>
              </div>
            </dl>

            {/* Add to cart */}
            <div className="mt-8">
              <AddToCartButton
                slug={product.slug}
                name={product.name}
                priceCents={product.priceCents}
                imageEmoji={product.imageEmoji}
                imageAccent={product.imageAccent}
              />
              <p className="mt-4 text-xs text-[color:var(--fg-muted)]">
                Made to order. Checkout returns in Phase II — your cart persists on this device.
              </p>
            </div>

            {/* Details — ingredients & allergens */}
            <div className="mt-12 space-y-8">
              <div>
                <div className="eyebrow mb-4">Ingredients</div>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-[color:var(--fg-muted)]">
                  {product.ingredients.map((i, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-2 h-px w-3 bg-[color:var(--fg-muted)] opacity-50 flex-shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="eyebrow mb-4">Allergens</div>
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map((a) => (
                    <span
                      key={a}
                      className="border border-[color:var(--rule)] px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-[color:var(--fg-muted)]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[color:var(--rule)] bg-[color:var(--bg-alt)]">
          <div className="container-luxe py-20 md:py-28">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="eyebrow">You may also love</span>
                <h2 className="mt-4 font-display text-3xl md:text-4xl">From the collection</h2>
              </div>
              <Link href="/shop" className="hidden md:inline-flex link-underline text-sm uppercase tracking-[0.22em]">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
