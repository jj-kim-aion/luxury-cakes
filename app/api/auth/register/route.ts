/**
 * POST /api/auth/register — mock registration (Phase 1).
 *
 * Phase 1 NOTE: passwords are stored as-is with a `plain:` prefix so the admin
 * team can tell mock accounts apart from real ones. Phase 2 will replace this
 * with bcrypt hashing + real session cookies.
 */
import { NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/db';

export const dynamic = 'force-dynamic';

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const name = typeof body.name === 'string' ? body.name.trim() : null;
    const phone = typeof body.phone === 'string' ? body.phone.trim() : null;

    if (!EMAIL_RX.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters.' },
        { status: 400 },
      );
    }

    if (findUserByEmail(email)) {
      return NextResponse.json(
        { error: 'An account already exists for that email.' },
        { status: 409 },
      );
    }

    // Phase 1: mock password storage. DO NOT ship to production.
    const user = createUser({
      email,
      passwordHash: `plain:${password}`,
      name,
      phone,
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          createdAt: user.created_at,
        },
        message: 'Registered (Phase 1 mock — no session issued).',
      },
      { status: 201 },
    );
  } catch (err) {
    console.error('POST /api/auth/register failed', err);
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
}
