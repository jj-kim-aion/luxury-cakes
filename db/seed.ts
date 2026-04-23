/**
 * db/seed.ts — Seed sample products + an admin user.
 * Safe to re-run: uses INSERT OR IGNORE keyed on slug/email.
 *
 * Usage:  npm run db:seed
 */
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'node:path';
import fs from 'node:fs';

const DB_PATH = process.env.DATABASE_PATH
  ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
  : path.resolve(process.cwd(), 'data/cakeshop.db');

if (!fs.existsSync(DB_PATH)) {
  console.error(`✘ database not found at ${DB_PATH}. Run \`npm run db:migrate\` first.`);
  process.exit(1);
}

type SeedProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  category: 'signature' | 'seasonal' | 'wedding' | 'bespoke';
  price_cents: number;
  serves: string;
  lead_time_days: number;
  image_emoji: string;
  image_accent: string;
  featured: 0 | 1;
};

const products: SeedProduct[] = [
  {
    slug: 'noir-velvet',
    name: 'Noir Velvet',
    tagline: 'Single-origin dark chocolate, black cherry, Tahitian vanilla',
    description:
      'Five layers of 70% Valrhona ganache folded with Amarena cherries from Modena, resting on a whisper of vanilla génoise. Finished with tempered dark chocolate shards and edible 24k gold leaf. Our most requested signature — a cake reserved for moments that matter.',
    ingredients: [
      '70% Valrhona dark chocolate',
      'Amarena cherries (Modena, IT)',
      'Tahitian vanilla',
      'Free-range eggs',
      'Normandy butter',
      'Cane sugar',
      'Edible 24k gold leaf',
    ],
    allergens: ['Milk', 'Eggs', 'Wheat', 'Soy'],
    category: 'signature',
    price_cents: 14500,
    serves: 'Serves 10–12',
    lead_time_days: 2,
    image_emoji: '🍰',
    image_accent: '#3c131b',
    featured: 1,
  },
  {
    slug: 'maison-rose',
    name: 'Maison Rose',
    tagline: 'Damask rose, pistachio praliné, Sicilian lemon',
    description:
      'A pale rose-petal mousse layered over pistachio praliné and a bright Sicilian lemon curd, all cradled in a delicate almond dacquoise. Hand-finished with crystallised rose petals and pistachio dust. Elegant, floral, never cloying.',
    ingredients: [
      'Damask rose extract',
      'Sicilian pistachios',
      'Sicilian lemon',
      'Almond flour',
      'Free-range eggs',
      'Double cream',
      'Crystallised rose petals',
    ],
    allergens: ['Milk', 'Eggs', 'Tree nuts', 'Almonds'],
    category: 'signature',
    price_cents: 13200,
    serves: 'Serves 8–10',
    lead_time_days: 2,
    image_emoji: '🌹',
    image_accent: '#c99aa6',
    featured: 1,
  },
  {
    slug: 'orchard-noir',
    name: 'Orchard Noir',
    tagline: 'Roasted fig, black honey, thyme crème brûlée',
    description:
      'A late-season ode to the orchard — slow-roasted Black Mission figs, black honey from Asturias, and a thyme-infused crème brûlée atop hazelnut sablé. Available only through the autumn harvest.',
    ingredients: [
      'Black Mission figs',
      'Asturian black honey',
      'Fresh thyme',
      'Piedmont hazelnuts',
      'Double cream',
      'Free-range eggs',
      'Demerara sugar',
    ],
    allergens: ['Milk', 'Eggs', 'Wheat', 'Tree nuts', 'Hazelnuts'],
    category: 'seasonal',
    price_cents: 12800,
    serves: 'Serves 8–10',
    lead_time_days: 3,
    image_emoji: '🫐',
    image_accent: '#4b2a3a',
    featured: 1,
  },
  {
    slug: 'citrus-blanc',
    name: 'Citrus Blanc',
    tagline: 'Yuzu, white chocolate, brown butter financier',
    description:
      'Bright, contemporary, and refreshingly restrained. Yuzu curd and Valrhona Opalys white chocolate chantilly over a brown-butter financier base. Served chilled — a palate-cleansing finale for any table.',
    ingredients: [
      'Japanese yuzu',
      'Valrhona Opalys white chocolate',
      'Brown butter',
      'Almond flour',
      'Free-range egg whites',
      'Fleur de sel',
    ],
    allergens: ['Milk', 'Eggs', 'Tree nuts', 'Almonds'],
    category: 'seasonal',
    price_cents: 11800,
    serves: 'Serves 8',
    lead_time_days: 2,
    image_emoji: '🍋',
    image_accent: '#e8d7b5',
    featured: 0,
  },
  {
    slug: 'ivory-cascade',
    name: 'Ivory Cascade',
    tagline: 'Three-tier wedding cake — vanilla, elderflower, champagne',
    description:
      'Our flagship three-tier wedding composition. Tahitian vanilla génoise, elderflower cordial soak, and Champagne buttercream, sheathed in hand-smoothed Italian meringue. Finished with sugared flowers hand-crafted in the atelier. Tastings by appointment.',
    ingredients: [
      'Tahitian vanilla',
      'Elderflower cordial',
      'Grand Cru Champagne',
      'Italian meringue buttercream',
      'Free-range eggs',
      'Normandy butter',
      'Sugared flowers',
    ],
    allergens: ['Milk', 'Eggs', 'Wheat', 'Sulphites'],
    category: 'wedding',
    price_cents: 68000,
    serves: 'Serves 80–100',
    lead_time_days: 21,
    image_emoji: '💍',
    image_accent: '#faf5ec',
    featured: 1,
  },
  {
    slug: 'atelier-bespoke',
    name: 'Atelier Bespoke',
    tagline: 'A cake designed around you — flavour, form, story',
    description:
      'Commission a one-of-one composition. We begin with a consultation: your occasion, your palette, the notes you love. Our chef pâtissier develops a custom flavour architecture and hand-drawn visual treatment — from modernist monoliths to hand-piped heritage pieces. Starts at £220.',
    ingredients: [
      'Custom — defined per commission',
    ],
    allergens: ['Varies by commission — we accommodate most dietary needs'],
    category: 'bespoke',
    price_cents: 22000,
    serves: 'Serves 10+ (by design)',
    lead_time_days: 14,
    image_emoji: '✨',
    image_accent: '#8a6d3c',
    featured: 0,
  },
];

