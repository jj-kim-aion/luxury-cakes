'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { CartButton } from '@/components/cart/CartButton';

const NAV = [
  { href: '/',                          label: 'Atelier' },
  { href: '/shop',                      label: 'Shop' },
  { href: '/shop?category=wedding',     label: 'Wedding' },
  { href: '/shop?category=bespoke',     label: 'Bespoke' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const params = useSearchParams();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const activeCategory = params?.get('category') || '';

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    const [path, qs] = href.split('?');
    if (pathname !== path) return false;
    if (!qs) return activeCategory === '';
    const want = new URLSearchParams(qs).get('category');
    return want === activeCategory;
  }

  return (
    <header
      className="sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-base ease-out-soft"
      style={{
        background: scrolled ? 'var(--bg-elevated)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
        borderColor: scrolled ? 'var(--border-soft)' : 'transparent',
      }}
    >
      <div className="container-luxe flex items-center justify-between gap-6 py-4 md:py-5">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Maison Saveur — home"
          className="flex items-baseline gap-2 group focus-visible:outline-none"
        >
          <span className="font-display text-2xl md:text-[1.75rem] font-medium tracking-tight text-fg-primary">
            Maison
          </span>
          <span className="font-display italic text-2xl md:text-[1.75rem] font-medium text-fg-muted group-hover:text-rose-deep transition-colors duration-base">
            Saveur
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-9"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              data-active={isActive(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <CartButton />
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden h-10 w-10 grid place-items-center rounded-md border border-border-soft text-fg-primary
                       transition-colors duration-base hover:border-border-strong"
            style={{ borderColor: 'var(--border-soft)' }}
          >
            <svg
              width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor"
              strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"
              style={{ transition: 'transform 300ms var(--ease-out-soft)', transform: mobileOpen ? 'rotate(90deg)' : 'none' }}
            >
              {mobileOpen ? (
                <>
                  <line x1="2" y1="2" x2="16" y2="12" />
                  <line x1="16" y1="2" x2="2" y2="12" />
                </>
              ) : (
                <>
                  <line x1="1" y1="3" x2="17" y2="3" />
                  <line x1="1" y1="11" x2="17" y2="11" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        id="mobile-nav"
        className="md:hidden overflow-hidden transition-[max-height,opacity] duration-slow ease-out-soft"
        style={{
          maxHeight: mobileOpen ? '360px' : '0',
          opacity: mobileOpen ? 1 : 0,
          background: 'var(--bg-elevated)',
          backdropFilter: 'blur(24px) saturate(140%)',
          WebkitBackdropFilter: 'blur(24px) saturate(140%)',
          borderTop: mobileOpen ? '1px solid var(--border-hair)' : '1px solid transparent',
        }}
      >
        <nav aria-label="Mobile" className="container-luxe py-6 flex flex-col gap-5">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link py-2"
              data-active={isActive(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
