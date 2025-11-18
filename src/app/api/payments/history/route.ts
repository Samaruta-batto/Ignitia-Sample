import { NextRequest, NextResponse } from 'next/server';
import {
  handleGetPaymentHistory,
} from '@/backend/controllers/paymentController';

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 });
  }

  try {
    const result = await handleGetPaymentHistory(token);
    return NextResponse.json(result.body, { status: result.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
