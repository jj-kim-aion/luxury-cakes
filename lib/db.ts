/**
 * lib/db.ts — Singleton SQLite connection + typed query helpers.
 * Server-side only. Never import from a client component.
 */
import 'server-only';
import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import type { Product, ProductCategory } from './products';

export type { Product, ProductCategory } from './products';
export { CATEGORIES } from './products';

export interface ProductRow {
  id: number;
  slug: string;
  name: string;
  tagline: string | null;
  description: string;
  ingredients: string;      // JSON string
  allergens: string;        // JSON string
  category: ProductCategory;
  price_cents: number;
  serves: string;
  lead_time_days: number;
  image_emoji: string;
  image_accent: string;
  featured: number;         // 0 | 1
  in_stock: number;         // 0 | 1
  created_at: string;
  updated_at: string;
}

export interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

// ── Connection ───────────────────────────────────────────────
const DB_PATH = process.env.DATABASE_PATH
  ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
  : path.resolve(process.cwd(), 'data/cakeshop.db');

type BetterSqliteDb = ReturnType<typeof Database>;

declare global {
  // eslint-disable-next-line no-var
  var __maisonDb: BetterSqliteDb | undefined;
}

function openDb(): BetterSqliteDb {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

export function getDb(): BetterSqliteDb {
  if (!global.__maisonDb) {
    global.__maisonDb = openDb();
  }
  return global.__maisonDb;
}

// ── Formatting helpers ───────────────────────────────────────
export function formatPrice(cents: number): string {
  const pounds = cents / 100;
  return pounds.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function safeJsonArray(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function hydrateProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    ingredients: safeJsonArray(row.ingredients),
    allergens: safeJsonArray(row.allergens),
    category: row.category,
    priceCents: row.price_cents,
    price: formatPrice(row.price_cents),
    serves: row.serves,
    leadTimeDays: row.lead_time_days,
    imageEmoji: row.image_emoji,
    imageAccent: row.image_accent,
    featured: row.featured === 1,
    inStock: row.in_stock === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ── Product queries ──────────────────────────────────────────
export function getAllProducts(opts: {
  category?: ProductCategory;
  search?: string;
  sort?: 'price-asc' | 'price-desc' | 'name' | 'featured';
} = {}): Product[] {
  const db = getDb();
  const clauses: string[] = ['in_stock = 1'];
  const params: Record<string, unknown> = {};

  if (opts.category) {
    clauses.push('category = @category');
    params.category = opts.category;
  }

  if (opts.search && opts.search.trim().length > 0) {
    clauses.push('(LOWER(name) LIKE @q OR LOWER(tagline) LIKE @q OR LOWER(description) LIKE @q)');
    params.q = `%${opts.search.trim().toLowerCase()}%`;
  }

  let orderBy = 'featured DESC, name ASC';
  switch (opts.sort) {
    case 'price-asc':
      orderBy = 'price_cents ASC';
      break;
    case 'price-desc':
      orderBy = 'price_cents DESC';
      break;
    case 'name':
      orderBy = 'name ASC';
      break;
    case 'featured':
    default:
      break;
  }

  const sql = `SELECT * FROM products WHERE ${clauses.join(' AND ')} ORDER BY ${orderBy}`;
  const rows = db.prepare(sql).all(params) as ProductRow[];
  return rows.map(hydrateProduct);
}

export function getFeaturedProducts(limit = 3): Product[] {
  const db = getDb();
  const rows = db
    .prepare('SELECT * FROM products WHERE featured = 1 AND in_stock = 1 ORDER BY name ASC LIMIT ?')
    .all(limit) as ProductRow[];
  return rows.map(hydrateProduct);
}

export function getProductBySlug(slug: string): Product | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM products WHERE slug = ?').get(slug) as
    | ProductRow
    | undefined;
  return row ? hydrateProduct(row) : null;
}

export function getAllProductSlugs(): string[] {
  const db = getDb();
  const rows = db.prepare('SELECT slug FROM products').all() as Array<{ slug: string }>;
  return rows.map((r) => r.slug);
}

export function getRelatedProducts(currentSlug: string, category: ProductCategory, limit = 3): Product[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT * FROM products
       WHERE slug != ? AND in_stock = 1
       ORDER BY (category = ?) DESC, featured DESC, name ASC
       LIMIT ?`,
    )
    .all(currentSlug, category, limit) as ProductRow[];
  return rows.map(hydrateProduct);
}

// ── User queries (mock auth — Phase 1) ───────────────────────
export function findUserByEmail(email: string): UserRow | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase()) as
    | UserRow
    | undefined;
  return row ?? null;
}

export function createUser(input: {
  email: string;
  passwordHash: string;
  name?: string | null;
  phone?: string | null;
}): UserRow {
  const db = getDb();
  const info = db
    .prepare(
      `INSERT INTO users (email, password_hash, name, phone)
       VALUES (?, ?, ?, ?)`,
    )
    .run(
      input.email.toLowerCase(),
      input.passwordHash,
      input.name ?? null,
      input.phone ?? null,
    );
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid) as UserRow;
  return row;
}


