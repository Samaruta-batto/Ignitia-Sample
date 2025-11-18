// Wallet service with Supabase database integration

import { supabase } from '@/lib/supabase';

export type WalletTransaction = {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
};

export type UserWallet = {
  userId: string;
  balance: number;
  transactions: WalletTransaction[];
};

export async function initializeWallet(userId: string): Promise<UserWallet> {
  try {
    // Check if wallet exists
    const { data: wallet, error: fetchError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 = no rows found, other errors might be due to invalid UUID
      if (fetchError.message.includes('invalid input syntax for type uuid')) {
        // Fallback: return default wallet without Supabase
        return {
          userId,
          balance: 2000,
          transactions: [{
            id: `txn_${Date.now()}`,
            userId,
            type: 'credit',
            amount: 2000,
            description: 'Welcome bonus - Default wallet balance',
            date: new Date().toISOString().split('T')[0],
            status: 'completed',
          }],
        };
      }
      throw new Error(fetchError.message);
    }

    // If wallet exists, return it with transactions
    if (wallet) {
      const transactions = await getTransactions(userId);
      return {
        userId,
        balance: wallet.balance,
        transactions,
      };
    }

    // Create new wallet with 2000 default balance
    const { data: newWallet, error: insertError } = await supabase
      .from('wallets')
      .insert([{ user_id: userId, balance: 2000 }])
      .select()
      .single();

    if (insertError) {
      // Fallback if insert fails (e.g., invalid UUID)
      if (insertError.message.includes('invalid input syntax for type uuid')) {
        return {
          userId,
          balance: 2000,
          transactions: [{
            id: `txn_${Date.now()}`,
            userId,
            type: 'credit',
            amount: 2000,
            description: 'Welcome bonus - Default wallet balance',
            date: new Date().toISOString().split('T')[0],
            status: 'completed',
          }],
        };
      }
      throw new Error(insertError.message);
    }

    // Add welcome bonus transaction
    await supabase
      .from('wallet_transactions')
      .insert([{
        user_id: userId,
        type: 'credit',
        amount: 2000,
        description: 'Welcome bonus - Default wallet balance',
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
      }]);

    return {
      userId,
      balance: 2000,
      transactions: [{
        id: `txn_${Date.now()}`,
        userId,
        type: 'credit',
        amount: 2000,
        description: 'Welcome bonus - Default wallet balance',
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
      }],
    };
  } catch (err: any) {
    console.error('Wallet init error:', err.message);
    // Fallback: return default wallet
    return {
      userId,
      balance: 2000,
      transactions: [{
        id: `txn_${Date.now()}`,
        userId,
        type: 'credit',
        amount: 2000,
        description: 'Welcome bonus - Default wallet balance',
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
      }],
    };
  }
}

export async function getWallet(userId: string): Promise<UserWallet> {
  try {
    const { data: wallet, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // Invalid UUID format, fallback to default
      if (error.message.includes('invalid input syntax for type uuid')) {
        return initializeWallet(userId);
      }
      throw new Error(error.message);
    }

    if (!wallet) {
      return initializeWallet(userId);
    }

    const transactions = await getTransactions(userId);
    return {
      userId,
      balance: wallet.balance,
      transactions,
    };
  } catch (err: any) {
    console.error('Get wallet error:', err.message);
    return initializeWallet(userId);
  }
}

export async function addTransaction(
  userId: string,
  transaction: Omit<WalletTransaction, 'id'>
): Promise<WalletTransaction> {
  try {
    // Check if debit would result in negative balance
    if (transaction.type === 'debit') {
      const wallet = await getWallet(userId);
      if (wallet.balance < transaction.amount) {
        throw new Error('Insufficient balance in wallet');
      }
    }

    // Try to insert transaction into Supabase
    const { data: txn, error: txnError } = await supabase
      .from('wallet_transactions')
      .insert([{
        user_id: userId,
        type: transaction.type,
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date,
        status: transaction.status,
      }])
      .select()
      .single();

    if (txnError) {
      // If UUID error, skip Supabase and return local transaction
      if (txnError.message.includes('invalid input syntax for type uuid')) {
        return {
          id: `txn_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          userId,
          type: transaction.type,
          amount: transaction.amount,
          description: transaction.description,
          date: transaction.date,
          status: transaction.status,
        };
      }
      throw new Error(txnError.message);
    }

    // Try to update wallet balance
    const balanceChange = transaction.type === 'credit' ? transaction.amount : -transaction.amount;
    const { data: currentWallet } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (currentWallet) {
      const newBalance = currentWallet.balance + balanceChange;
      await supabase
        .from('wallets')
        .update({ balance: newBalance })
        .eq('user_id', userId);
    }

    return {
      id: txn.id,
      userId: txn.user_id,
      type: txn.type,
      amount: txn.amount,
      description: txn.description,
      date: txn.date,
      status: txn.status,
    };
  } catch (err: any) {
    console.error('Add transaction error:', err.message);
    // Return local transaction on error
    return {
      id: `txn_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      userId,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
      status: transaction.status,
    };
  }
}

export async function getBalance(userId: string): Promise<number> {
  try {
    const { data: wallet, error } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(error.message);
    }

    if (!wallet) {
      const initialized = await initializeWallet(userId);
      return initialized.balance;
    }

    return wallet.balance;
  } catch (err: any) {
    throw new Error(err.message || 'Failed to get balance');
  }
}

export async function getTransactions(userId: string): Promise<WalletTransaction[]> {
  try {
    const { data: transactions, error } = await supabase
      .from('wallet_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (transactions || []).map(t => ({
      id: t.id,
      userId: t.user_id,
      type: t.type,
      amount: t.amount,
      description: t.description,
      date: t.date,
      status: t.status,
    }));
  } catch (err: any) {
    throw new Error(err.message || 'Failed to get transactions');
  }
}
