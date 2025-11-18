import { NextRequest, NextResponse } from 'next/server';
import { handleGetMerch, handleCreateOrder, handleGetOrders } from '@/backend/controllers/merchController';

export async function GET() {
  try {
    const result = await handleGetMerch();
    return NextResponse.json(result.body, { status: result.status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 });
  }

  try {
    const { items } = await request.json();
    const result = await handleCreateOrder(token, items);
    return NextResponse.json(result.body, { status: result.status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
