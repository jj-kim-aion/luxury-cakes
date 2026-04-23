import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    const { count } = db.prepare('SELECT COUNT(*) AS count FROM products').get() as {
      count: number;
    };
    return NextResponse.json({
      status: 'ok',
      service: 'maison-saveur',
      phase: 1,
      products: count,
      time: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { status: 'degraded', error: String(err) },
      { status: 503 },
    );
  }
}
