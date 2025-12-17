import { NextResponse } from 'next/server';

const RUST_BACKEND_URL = process.env.RUST_BACKEND_URL || 'http://localhost:8081';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const response = await fetch(`${RUST_BACKEND_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Backend connection failed' }, { status: 500 });
  }
}
