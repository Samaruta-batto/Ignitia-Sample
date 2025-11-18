import { NextResponse } from 'next/server';
import { handleSignUp } from '@/backend/controllers/authController';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await handleSignUp(body);
    return NextResponse.json(result.body, { status: result.status });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
