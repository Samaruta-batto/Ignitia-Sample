import { NextResponse } from 'next/server';
import { handleGetProfile } from '@/backend/controllers/authController';

export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization') || '';
    let token = '';
    if (auth.startsWith('Bearer ')) token = auth.replace('Bearer ', '');
    // try cookie fallback
    if (!token) {
      const cookie = req.headers.get('cookie') || '';
      const match = cookie.match(/(?:^|; )token=([^;]+)/);
      if (match) token = decodeURIComponent(match[1]);
    }

    if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 401 });

    const result = await handleGetProfile(token);
    return NextResponse.json(result.body, { status: result.status });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
