# Maison Saveur — Luxury Cake Atelier (Phase 1)

A Next.js 14 storefront for an artisan cake atelier. Phase 1 delivers the core public experience: home, shop (filter / search / sort), product detail, a persistent client-side cart, and mock auth API routes. Built on SQLite via `better-sqlite3` for zero-infra local dev.

---

## Stack

| Layer       | Choice                                             |
|-------------|----------------------------------------------------|
| Framework   | Next.js 14 (App Router), React 18, TypeScript      |
| Styling     | Tailwind CSS + custom warm/noir tokens, dark mode  |
| Data        | SQLite via `better-sqlite3` (file-backed)          |
| State       | Zustand (cart, localStorage persistence)           |
| Fonts       | Playfair Display + Cormorant Garamond + Inter      |
| Target host | Vercel (works locally with `npm run dev`)          |

---

## Phase 1 scope

✅ Home page — editorial hero, featured cakes, trust signals, category grid, about preview, CTA band
✅ Shop page — product grid, category filters, free-text search, sort
✅ Product detail — emoji "image", full description, ingredients, allergens, serves, lead time, add-to-cart, related cakes
✅ Cart drawer — quantity controls, subtotal, localStorage persistence (checkout stub only)
✅ API routes — `GET /api/products`, `GET /api/products/[slug]`, `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/health`
✅ Database layer — schema, migration script, seed with 6 luxury products + admin user
✅ Dark / light mode — no FOUC (pre-paint theme script)

### Deferred to Phase 2
- Password hashing (Phase 1 uses `plain:` prefix — not for production)
- Real sessions / httpOnly cookies
- Payment processing
- Server-side cart / order creation
- Real product photography (emoji + gradient placeholders for now)
- Admin dashboard

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy the example environment file
cp .env.local.example .env.local

# 3. Initialize the database
npm run db:migrate
npm run db:seed

# 4. Run the dev server
npm run dev
# → open http://localhost:3000
```

To wipe the DB and re-seed from scratch:
```bash
npm run db:reset
```

---

## Project structure

```
luxury-cakes/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                 # Home
│   │   ├── shop/page.tsx            # Shop (filters + grid)
│   │   └── product/[slug]/
│   │       ├── page.tsx             # Product detail
│   │       └── not-found.tsx
│   ├── api/
│   │   ├── products/route.ts        # GET /api/products
│   │   ├── products/[slug]/route.ts # GET /api/products/[slug]
│   │   ├── auth/register/route.ts   # POST /api/auth/register
│   │   ├── auth/login/route.ts      # POST /api/auth/login
│   │   └── health/route.ts          # GET /api/health
│   ├── layout.tsx                   # Root layout + header/footer/cart
│   ├── globals.css                  # Tokens + component classes
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── ThemeScript.tsx          # Pre-paint theme hydration
│   │   └── ThemeToggle.tsx
│   ├── cart/
│   │   ├── CartButton.tsx
│   │   ├── CartDrawer.tsx
│   │   └── AddToCartButton.tsx
│   └── products/
│       ├── ProductCard.tsx
│       ├── ProductGrid.tsx
│       └── ShopFilters.tsx
├── lib/
│   ├── db.ts                        # SQLite singleton + typed queries
│   ├── format.ts                    # Price / pluralize / lead-time helpers
│   └── store/cart.ts                # Zustand cart store (persisted)
├── db/
│   ├── schema.sql                   # Full schema (5 tables)
│   ├── migrate.ts                   # Apply schema (idempotent)
│   └── seed.ts                      # Seed 6 products + admin user
├── data/                            # Runtime SQLite DB (gitignored)
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── .env.local.example
└── package.json
```

---

## Database schema

Five tables (see `db/schema.sql` for full DDL):

- **`users`** — storefront customers (email, password_hash, name, phone)
- **`admin_users`** — atelier staff (email, password_hash, role: admin/owner/editor)
- **`products`** — cakes (slug, name, tagline, description, ingredients JSON, allergens JSON, category, price_cents, serves, lead_time_days, image_emoji, image_accent, featured, in_stock)
- **`orders`** — customer orders (user_id, guest_email, status, totals, delivery info)
- **`order_items`** — order line items (order_id, product_id, snapshot of name + unit price, quantity)

All prices are stored in **pence (int)**; hydrate through `formatPrice()` for display.

### Seed data

6 signature cakes across all four categories:
- **Noir Velvet** — signature, £145
- **Maison Rose** — signature, £132
- **Orchard Noir** — seasonal, £128
- **Citrus Blanc** — seasonal, £118
- **Ivory Cascade** — wedding, £680
- **Atelier Bespoke** — bespoke, from £220

---

## API

All routes respond with JSON. No auth required in Phase 1.

| Method | Path                       | Query / Body                          | Response                          |
|--------|----------------------------|---------------------------------------|-----------------------------------|
| GET    | `/api/products`            | `?category=`, `?q=`, `?sort=`         | `{ count, products[] }`           |
| GET    | `/api/products/[slug]`     | —                                     | `{ product, related[] }` · 404    |
| POST   | `/api/auth/register`       | `{ email, password, name?, phone? }`  | `{ user, message }` · 400/409     |
| POST   | `/api/auth/login`          | `{ email, password }`                 | `{ user, token, message }` · 401  |
| GET    | `/api/health`              | —                                     | `{ status, products, time }`      |

### Example

```bash
curl http://localhost:3000/api/products?category=signature | jq
```

---

## Deployment notes (Vercel)

- `better-sqlite3` is a native module — already marked as an external server package in `next.config.mjs`.
- Vercel's serverless filesystem is **read-only**; for production you'll need a persistent DB (Turso, Neon, PlanetScale, or Vercel Postgres). Phase 1 is local-first.
- Build command: `npm run build`.

---

## Design language

- **Palette:** warm cream + deep noir + champagne gold + bordeaux accent
- **Type:** Playfair Display (display), Cormorant Garamond (italic accents), Inter (body / UI)
- **Motion:** GPU-safe only (`transform` / `opacity`), reduced-motion aware, 300–700ms cubic-bezier easing
- **Rhythm:** generous whitespace, asymmetric grids, editorial eyebrow labels, uppercase tracking (0.22–0.28em)
- **Light & dark:** honest dark mode (not just inverted) with warm-black base

---

## Scripts

```bash
npm run dev        # Next dev server
npm run build      # Production build
npm run start      # Run production build
npm run lint       # ESLint (next/core-web-vitals)
npm run db:migrate # Apply db/schema.sql
npm run db:seed    # Insert sample data
npm run db:reset   # Wipe + migrate + seed
```

---

Phase 1 · Maison Saveur Atelier · 2026
