import { NextRequest, NextResponse } from 'next/server';
import {
  handleInitiateUPIPayment,
  handleVerifyUPIPayment,
  handleGetPaymentStatus,
  handleGetPaymentHistory,
} from '@/backend/controllers/paymentController';

export async function POST(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 });
  }

  try {
    const { amount } = await request.json();
    const result = await handleInitiateUPIPayment(token, amount);
    return NextResponse.json(result.body, { status: result.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
