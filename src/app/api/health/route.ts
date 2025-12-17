import { NextResponse } from 'next/server';

const RUST_BACKEND_URL = process.env.RUST_BACKEND_URL || 'http://localhost:8081';

export async function GET() {
  try {
    const response = await fetch(`${RUST_BACKEND_URL}/health`, {
      method: 'GET',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ 
      error: 'Rust backend not available',
      message: err?.message,
      backend_url: RUST_BACKEND_URL 
    }, { status: 503 });
  }
}