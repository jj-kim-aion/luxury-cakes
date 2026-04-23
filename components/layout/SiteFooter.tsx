import Link from 'next/link';
import { NewsletterForm } from './NewsletterForm';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-[2] border-t"
      style={{
        background: 'var(--color-cocoa)',
        color: 'var(--color-cream)',
        borderColor: 'var(--border-hair)',
      }}
    >
      {/* Top block */}
      <div className="container-luxe py-16 md:py-24 grid gap-12 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <div className="font-display text-4xl md:text-5xl font-medium leading-[1.02] tracking-tight">
            Maison{' '}
            <span className="italic opacity-70">Saveur</span>
          </div>
          <p
            className="mt-6 max-w-md text-base leading-relaxed"
            style={{ color: 'rgba(250, 246, 240, 0.70)' }}
          >
            An artisan cake atelier composing heirloom pieces in small batches.
            Hand-finished, made to order, signed by the chef pâtissier.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <a
              href="mailto:hello@maisonsaveur.local"
              className="btn-link"
              style={{ color: 'var(--color-cream)' }}
            >
              hello@maisonsaveur.local
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="md:col-span-2">
          <div className="eyebrow" style={{ color: 'rgba(250, 246, 240, 0.55)' }}>
            Shop
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link className="btn-link" href="/shop?category=signature" style={{ color: 'var(--color-cream)' }}>Signature</Link></li>
            <li><Link className="btn-link" href="/shop?category=seasonal" style={{ color: 'var(--color-cream)' }}>Seasonal</Link></li>
            <li><Link className="btn-link" href="/shop?category=wedding" style={{ color: 'var(--color-cream)' }}>Wedding</Link></li>
            <li><Link className="btn-link" href="/shop?category=bespoke" style={{ color: 'var(--color-cream)' }}>Bespoke</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="eyebrow" style={{ color: 'rgba(250, 246, 240, 0.55)' }}>
            Atelier
          </div>
          <ul
            className="mt-5 space-y-3 text-sm"
            style={{ color: 'rgba(250, 246, 240, 0.70)' }}
          >
            <li>12 Rue du Faubourg</li>
            <li>London, W1S</li>
            <li>Tue–Sat · 10–18</li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow" style={{ color: 'rgba(250, 246, 240, 0.55)' }}>
            Correspondence
          </div>
          <p
            className="mt-5 text-sm leading-relaxed"
            style={{ color: 'rgba(250, 246, 240, 0.70)' }}
          >
            A quarterly letter — seasonal menus, new signatures, atelier notes.
            No marketing, no urgency.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* Legal bar */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(250, 246, 240, 0.10)' }}
      >
        <div
          className="container-luxe py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 eyebrow"
          style={{ color: 'rgba(250, 246, 240, 0.55)' }}
        >
          <span>© {year} Maison Saveur · All rights reserved</span>
          <span>Crafted in London</span>
        </div>
      </div>
    </footer>
  );
}
