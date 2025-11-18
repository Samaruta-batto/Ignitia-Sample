import { NextResponse } from 'next/server';
import { handleGetAudit } from '@/backend/controllers/adminController';

export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization') || '';
    let token = '';
    if (auth.startsWith('Bearer ')) token = auth.replace('Bearer ', '');
    if (!token) {
      const cookie = req.headers.get('cookie') || '';
      const match = cookie.match(/(?:^|; )token=([^;]+)/);
      if (match) token = decodeURIComponent(match[1]);
    }
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const result = await handleGetAudit(token);
    return NextResponse.json(result.body, { status: result.status });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
