import { getUserFromToken } from '../auth/authService';
import * as WalletService from '../services/walletService';
import * as RegistrationService from '../services/registrationService';
import { findUserById } from '../services/userService';

export async function handleGetProfile(token: string) {
  console.log('[DEBUG] handleGetProfile called with token:', token.slice(0, 30) + (token.length > 30 ? '...' : ''));
  const user = await getUserFromToken(token);
  console.log('[DEBUG] getUserFromToken result:', user);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };
  try {
    const fullUser = await findUserById(user.id);
    console.log('[DEBUG] findUserById result:', fullUser);
    return { status: 200, body: { user: { id: user.id, email: user.email, name: user.name } } };
  } catch (err: any) {
    console.error('[DEBUG] handleGetProfile error:', err);
    return { status: 500, body: { error: err.message } };
  }
}

export async function handleGetWallet(token: string) {
  const user = await getUserFromToken(token);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };
  try {
    const wallet = await WalletService.getWallet(user.id);
    return { status: 200, body: wallet };
  } catch (err: any) {
    return { status: 500, body: { error: err.message } };
  }
}

export async function handleAddFunds(token: string, amount: number) {
  const user = await getUserFromToken(token);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };
  if (amount <= 0) return { status: 400, body: { error: 'Amount must be positive' } };
  try {
    const txn = await WalletService.addTransaction(user.id, {
      userId: user.id,
      type: 'credit',
      amount,
      description: 'Added funds via UPI',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
    });
    const wallet = await WalletService.getWallet(user.id);
    return { status: 200, body: { transaction: txn, wallet } };
  } catch (err: any) {
    return { status: 500, body: { error: err.message } };
  }
}

export async function handleGetTransactions(token: string) {
  const user = await getUserFromToken(token);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };
  try {
    const transactions = await WalletService.getTransactions(user.id);
    return { status: 200, body: transactions };
  } catch (err: any) {
    return { status: 500, body: { error: err.message } };
  }
}
