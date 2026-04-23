import Link from 'next/link';
import { getFeaturedProducts, CATEGORIES } from '@/lib/db';
import { ProductCard } from '@/components/products/ProductCard';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const featured = getFeaturedProducts(3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[color:var(--rule)]">
        <div className="container-luxe pt-24 pb-28 md:pt-32 md:pb-40 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 animate-fade-up">
            <span className="eyebrow">Est. 2019 · Small batch · Made to order</span>
            <h1 className="mt-6 font-display text-[52px] leading-[0.95] md:text-[88px] md:leading-[0.92] tracking-[-0.015em]">
              Cakes composed
              <br />
              <span className="italic text-[color:var(--fg-muted)]">like couture.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-[color:var(--fg-muted)] leading-relaxed">
              A London atelier crafting heirloom cakes in small batches — signature flavours,
              seasonal compositions, wedding tiers, and bespoke commissions. Every cake is
              hand-finished and signed by the chef pâtissier.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">
                Explore the collection →
              </Link>
              <Link href="/shop?category=bespoke" className="btn-ghost">
                Commission a bespoke cake
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 relative animate-fade-in">
            <div
              className="aspect-[3/4] flex items-center justify-center relative border border-[color:var(--rule)]"
              style={{
                background:
                  'linear-gradient(155deg, #e8d7b580 0%, #c99aa680 45%, #8b2e3f33 100%)',
              }}
            >
              <div
                className="text-[220px] leading-none animate-fade-up"
                style={{ willChange: 'transform' }}
                aria-hidden="true"
              >
                🍰
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between eyebrow">
                <span>№ 001 · Noir Velvet</span>
                <span>London</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust signals ─────────────────────────────────────── */}
      <section className="border-b border-[color:var(--rule)] bg-[color:var(--bg-alt)]">
        <div className="container-luxe py-14 grid grid-cols-2 md:grid-cols-4 gap-y-10">
          {[
            { k: 'Small batch', v: 'Made to order' },
            { k: 'Hand finished', v: 'Every detail, by hand' },
            { k: 'Heritage craft', v: 'French pâtissier tradition' },
            { k: 'Natural ingredients', v: 'No shortcuts, ever' },
          ].map((item) => (
            <div key={item.k} className="px-4 border-l border-[color:var(--rule)] first:border-l-0 md:border-l md:first:border-l">
              <div className="eyebrow">{item.k}</div>
              <div className="mt-2 font-display text-lg leading-tight">{item.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured ──────────────────────────────────────────── */}
      <section className="border-b border-[color:var(--rule)]">
        <div className="container-luxe py-24 md:py-32">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <span className="eyebrow">The collection</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">Signature cakes</h2>
            </div>
            <Link href="/shop" className="hidden md:inline-flex link-underline text-sm uppercase tracking-[0.22em]">
              View all →
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-[color:var(--fg-muted)]">No featured cakes at present — visit the shop.</p>
          )}

          <div className="mt-10 md:hidden">
            <Link href="/shop" className="btn-ghost w-full">View all cakes</Link>
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────── */}
      <section className="border-b border-[color:var(--rule)] bg-[color:var(--bg-alt)]">
        <div className="container-luxe py-24 md:py-32">
          <div className="max-w-xl">
            <span className="eyebrow">Categories</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Four ways <span className="italic text-[color:var(--fg-muted)]">to celebrate.</span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((c, i) => (
              <Link
                key={c.value}
                href={`/shop?category=${c.value}`}
                className="group card-frame p-8 flex flex-col justify-between min-h-[200px]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="font-display text-3xl group-hover:text-[color:var(--accent)] transition-colors duration-500">
                    {c.label}
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--fg-muted)]">{c.blurb}</div>
                  <div className="mt-5 text-[11px] uppercase tracking-[0.22em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Explore →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── About preview ─────────────────────────────────────── */}
      <section className="border-b border-[color:var(--rule)]">
        <div className="container-luxe py-24 md:py-32 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <div
              className="aspect-square flex items-center justify-center border border-[color:var(--rule)]"
              style={{
                background: 'linear-gradient(135deg, #c9a66b33 0%, #3c131b33 100%)',
              }}
            >
              <div className="text-[160px] leading-none" aria-hidden="true">✨</div>
            </div>
          </div>
          <div className="md:col-span-7">
            <span className="eyebrow">The atelier</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-[-0.015em]">
              A quiet obsession <span className="italic text-[color:var(--fg-muted)]">with the right detail.</span>
            </h2>
            <p className="mt-8 text-lg text-[color:var(--fg-muted)] leading-relaxed">
              We trained in Paris and Tokyo. We came home to London and built a studio where
              every cake is a small architecture — flavour by flavour, line by line. Nothing
              leaves the atelier without the chef&apos;s signature.
            </p>
            <p className="mt-4 text-lg text-[color:var(--fg-muted)] leading-relaxed">
              The result is cakes that taste the way they look: precise, warm, unmistakable.
            </p>
            <div className="mt-10">
              <Link href="/shop" className="btn-ghost">Step inside →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA band ──────────────────────────────────────────── */}
      <section className="bg-[color:var(--fg)] text-[color:var(--bg)]">
        <div className="container-luxe py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            Designing a wedding, <span className="italic opacity-70">an opening, a once-in-a-life?</span>
          </h2>
          <div className="md:justify-self-end">
            <p className="max-w-md opacity-80 mb-8 leading-relaxed">
              Our bespoke commissions begin with a conversation. Share the occasion — we&apos;ll
              compose the rest.
            </p>
            <Link
              href="/shop?category=bespoke"
              className="inline-flex items-center justify-center gap-2 border border-[color:var(--bg)] bg-transparent px-8 py-4 text-[11px] uppercase tracking-[0.24em] hover:bg-[color:var(--bg)] hover:text-[color:var(--fg)] transition-all duration-300"
            >
              Begin a commission →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
