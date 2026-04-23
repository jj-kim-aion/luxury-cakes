import Link from 'next/link';
import { getAllProducts, CATEGORIES } from '@/lib/db';
import { ProductCard } from '@/components/products/ProductCard';
import { Aurora } from '@/components/visual/Aurora';
import { Orbs } from '@/components/visual/Orbs';
import { Spotlight } from '@/components/visual/Spotlight';
import { CakePlate } from '@/components/visual/CakePlate';
import { Reveal } from '@/components/visual/Reveal';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  // All 6 seeded products — full signature collection in Glass Cards.
  const products = getAllProducts({ sort: 'featured' });
  const hero = products[0];

  return (
    <>
      {/* ───────────────────── HERO ─────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)' }}
      >
        {/* Aurora background — DESIGN.md §8.1 */}
        <div className="absolute inset-0 z-0">
          <Aurora />
        </div>
        {/* Floating orbs — §8.3 */}
        <div className="absolute inset-0 z-[1]">
          <Orbs count={14} />
        </div>
        {/* Cream wash for contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 0%, var(--bg-primary) 100%)' }}
        />

        <div
          className="container-luxe relative z-10 grid md:grid-cols-12 gap-10 items-center"
          style={{ paddingBottom: 'clamp(5rem, 10vw, 10rem)' }}
        >
          {/* Copy — 7 cols, left-aligned editorial */}
          <div className="md:col-span-7">
            <Reveal>
              <span className="eyebrow">Est. 2019 · London · Small batch</span>
            </Reveal>
            <Reveal delay={80}>
              <h1
                className="display-heading mt-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Handcrafted,{' '}
                <em>with patience.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="lead mt-8">
                Maison Saveur is a London atelier composing heirloom cakes in small batches.
                Signature flavours, seasonal chapters, wedding architecture, and bespoke
                commissions — every piece is hand-finished and signed by the chef pâtissier.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/shop" className="btn-primary">
                  See the collection
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor"
                       strokeWidth="1.5" aria-hidden="true">
                    <line x1="0" y1="5" x2="15" y2="5" strokeLinecap="round" />
                    <polyline points="11,1 15,5 11,9" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                </Link>
                <Link href="/shop?category=bespoke" className="btn-secondary">
                  Commission a bespoke cake
                </Link>
              </div>
            </Reveal>

            {/* Meta strip — tasting notes teaser */}
            <Reveal delay={320}>
              <dl className="mt-14 grid grid-cols-3 gap-8 max-w-md">
                <div>
                  <dt className="eyebrow">Tradition</dt>
                  <dd className="mt-2 font-display text-xl font-medium">Paris</dd>
                </div>
                <div>
                  <dt className="eyebrow">Refinement</dt>
                  <dd className="mt-2 font-display text-xl font-medium">Tokyo</dd>
                </div>
                <div>
                  <dt className="eyebrow">Home</dt>
                  <dd className="mt-2 font-display text-xl font-medium">London</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Hero image — 5 cols, morphing blob mask (§8.5) */}
          <div className="md:col-span-5 relative">
            <Reveal delay={120}>
              <div className="relative aspect-[3/4] w-full max-w-[460px] mx-auto">
                <div
                  className="absolute inset-0 overflow-hidden blob-mask"
                  style={{
                    boxShadow: 'var(--shadow-hero)',
                    willChange: 'border-radius',
                  }}
                >
                  {hero ? (
                    <CakePlate accent={hero.imageAccent} tiers={3} />
                  ) : (
                    <CakePlate accent="#D4A5A5" tiers={3} />
                  )}
                </div>

                {/* Signature sticker */}
                <div
                  className="absolute -bottom-4 -right-2 md:-right-6 z-20 rounded-full grid place-items-center"
                  style={{
                    background: 'var(--color-ink)',
                    color: 'var(--color-cream)',
                    width: 120,
                    height: 120,
                    boxShadow: 'var(--shadow-card)',
                    transform: 'rotate(-8deg)',
                  }}
                >
                  <div className="text-center">
                    <div className="eyebrow" style={{ color: 'var(--color-gold)' }}>
                      № 001
                    </div>
                    <div className="mt-1 font-display italic text-sm leading-tight">
                      {hero?.name ?? 'Noir Velvet'}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 eyebrow flex flex-col items-center gap-2 opacity-60"
          aria-hidden="true"
        >
          <span>Scroll</span>
          <span
            className="h-8 w-px"
            style={{ background: 'var(--fg-muted)' }}
          />
        </div>
      </section>

      {/* ────────────── CHAPTER 1 · THE PROBLEM ─────────────── */}
      <section
        className="border-t"
        style={{
          borderColor: 'var(--border-hair)',
          paddingBlock: 'var(--section-y)',
          background: 'var(--bg-primary)',
        }}
      >
        <div className="container-luxe grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <Reveal className="md:col-span-7 md:pt-6">
            <span className="eyebrow">Chapter I · The problem</span>
            <h2 className="mt-6 font-display text-h1 font-medium leading-tight tracking-tight">
              Most cakes have{' '}
              <em className="italic text-fg-muted">forgotten why they exist.</em>
            </h2>
            <div className="mt-8 space-y-6 text-lead text-fg-secondary">
              <p>
                Mass production has hollowed out what should be a gesture of care.
                Fondant shells hide industrial sponge. Colour runs instead of composition.
                The cake arrives and no one remembers it in the morning.
              </p>
              <p>
                We think the opposite. A cake ought to be a small architecture — each
                layer reasoned, each flavour chosen for the hour at which it will be served.
                It should be the thing you describe, not the thing on the table.
              </p>
            </div>
            <Link href="/shop?category=signature" className="btn-link mt-10">
              The philosophy
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <Reveal className="md:col-span-5" delay={80}>
            <figure className="relative">
              <div className="aspect-[4/5] rounded-xl overflow-hidden relative"
                   style={{ boxShadow: 'var(--shadow-card)' }}>
                <CakePlate accent="#B27A7A" tiers={2} />
              </div>
              <figcaption className="mt-4 eyebrow">
                — Plate studies · Atelier archive
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ────────────── CHAPTER 2 · THE CRAFT ───────────────── */}
      <section
        className="relative border-t overflow-hidden"
        style={{
          borderColor: 'var(--border-hair)',
          background: 'var(--bg-surface)',
          paddingBlock: 'var(--section-y)',
        }}
      >
        <div className="container-luxe">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Chapter II · The craft</span>
            <h2 className="mt-6 font-display text-h1 font-medium leading-tight tracking-tight">
              Three days,{' '}
              <em className="italic text-fg-muted">from first fold to final finish.</em>
            </h2>
            <p className="lead mt-6">
              Every composition is hand-built in stages — no shortcuts, no machinery
              where a hand will do.
            </p>
          </Reveal>

          {/* 8/4 asymmetric craft steps (anti-symmetry per §11) */}
          <div className="mt-16 md:mt-20 grid md:grid-cols-12 gap-8">
            {[
              {
                n: '01',
                title: 'Source',
                body: 'Valrhona chocolate, Normandy butter, Sicilian pistachios, Amarena cherries. Nothing on the ingredient list you cannot trace to a farm.',
                accent: '#C9A96A',
              },
              {
                n: '02',
                title: 'Compose',
                body: 'The chef pâtissier draws every cake in section — layer by layer — before the first egg is cracked. Flavour has architecture.',
                accent: '#D4A5A5',
              },
              {
                n: '03',
                title: 'Finish',
                body: 'Hand-piped. Hand-smoothed. Hand-gilded. Each piece is signed before it leaves the atelier. No piece is identical.',
                accent: '#4A2E26',
              },
            ].map((step, i) => (
              <Reveal
                key={step.n}
                className={`md:col-span-4 ${i === 1 ? 'md:translate-y-8' : ''}`}
                delay={i * 120}
              >
                <article
                  className="rounded-xl p-8 h-full flex flex-col transition-transform duration-base ease-out-soft hover:-translate-y-1"
                  style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-hair)',
                    boxShadow: 'var(--shadow-soft)',
                    willChange: 'transform',
                  }}
                >
                  <div
                    className="font-display text-6xl font-medium leading-none"
                    style={{ color: step.accent }}
                  >
                    {step.n}
                  </div>
                  <h3 className="mt-6 font-display text-2xl md:text-3xl font-medium tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-fg-secondary leading-relaxed text-[15px]">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── CHAPTER 3 · SIGNATURE COLLECTION ────────── */}
      <section
        className="relative border-t overflow-hidden"
        style={{
          borderColor: 'var(--border-hair)',
          background: 'var(--color-cocoa)',
          color: 'var(--color-cream)',
          paddingBlock: 'var(--section-y)',
        }}
      >
        {/* Spotlight §8.2 */}
        <Spotlight />

        <div className="container-luxe relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
              <div>
                <span
                  className="eyebrow"
                  style={{ color: 'rgba(250, 246, 240, 0.65)' }}
                >
                  Chapter III · The collection
                </span>
                <h2
                  className="mt-6 font-display text-h1 font-medium leading-[1.02] tracking-tight max-w-3xl"
                >
                  Six signatures,{' '}
                  <em className="italic" style={{ color: 'rgba(250, 246, 240, 0.65)' }}>
                    each with a name.
                  </em>
                </h2>
              </div>
              <Link
                href="/shop"
                className="btn-link self-start md:self-auto"
                style={{ color: 'var(--color-gold)' }}
              >
                View the full atelier
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} variant="glass" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── CHAPTER 4 · CATEGORIES ────────────────── */}
      <section
        className="relative border-t"
        style={{
          borderColor: 'var(--border-hair)',
          paddingBlock: 'var(--section-y)',
        }}
      >
        <div className="container-luxe">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Entrances</span>
            <h2 className="mt-6 font-display text-h1 font-medium leading-tight tracking-tight">
              Four ways{' '}
              <em className="italic text-fg-muted">to begin.</em>
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.value} delay={i * 80}>
                <Link
                  href={`/shop?category=${c.value}`}
                  className="group relative block rounded-xl p-8 h-[240px] flex flex-col justify-between overflow-hidden
                             transition-transform duration-base ease-out-soft hover:-translate-y-1
                             focus-visible:outline-none"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-hair)',
                    willChange: 'transform',
                  }}
                >
                  <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="font-display text-3xl md:text-4xl font-medium leading-tight tracking-tight
                                    transition-colors duration-base group-hover:text-rose-deep">
                      {c.label}
                    </div>
                    <div className="mt-2 text-sm text-fg-muted">{c.blurb}</div>
                    <div
                      className="mt-6 text-[11px] uppercase tracking-luxe font-medium
                                 opacity-0 translate-y-2 transition-all duration-base ease-out-soft
                                 group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      Explore →
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CLIMAX CTA (full-bleed cocoa) ──────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'var(--color-ink)',
          color: 'var(--color-cream)',
          paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        }}
      >
        {/* Subtle aurora rekindle */}
        <div className="absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true">
          <Aurora />
        </div>

        <div className="container-luxe relative z-10 grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <span
              className="eyebrow"
              style={{ color: 'rgba(250, 246, 240, 0.55)' }}
            >
              Bespoke commissions
            </span>
            <h2 className="mt-6 font-display text-h1 font-medium leading-[1.05] tracking-tight">
              Designing a wedding,{' '}
              <em className="italic opacity-70">
                an opening, a once-in-a-life?
              </em>
            </h2>
          </Reveal>

          <Reveal className="md:justify-self-end" delay={100}>
            <p
              className="max-w-md mb-8 leading-relaxed text-[17px]"
              style={{ color: 'rgba(250, 246, 240, 0.75)' }}
            >
              Our bespoke commissions begin with a conversation. Share the occasion —
              your palette, your people, the note you want remembered — and we&apos;ll
              compose the rest.
            </p>
            <Link href="/shop?category=bespoke" className="btn-primary">
              Begin a commission
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor"
                   strokeWidth="1.5" aria-hidden="true">
                <line x1="0" y1="5" x2="15" y2="5" strokeLinecap="round" />
                <polyline points="11,1 15,5 11,9" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ──────────── PRESS MARQUEE (§8.6) ──────────────────── */}
      <section
        className="relative border-t"
        style={{
          borderColor: 'var(--border-hair)',
          background: 'var(--bg-surface)',
          paddingBlock: 'clamp(2.5rem, 5vw, 4rem)',
        }}
        aria-labelledby="press-label"
      >
        <div className="container-luxe mb-6">
          <span id="press-label" className="eyebrow">
            As featured in
          </span>
        </div>
        <div className="marquee" role="presentation">
          <div className="marquee-track">
            {PRESS.concat(PRESS).map((item, i) => (
              <span
                key={i}
                className="font-display italic text-2xl md:text-3xl whitespace-nowrap"
                style={{ color: 'var(--fg-muted)' }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const PRESS = [
  'Vogue · “A patience economy of pastry.”',
  'Condé Nast Traveller · “The cake you remember.”',
  'Financial Times HTSI · “Quietly the best in London.”',
  'Monocle · “Editorial in the truest sense.”',
  'Observer Food Monthly · “Every layer justified.”',
];
