import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ThemeScript } from '@/components/layout/ThemeScript';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: {
    default: 'Maison Saveur — Artisan Cake Atelier',
    template: '%s · Maison Saveur',
  },
  description:
    'A luxury atelier crafting heirloom cakes — signature, seasonal, wedding, and bespoke. Hand-finished in small batches.',
  openGraph: {
    title: 'Maison Saveur — Artisan Cake Atelier',
    description: 'Luxury artisan cakes. Hand-finished, small batch.',
    type: 'website',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <ThemeScript />
      </head>
      <body className="grain min-h-screen flex flex-col antialiased">
        <SiteHeader />
        <main className="flex-1 relative z-[2]">{children}</main>
        <SiteFooter />
        <CartDrawer />
      </body>
    </html>
  );
}
