-- ─────────────────────────────────────────────────────────────
-- Maison Saveur — SQLite schema
-- All timestamps are ISO-8601 strings (UTC).
-- ─────────────────────────────────────────────────────────────

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- ── Users (storefront customers) ─────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT    NOT NULL UNIQUE,
  password_hash TEXT    NOT NULL,
  name          TEXT,
  phone         TEXT,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ── Admin users (atelier / studio staff) ─────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT    NOT NULL UNIQUE,
  password_hash TEXT    NOT NULL,
  name          TEXT,
  role          TEXT    NOT NULL DEFAULT 'admin' CHECK (role IN ('admin','owner','editor')),
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ── Products (the cakes) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  slug           TEXT    NOT NULL UNIQUE,
  name           TEXT    NOT NULL,
  tagline        TEXT,
  description    TEXT    NOT NULL,
  ingredients    TEXT    NOT NULL,  -- JSON array (string)
  allergens      TEXT    NOT NULL,  -- JSON array (string)
  category       TEXT    NOT NULL CHECK (category IN ('signature','seasonal','wedding','bespoke')),
  price_cents    INTEGER NOT NULL CHECK (price_cents >= 0),
  serves         TEXT    NOT NULL,  -- e.g. "Serves 8–10"
  lead_time_days INTEGER NOT NULL DEFAULT 2 CHECK (lead_time_days >= 0),
  image_emoji    TEXT    NOT NULL DEFAULT '🎂',
  image_accent   TEXT    NOT NULL DEFAULT '#e8d7b5',  -- palette accent
  featured       INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0,1)),
  in_stock       INTEGER NOT NULL DEFAULT 1 CHECK (in_stock IN (0,1)),
  created_at     TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_slug     ON products(slug);

-- ── Orders ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id          INTEGER,
  guest_email      TEXT,
  status           TEXT    NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending','confirmed','preparing','ready','delivered','cancelled')),
  subtotal_cents   INTEGER NOT NULL CHECK (subtotal_cents >= 0),
  tax_cents        INTEGER NOT NULL DEFAULT 0 CHECK (tax_cents >= 0),
  total_cents      INTEGER NOT NULL CHECK (total_cents >= 0),
  delivery_method  TEXT    NOT NULL DEFAULT 'pickup' CHECK (delivery_method IN ('pickup','delivery')),
  delivery_address TEXT,
  notes            TEXT,
  created_at       TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT    NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_user   ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- ── Order items (line items) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id        INTEGER NOT NULL,
  product_id      INTEGER NOT NULL,
  product_name    TEXT    NOT NULL,  -- snapshot at purchase time
  unit_price_cents INTEGER NOT NULL CHECK (unit_price_cents >= 0),
  quantity        INTEGER NOT NULL CHECK (quantity > 0),
  line_total_cents INTEGER NOT NULL CHECK (line_total_cents >= 0),
  FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_order_items_order   ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);
