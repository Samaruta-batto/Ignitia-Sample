import { NextResponse } from 'next/server';

const RUST_BACKEND_URL = process.env.RUST_BACKEND_URL || 'http://localhost:8081';

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

    const response = await fetch(`${RUST_BACKEND_URL}/api/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Backend connection failed' }, { status: 500 });
  }
}
