import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/lib/mock-data';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { ProductCard } from '@/components/products/ProductCard';
import { CakePlate } from '@/components/visual/CakePlate';
import { Spotlight } from '@/components/visual/Spotlight';
import { Reveal } from '@/components/visual/Reveal';
import { leadTimeLabel } from '@/lib/format';

type Params = { slug: string };

// Phase 1: stay on the server for every request so the header's
// `useSearchParams()` (client-only) never triggers a prerender bailout.
// Phase 2 can re-enable static generation after header refactor.
export const dynamic = 'force-dynamic';

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
  const tiers =
    product.category === 'wedding' || product.category === 'bespoke' ? 3 : 2;

  return (
    <>
      {/* ─── Breadcrumb ─────────────────────────────────── */}
      <div className="border-b" style={{ borderColor: 'var(--border-hair)' }}>
        <nav
          aria-label="Breadcrumb"
          className="container-luxe py-5 flex items-center gap-2 eyebrow overflow-x-auto no-scrollbar whitespace-nowrap"
        >
          <Link className="btn-link" href="/">Atelier</Link>
          <span className="text-fg-muted" aria-hidden="true">·</span>
          <Link className="btn-link" href="/shop">Shop</Link>
          <span className="text-fg-muted" aria-hidden="true">·</span>
          <Link
            className="btn-link"
            href={`/shop?category=${product.category}`}
          >
            {product.category}
          </Link>
          <span className="text-fg-muted" aria-hidden="true">·</span>
          <span className="text-fg-primary" style={{ letterSpacing: '0.05em' }}>
            {product.name}
          </span>
        </nav>
      </div>

      {/* ─── Product ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ paddingBlock: 'clamp(3rem, 7vw, 6rem)' }}
      >
        {/* Spotlight framing the key info area — §8.2 applied at reduced intensity */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          aria-hidden="true"
        >
          <Spotlight />
        </div>

        <div className="container-luxe relative z-10 grid lg:grid-cols-12 gap-10 md:gap-16">
          {/* Image column — 7/5 asymmetry */}
          <div className="lg:col-span-7">
            <Reveal>
              <figure
                className="relative rounded-xl overflow-hidden aspect-[4/5]"
                style={{ boxShadow: 'var(--shadow-hero)' }}
              >
                <CakePlate accent={product.imageAccent} tiers={tiers} />
                <div
                  className="absolute top-5 left-5 eyebrow px-3 py-1.5 rounded-full"
                  style={{
                    background: 'var(--bg-elevated)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid var(--border-hair)',
                    color: 'var(--fg-primary)',
                  }}
                >
                  № {String(product.id).padStart(3, '0')}
                </div>
              </figure>
            </Reveal>

            {/* Plate thumbnails — compositional studies, grain texture */}
            <Reveal delay={100}>
              <div className="mt-4 grid grid-cols-3 gap-3 md:gap-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md overflow-hidden relative"
                    style={{
                      border: '1px solid var(--border-hair)',
                      opacity: 0.85 - i * 0.05,
                    }}
                  >
                    <CakePlate accent={product.imageAccent} tiers={(i + 1) as 1 | 2 | 3} />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Info column — 5 cols */}
          <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-28 self-start">
            <Reveal>
              <span className="eyebrow capitalize">{product.category}</span>
              <h1 className="mt-4 font-display text-h1 font-medium leading-[1.02] tracking-tight">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="mt-4 font-display italic text-xl md:text-2xl text-fg-muted leading-snug">
                  {product.tagline}
                </p>
              )}

              <div className="mt-8 flex items-baseline gap-6">
                <span className="font-display text-5xl font-medium tabular-nums">
                  {product.price}
                </span>
                <span className="eyebrow">{product.serves}</span>
              </div>

              <p className="mt-8 text-fg-secondary leading-relaxed text-[15px] md:text-base">
                {product.description}
              </p>
            </Reveal>

            {/* Key facts */}
            <Reveal delay={80}>
              <dl
                className="mt-10 grid grid-cols-2 gap-5 py-6 border-y"
                style={{ borderColor: 'var(--border-hair)' }}
              >
                <div>
                  <dt className="eyebrow">Lead time</dt>
                  <dd className="mt-2 text-sm text-fg-primary">
                    {leadTimeLabel(product.leadTimeDays)}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Finish</dt>
                  <dd className="mt-2 text-sm text-fg-primary">Hand-finished</dd>
                </div>
                <div>
                  <dt className="eyebrow">Service</dt>
                  <dd className="mt-2 text-sm text-fg-primary">{product.serves}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Signature</dt>
                  <dd className="mt-2 text-sm text-fg-primary">
                    Chef pâtissier
                  </dd>
                </div>
              </dl>
            </Reveal>

            {/* CTA */}
            <Reveal delay={140}>
              <div className="mt-8">
                <AddToCartButton
                  slug={product.slug}
                  name={product.name}
                  priceCents={product.priceCents}
                  imageEmoji={product.imageEmoji}
                  imageAccent={product.imageAccent}
                />
                <p className="mt-4 text-xs text-fg-muted leading-relaxed max-w-sm">
                  Made to order. Checkout returns in Phase II — your cart persists on this
                  device so you can complete the reservation later.
                </p>
              </div>
            </Reveal>

            {/* Ingredients & allergens */}
            <Reveal delay={180}>
              <div className="mt-12 space-y-10">
                <div>
                  <div className="eyebrow mb-5">Ingredients</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-fg-secondary">
                    {product.ingredients.map((i, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-px w-3 flex-shrink-0"
                          style={{ background: 'var(--color-gold)' }}
                        />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="eyebrow mb-5">Allergens</div>
                  <div className="flex flex-wrap gap-2">
                    {product.allergens.map((a) => (
                      <span
                        key={a}
                        className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium rounded-md"
                        style={{
                          background: 'var(--bg-surface)',
                          color: 'var(--fg-secondary)',
                          border: '1px solid var(--border-hair)',
                        }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Related ────────────────────────────────────── */}
      {related.length > 0 && (
        <section
          className="border-t"
          style={{
            borderColor: 'var(--border-hair)',
            background: 'var(--bg-surface)',
            paddingBlock: 'var(--section-y)',
          }}
        >
          <div className="container-luxe">
            <Reveal className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="eyebrow">You may also love</span>
                <h2 className="mt-6 font-display text-h2 font-medium leading-tight tracking-tight">
                  From the collection
                </h2>
              </div>
              <Link href="/shop" className="btn-link">
                View all
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
