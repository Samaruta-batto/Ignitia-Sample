import { NextResponse } from 'next/server';
import { handleGetWallet, handleAddFunds } from '@/backend/controllers/profileController';

function getToken(req: Request): string | null {
  const auth = req.headers.get('authorization') || '';
  let token = '';
  if (auth.startsWith('Bearer ')) token = auth.replace('Bearer ', '');
  if (!token) {
    const cookie = req.headers.get('cookie') || '';
    const match = cookie.match(/(?:^|; )token=([^;]+)/);
    if (match) token = decodeURIComponent(match[1]);
  }
  return token || null;
}

export async function GET(req: Request) {
  try {
    const token = getToken(req);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const result = await handleGetWallet(token);
    return NextResponse.json(result.body, { status: result.status });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = getToken(req);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const amount = body.amount || 0;
    const result = await handleAddFunds(token, amount);
    return NextResponse.json(result.body, { status: result.status });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
