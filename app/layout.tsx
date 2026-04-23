import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Suspense } from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ThemeScript } from '@/components/layout/ThemeScript';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { GrainOverlay } from '@/components/visual/GrainOverlay';
import { ScrollProgress } from '@/components/visual/ScrollProgress';

export const metadata: Metadata = {
  title: {
    default: 'Maison Saveur — Artisan Cake Atelier',
    template: '%s · Maison Saveur',
  },
  description:
    'A luxury atelier crafting heirloom cakes — signature, seasonal, wedding, and bespoke. Hand-finished in small batches in London.',
  openGraph: {
    title: 'Maison Saveur — Artisan Cake Atelier',
    description: 'Luxury artisan cakes. Hand-finished, small batch.',
    type: 'website',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF6F0' },
    { media: '(prefers-color-scheme: dark)',  color: '#14100E' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DESIGN.md §2.1 — Cormorant Garamond (display) + Montserrat (body).
            Single request, subsetted latin, font-display: swap. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-bg-primary text-fg-primary">
        {/* Skip to main — a11y */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                     focus:px-4 focus:py-2 focus:bg-ink focus:text-cream focus:rounded-md"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <Suspense fallback={<HeaderFallback />}>
          <SiteHeader />
        </Suspense>
        <main id="main" className="flex-1 relative z-[2]">
          {children}
        </main>
        <SiteFooter />
        <CartDrawer />
        <GrainOverlay />
      </body>
    </html>
  );
}

/**
 * HeaderFallback — SSR-stable placeholder while the client-side
 * SiteHeader hydrates. Matches header height so CLS stays 0.
 */
function HeaderFallback() {
  return (
    <div
      className="sticky top-0 z-40 border-b"
      style={{ borderColor: 'transparent', height: '72px' }}
      aria-hidden="true"
    />
  );
}
