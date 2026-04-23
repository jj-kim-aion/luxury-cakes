'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { CartButton } from '@/components/cart/CartButton';

const NAV = [
  { href: '/', label: 'Atelier' },
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=wedding', label: 'Wedding' },
  { href: '/shop?category=bespoke', label: 'Bespoke' },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color:var(--bg)]/80 border-b border-[color:var(--rule)]">
      <div className="container-luxe flex items-center justify-between h-20">
        <Link
          href="/"
          aria-label="Maison Saveur — home"
          className="flex items-baseline gap-2 group"
        >
          <span className="font-display text-2xl tracking-tight">Maison</span>
          <span className="font-display italic text-2xl text-[color:var(--fg-muted)] group-hover:text-[color:var(--accent)] transition-colors duration-500">
            Saveur
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[12px] uppercase tracking-[0.22em]">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href.split('?')[0]));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline transition-colors duration-300
                  ${active ? 'text-[color:var(--fg)]' : 'text-[color:var(--fg-muted)] hover:text-[color:var(--fg)]'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