function seed() {
  console.log('▸ Maison Saveur — seeding database');
  const db = new Database(DB_PATH);
  db.pragma('foreign_keys = ON');

  // ── Products ───────────────────────────────────────────────
  const insertProduct = db.prepare(`
    INSERT OR IGNORE INTO products
      (slug, name, tagline, description, ingredients, allergens, category,
       price_cents, serves, lead_time_days, image_emoji, image_accent, featured)
    VALUES
      (@slug, @name, @tagline, @description, @ingredients, @allergens, @category,
       @price_cents, @serves, @lead_time_days, @image_emoji, @image_accent, @featured)
  `);

  const tx = db.transaction((items: SeedProduct[]) => {
    let added = 0;
    for (const p of items) {
      const info = insertProduct.run({
        ...p,
        ingredients: JSON.stringify(p.ingredients),
        allergens: JSON.stringify(p.allergens),
      });
      if (info.changes > 0) added++;
    }
    return added;
  });

  const added = tx(products);
  console.log(`  ✓ products: ${added} inserted, ${products.length - added} already existed`);

  // ── Admin user ─────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@maisonsaveur.local';
  const adminPassword = process.env.ADMIN_PASSWORD || 'change-me-in-dev';
  const hash = bcrypt.hashSync(adminPassword, 10);

  const insertAdmin = db.prepare(`
    INSERT OR IGNORE INTO admin_users (email, password_hash, name, role)
    VALUES (?, ?, ?, 'owner')
  `);
  const adminRes = insertAdmin.run(adminEmail, hash, 'Atelier Owner');
  if (adminRes.changes > 0) {
    console.log(`  ✓ admin seeded: ${adminEmail}`);
  } else {
    console.log(`  ✓ admin already exists: ${adminEmail}`);
  }

  db.close();
  console.log('✔ seed complete\n');
}

try {
  seed();
} catch (err) {
  console.error('✘ seed failed:', err);
  process.exit(1);
}
