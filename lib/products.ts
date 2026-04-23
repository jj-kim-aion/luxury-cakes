/**
 * lib/products.ts — Pure types & constants safe to import from client code.
 * Never import from `lib/db.ts` here: that module depends on node:fs / better-sqlite3.
 */

export type ProductCategory = 'signature' | 'seasonal' | 'wedding' | 'bespoke';

export interface Product {
  id: number;
  slug: string;
  name: string;
  tagline: string | null;
  description: string;
  ingredients: string[];
  allergens: string[];
  category: ProductCategory;
  priceCents: number;
  price: string;
  serves: string;
  leadTimeDays: number;
  imageEmoji: string;
  imageAccent: string;
  featured: boolean;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export const CATEGORIES: Array<{ value: ProductCategory; label: string; blurb: string }> = [
  { value: 'signature', label: 'Signature', blurb: 'Our house canon' },
  { value: 'seasonal',  label: 'Seasonal',  blurb: 'Of the moment' },
  { value: 'wedding',   label: 'Wedding',   blurb: 'Tiered compositions' },
  { value: 'bespoke',   label: 'Bespoke',   blurb: 'Designed for you' },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = ['signature', 'seasonal', 'wedding', 'bespoke'];
