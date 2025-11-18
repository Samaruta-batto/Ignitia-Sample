import { v4 as uuidv4 } from 'uuid';

export interface PaymentTransaction {
  id: string;
  userId: string;
  amount: number;
  method: 'upi' | 'card' | 'netbanking';
  transactionId: string; // Gateway transaction ID
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  upiId?: string;
  orderId: string;
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
}

// Simulated payment gateway responses
// In production, this would be replaced with actual Razorpay/PayU/Cashfree SDK
export const PaymentGateway = {
  // Initialize payment
  async initiatePayment(
    userId: string,
    amount: number,
    method: 'upi' | 'card' | 'netbanking' = 'upi',
  ) {
    const orderId = `order_${Date.now()}_${uuidv4().slice(0, 8)}`;
    const transactionId = `txn_${uuidv4()}`;

    return {
      orderId,
      transactionId,
      amount,
      method,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
  },

  // Verify payment with gateway (would call actual gateway API)
  async verifyPayment(
    orderId: string,
    transactionId: string,
    paymentDetails: any,
  ) {
    // In production, verify with Razorpay/PayU/Cashfree API
    // For now, return success (replace with actual gateway verification)
    try {
      // Simulated gateway response validation
      const isValid =
        orderId &&
        transactionId &&
        paymentDetails?.amount &&
        paymentDetails?.method;

      if (!isValid) {
        return {
          success: false,
          error: 'Invalid payment details',
        };
      }

      // In production: call actual payment gateway API
      // const response = await fetch('https://api.razorpay.com/v1/payments/...');
      // const verified = await response.json();

      return {
        success: true,
        verified: true,
        transactionId,
        orderId,
        amount: paymentDetails.amount,
        method: paymentDetails.method,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
      };
    }
  },

  // Get payment status
  async getPaymentStatus(transactionId: string) {
    // In production, fetch from gateway
    return {
      transactionId,
      status: 'completed', // or 'pending', 'failed'
    };
  },
};

// Payment transaction storage (in-memory, replace with database)
const payments = new Map<string, PaymentTransaction>();

export async function createPaymentTransaction(
  userId: string,
  amount: number,
  method: 'upi' | 'card' | 'netbanking' = 'upi',
): Promise<PaymentTransaction> {
  const payment = await PaymentGateway.initiatePayment(userId, amount, method);

  const transaction: PaymentTransaction = {
    id: uuidv4(),
    userId,
    amount,
    method,
    transactionId: payment.transactionId,
    orderId: payment.orderId,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  payments.set(transaction.id, transaction);
  return transaction;
}

export async function verifyAndCompletePayment(
  transactionId: string,
  paymentDetails: any,
): Promise<PaymentTransaction | null> {
  const transaction = Array.from(payments.values()).find(
    (t) => t.transactionId === paymentDetails.transactionId,
  );

  if (!transaction) {
    throw new Error('Payment transaction not found');
  }

  // Verify with gateway
  const verification = await PaymentGateway.verifyPayment(
    transaction.orderId,
    transactionId,
    paymentDetails,
  );

  if (verification.success && verification.verified) {
    transaction.status = 'completed';
    transaction.completedAt = new Date().toISOString();
    transaction.upiId = paymentDetails.upiId;
    payments.set(transactionId, transaction);
    return transaction;
  } else {
    transaction.status = 'failed';
    transaction.failureReason = verification.error;
    payments.set(transactionId, transaction);
    throw new Error(`Payment verification failed: ${verification.error}`);
  }
}

export async function getPaymentTransaction(
  transactionId: string,
): Promise<PaymentTransaction | null> {
  return payments.get(transactionId) || null;
}

export async function getUserPayments(
  userId: string,
): Promise<PaymentTransaction[]> {
  return Array.from(payments.values()).filter((p) => p.userId === userId);
}
