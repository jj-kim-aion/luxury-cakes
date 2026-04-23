/**
 * POST /api/auth/login — mock authentication (Phase 1).
 *
 * Returns a minimal "session" payload (a placeholder token, not a real JWT).
 * Phase 2 will replace this with real sessions + httpOnly cookies.
 */
import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 },
      );
    }

    const user = findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    // Phase 1 mock check: password stored as `plain:<password>`.
    const expected = user.password_hash.startsWith('plain:')
      ? user.password_hash.slice('plain:'.length)
      : null;

    if (expected === null || expected !== password) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      // Phase 1 placeholder token. Not cryptographically signed. Do not trust.
      token: `phase1-mock-${user.id}-${Date.now()}`,
      message: 'Signed in (Phase 1 mock).',
    });
  } catch (err) {
    console.error('POST /api/auth/login failed', err);
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 });
  }
}
