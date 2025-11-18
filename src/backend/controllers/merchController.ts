import { getUserFromToken } from '../auth/authService';
import * as MerchService from '../services/merchService';
import * as WalletService from '../services/walletService';

export async function handleGetMerch() {
  try {
    const merch = await MerchService.getMerch();
    return { status: 200, body: merch };
  } catch (err: any) {
    return { status: 500, body: { error: err.message } };
  }
}

export async function handleCreateOrder(
  token: string,
  items: { itemId: string; quantity: number }[]
) {
  const user = await getUserFromToken(token);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };

  try {
    // Create order
    const order = await MerchService.createMerchOrder(user.id, items);

    // Check wallet balance
    const wallet = await WalletService.getWallet(user.id);
    if (wallet.balance < order.totalPrice) {
      // Cancel the order if insufficient balance
      await MerchService.cancelMerchOrder(order.id);
      return { status: 402, body: { error: 'Insufficient wallet balance' } };
    }

    // Deduct from wallet
    await WalletService.addTransaction(user.id, {
      userId: user.id,
      type: 'debit',
      amount: order.totalPrice,
      description: `Merchandise purchase: ${order.items.map((i) => i.name).join(', ')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
    });

    // Mark order as completed
    await MerchService.completeMerchOrder(order.id);

    return {
      status: 200,
      body: {
        order,
        wallet: await WalletService.getWallet(user.id),
      },
    };
  } catch (err: any) {
    return { status: 400, body: { error: err.message } };
  }
}

export async function handleGetOrders(token: string) {
  const user = await getUserFromToken(token);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };

  try {
    const orders = await MerchService.getUserOrders(user.id);
    return { status: 200, body: orders };
  } catch (err: any) {
    return { status: 500, body: { error: err.message } };
  }
}

export async function handleGetOrder(token: string, orderId: string) {
  const user = await getUserFromToken(token);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };

  try {
    const order = await MerchService.getOrder(orderId);
    if (!order) {
      return { status: 404, body: { error: 'Order not found' } };
    }

    // Ensure user can only view their own orders
    if (order.userId !== user.id) {
      return { status: 403, body: { error: 'Forbidden' } };
    }

    return { status: 200, body: order };
  } catch (err: any) {
    return { status: 500, body: { error: err.message } };
  }
}
