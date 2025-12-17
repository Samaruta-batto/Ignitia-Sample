import { NextResponse } from 'next/server';

const RUST_BACKEND_URL = process.env.RUST_BACKEND_URL || 'http://localhost:8081';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    let body = {};
    try {
      body = await req.json();
    } catch (e) {
      // If no body or invalid JSON, use empty object
      console.log('No JSON body provided, using empty object');
    }
    
    const authHeader = req.headers.get('authorization');
    
    console.log(`Proxying registration request for event ${id} to Rust backend`);
    
    const response = await fetch(`${RUST_BACKEND_URL}/api/events/${id}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { 'Authorization': authHeader }),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`Rust backend returned ${response.status}: ${response.statusText}`);
    }

    let data;
    try {
      const text = await response.text();
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Failed to parse Rust backend response:', parseError);
      data = { error: 'Invalid response from backend' };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (err: any) {
    console.error('Proxy error:', err);
    return NextResponse.json({ error: err?.message || 'Backend connection failed' }, { status: 500 });
  }
}