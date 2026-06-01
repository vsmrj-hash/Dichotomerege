import { NextRequest } from 'next/server';
import { env, requireEnv } from '@/lib/revenue/config';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return Response.json({ error: 'Email is required' }, { status: 400 });

    const res = await fetch(`${requireEnv('supabaseUrl').replace(/\/$/, '')}/auth/v1/otp`, {
      method: 'POST',
      headers: {
        apikey: requireEnv('supabaseAnonKey'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, create_user: true, type: 'magiclink' })
    });

    if (!res.ok) {
      return Response.json({ error: `Supabase Auth failed: ${await res.text()}` }, { status: res.status });
    }

    return Response.json({ ok: true, message: `Magic link sent to ${email}`, configured: Boolean(env.supabaseAnonKey) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
