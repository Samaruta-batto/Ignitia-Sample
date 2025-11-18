import { getUserFromToken } from '../auth/authService';
import * as PaymentService from '../services/paymentService';
import * as WalletService from '../services/walletService';

export async function handleInitiateUPIPayment(
  token: string,
  amount: number,
) {
  const user = await getUserFromToken(token);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };
  if (amount <= 0) return { status: 400, body: { error: 'Amount must be positive' } };

  try {
    // Create payment transaction
    const payment = await PaymentService.createPaymentTransaction(
      user.id,
      amount,
      'upi',
    );

    return {
      status: 200,
      body: {
        orderId: payment.orderId,
        transactionId: payment.transactionId,
        amount: payment.amount,
        method: payment.method,
        status: payment.status,
      },
    };
  } catch (err: any) {
    return { status: 500, body: { error: err.message } };
  }
}

export async function handleVerifyUPIPayment(
  token: string,
  transactionId: string,
  paymentDetails: {
    orderId: string;
    upiId?: string;
    amount: number;
  },
) {
  const user = await getUserFromToken(token);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };

  try {
    // Verify payment with gateway
    const verifiedPayment = await PaymentService.verifyAndCompletePayment(
      transactionId,
      paymentDetails,
    );

    if (!verifiedPayment) {
      return { status: 400, body: { error: 'Payment verification failed' } };
    }

    // Add funds to wallet after successful payment
    if (verifiedPayment.status === 'completed') {
      await WalletService.addTransaction(user.id, {
        userId: user.id,
        type: 'credit',
        amount: verifiedPayment.amount,
        description: `UPI Payment: ${verifiedPayment.upiId || 'UPI'}`,
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
      });
    }

    const wallet = await WalletService.getWallet(user.id);

    return {
      status: 200,
      body: {
        payment: {
          transactionId: verifiedPayment.transactionId,
          status: verifiedPayment.status,
          amount: verifiedPayment.amount,
          completedAt: verifiedPayment.completedAt,
        },
        wallet,
      },
    };
  } catch (err: any) {
    return { status: 400, body: { error: err.message } };
  }
}

export async function handleGetPaymentStatus(
  token: string,
  transactionId: string,
) {
  const user = await getUserFromToken(token);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };

  try {
    const payment = await PaymentService.getPaymentTransaction(transactionId);
    if (!payment) {
      return { status: 404, body: { error: 'Payment not found' } };
    }

    // Ensure user can only view their own payments
    if (payment.userId !== user.id) {
      return { status: 403, body: { error: 'Forbidden' } };
    }

    return {
      status: 200,
      body: {
        transactionId: payment.transactionId,
        orderId: payment.orderId,
        amount: payment.amount,
        method: payment.method,
        status: payment.status,
        createdAt: payment.createdAt,
        completedAt: payment.completedAt,
      },
    };
  } catch (err: any) {
    return { status: 500, body: { error: err.message } };
  }
}

export async function handleGetPaymentHistory(token: string) {
  const user = await getUserFromToken(token);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };

  try {
    const payments = await PaymentService.getUserPayments(user.id);

    return {
      status: 200,
      body: payments.map((p) => ({
        transactionId: p.transactionId,
        orderId: p.orderId,
        amount: p.amount,
        method: p.method,
        status: p.status,
        createdAt: p.createdAt,
        completedAt: p.completedAt,
      })),
    };
  } catch (err: any) {
    return { status: 500, body: { error: err.message } };
  }
}
