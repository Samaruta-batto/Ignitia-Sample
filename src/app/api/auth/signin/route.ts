import { NextResponse } from 'next/server';
import { handleSignIn } from '@/backend/controllers/authController';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await handleSignIn(body);
    return NextResponse.json(result.body, { status: result.status });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
