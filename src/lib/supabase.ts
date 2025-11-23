import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          password_hash: string;
          role: string;
          created_at: string;
        };
      };
      wallets: {
        Row: {
          id: string;
          user_id: string;
          balance: number;
          created_at: string;
        };
      };
      wallet_transactions: {
        Row: {
          id: string;
          user_id: string;
          type: 'credit' | 'debit';
          amount: number;
          description: string;
          date: string;
          status: 'completed' | 'pending' | 'failed';
          created_at: string;
        };
      };
      events: {
        Row: {
          id: string;
          name: string;
          title: string;
          price: number;
          description: string;
          date: string;
          location: string;
          created_at: string;
        };
      };
      event_registrations: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          status: 'registered' | 'participated' | 'cancelled';
          registered_at: string;
        };
      };
      merchandise: {
        Row: {
          id: string;
          name: string;
          price: number;
          description: string;
          quantity: number;
          created_at: string;
        };
      };
      merch_orders: {
        Row: {
          id: string;
          user_id: string;
          total_price: number;
          status: 'pending' | 'completed' | 'cancelled';
          ordered_at: string;
          completed_at: string | null;
        };
      };
      merch_order_items: {
        Row: {
          id: string;
          order_id: string;
          merch_id: string;
          quantity: number;
          price: number;
        };
      };
    };
  };
};
