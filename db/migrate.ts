/**
 * db/migrate.ts — Initialize the SQLite schema.
 * Idempotent: safe to run repeatedly. Creates data/ and applies schema.sql.
 *
 * Usage:  npm run db:migrate
 */
import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_PATH = process.env.DATABASE_PATH
  ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
  : path.join(DATA_DIR, 'cakeshop.db');
const SCHEMA_PATH = path.resolve(process.cwd(), 'db/schema.sql');

function ensureDataDir() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`  ✓ created ${path.relative(process.cwd(), dir)}/`);
  }
}

function runMigration() {
  console.log('▸ Maison Saveur — migrating database');
  console.log(`  db:     ${path.relative(process.cwd(), DB_PATH)}`);
  console.log(`  schema: ${path.relative(process.cwd(), SCHEMA_PATH)}`);

  ensureDataDir();

  if (!fs.existsSync(SCHEMA_PATH)) {
    throw new Error(`Schema file not found at ${SCHEMA_PATH}`);
  }

  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  const db = new Database(DB_PATH);

  try {
    db.exec(schema);
    console.log('  ✓ schema applied');
  } finally {
    db.close();
  }

  console.log('✔ migration complete\n');
}

try {
  runMigration();
} catch (err) {
  console.error('✘ migration failed:', err);
  process.exit(1);
}
