import Link from 'next/link';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--rule)] bg-[color:var(--bg-alt)] relative z-[2]">
      <div className="container-luxe py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl">
            Maison <span className="italic text-[color:var(--fg-muted)]">Saveur</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-[color:var(--fg-muted)] leading-relaxed">
            An artisan cake atelier crafting heirloom compositions in small batches. Everything is hand-finished,
            made to order, and signed by the chef pâtissier.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-5">Shop</div>
          <ul className="space-y-3 text-sm">
            <li><Link className="link-underline" href="/shop?category=signature">Signature</Link></li>
            <li><Link className="link-underline" href="/shop?category=seasonal">Seasonal</Link></li>
            <li><Link className="link-underline" href="/shop?category=wedding">Wedding</Link></li>
            <li><Link className="link-underline" href="/shop?category=bespoke">Bespoke</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-5">Atelier</div>
          <ul className="space-y-3 text-sm text-[color:var(--fg-muted)]">
            <li>12 Rue du Faubourg</li>
            <li>London, W1S</li>
            <li>Tue–Sat · 10–18</li>
            <li className="pt-2"><a className="link-underline text-[color:var(--fg)]" href="mailto:hello@maisonsaveur.local">hello@maisonsaveur.local</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--rule)]">
        <div className="container-luxe py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--fg-muted)]">
          <span>© {year} Maison Saveur · All rights reserved</span>
          <span>Phase&nbsp;I Storefront</span>
        </div>
      </div>
    </footer>
  );
}
