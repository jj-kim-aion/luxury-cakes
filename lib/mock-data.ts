// Mock data for Vercel serverless (replaces SQLite)
// TODO: Replace with Turso/Neon/Postgres in production

import type { Product, ProductCategory } from './products';

export type { Product, ProductCategory };
export { CATEGORIES, PRODUCT_CATEGORIES } from './products';

const NOW = new Date().toISOString();

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'noir-velvet',
    name: 'Noir Velvet',
    tagline: 'Dark chocolate layers with glossy ganache',
    description: 'Our signature dark chocolate cake with five layers of Belgian chocolate mousse and a mirror glaze. A contemporary classic.',
    category: 'signature',
    priceCents: 8500,
    price: '$85.00',
    serves: 'Serves 8–12',
    leadTimeDays: 2,
    imageEmoji: '🍫',
    imageAccent: '#3D2817',
    ingredients: ['Dark chocolate', 'Cream', 'Butter', 'Eggs', 'Sugar'],
    allergens: ['Dairy', 'Eggs', 'Soy'],
    featured: true,
    inStock: true,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 2,
    slug: 'ivory-cascade',
    name: 'Ivory Cascade',
    tagline: 'White chocolate and raspberry layers',
    description: 'Delicate white chocolate cake with fresh raspberry coulis and vanilla buttercream. Light, fruity, and elegantly plated.',
    category: 'signature',
    priceCents: 7800,
    price: '$78.00',
    serves: 'Serves 6–10',
    leadTimeDays: 2,
    imageEmoji: '🍓',
    imageAccent: '#D4A5A5',
    ingredients: ['White chocolate', 'Raspberries', 'Cream', 'Vanilla', 'Eggs'],
    allergens: ['Dairy', 'Eggs'],
    featured: true,
    inStock: true,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 3,
    slug: 'citrus-blanc',
    name: 'Citrus Blanc',
    tagline: 'Lemon sponge with yuzu and white chocolate',
    description: 'A vibrant citrus experience: light lemon sponge, yuzu curd, and creamy white chocolate mousse with candied citrus peel.',
    category: 'seasonal',
    priceCents: 7200,
    price: '$72.00',
    serves: 'Serves 6–8',
    leadTimeDays: 2,
    imageEmoji: '🍋',
    imageAccent: '#F4D47F',
    ingredients: ['Lemon', 'Yuzu', 'White chocolate', 'Eggs', 'Butter'],
    allergens: ['Dairy', 'Eggs'],
    featured: false,
    inStock: true,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 4,
    slug: 'rose-garden',
    name: 'Rose Garden',
    tagline: 'Rose-infused sponge with pistachio cream',
    description: 'An editorial masterpiece: rose water sponge, pistachio mousse, candied rose petals, and a soft gold leaf accent.',
    category: 'signature',
    priceCents: 8900,
    price: '$89.00',
    serves: 'Serves 8–12',
    leadTimeDays: 3,
    imageEmoji: '🌹',
    imageAccent: '#C69088',
    ingredients: ['Rose water', 'Pistachio', 'Cream', 'Eggs', 'Gold leaf'],
    allergens: ['Dairy', 'Eggs', 'Tree nuts'],
    featured: true,
    inStock: true,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 5,
    slug: 'atelier-bespoke',
    name: 'Atelier Bespoke',
    tagline: 'Your vision, hand-painted by our artisans',
    description: 'Commission your own masterpiece. Choose your base, flavors, fillings, and artistic direction. Each cake is unique and unrepeatable.',
    category: 'bespoke',
    priceCents: 12000,
    price: '$120.00+',
    serves: 'Serves 10–50',
    leadTimeDays: 10,
    imageEmoji: '🎨',
    imageAccent: '#8B6F47',
    ingredients: ['Custom selection'],
    allergens: ['Variable — see consultation'],
    featured: false,
    inStock: true,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: 6,
    slug: 'wedding-elegance',
    name: 'Wedding Elegance',
    tagline: 'Three-tier celebration with custom accents',
    description: 'A wedding essential. Champagne sponge, mascarpone mousse, edible gold leaf, and room for your personal touches. Serves 30–40.',
    category: 'wedding',
    priceCents: 18500,
    price: '$185.00',
    serves: 'Serves 30–40',
    leadTimeDays: 5,
    imageEmoji: '💍',
    imageAccent: '#F4E4C1',
    ingredients: ['Champagne', 'Mascarpone', 'Eggs', 'Butter', 'Gold leaf'],
    allergens: ['Dairy', 'Eggs'],
    featured: false,
    inStock: true,
    createdAt: NOW,
    updatedAt: NOW,
  },
];

export function getAllProducts(opts?: {
  category?: string;
  search?: string;
  sort?: string;
}): Product[] {
  let results = [...MOCK_PRODUCTS];

  // Filter by category
  if (opts?.category) {
    results = results.filter((p) => p.category === opts.category);
  }

  // Filter by search
  if (opts?.search) {
    const q = opts.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  // Sort
  if (opts?.sort === 'price-asc') {
    results.sort((a, b) => a.priceCents - b.priceCents);
  } else if (opts?.sort === 'price-desc') {
    results.sort((a, b) => b.priceCents - a.priceCents);
  } else if (opts?.sort === 'name') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else if (opts?.sort === 'featured') {
    results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return results;
}

export function getProductBySlug(slug: string): Product | null {
  return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getRelatedProducts(
  slug: string,
  category: string,
  limit: number = 3,
): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.category === category && p.slug !== slug).slice(
    0,
    limit,
  );
}
