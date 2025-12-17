import { NextResponse } from 'next/server';

const RUST_BACKEND_URL = process.env.RUST_BACKEND_URL || 'http://localhost:8081';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get('authorization');
    
    console.log('Verifying payment:', body.razorpay_order_id);
    
    const response = await fetch(`${RUST_BACKEND_URL}/api/payment/verify`, {
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
    console.error('Payment verification error:', err);
    return NextResponse.json({ error: err?.message || 'Payment verification failed' }, { status: 500 });
  }
}