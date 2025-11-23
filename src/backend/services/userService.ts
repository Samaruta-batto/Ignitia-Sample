// User service with Supabase database integration

import { supabase } from '@/lib/supabase';

export type User = { id: string; email: string; password_hash: string; name?: string; role?: string };

export async function createUser(data: { email: string; password: string; name?: string; role?: string }) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .insert([{
        email: data.email,
        password_hash: data.password,
        name: data.name || '',
        role: data.role || 'user',
      }])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return {
      id: user.id,
      email: user.email,
      password_hash: user.password_hash,
      name: user.name,
      role: (user as any).role || 'user',
    };
  } catch (err: any) {
    throw new Error(err.message || 'Failed to create user');
  }
}

export async function findUserByEmail(email: string) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found
      throw new Error(error.message);
    }

    return user ? {
      id: user.id,
      email: user.email,
      password_hash: user.password_hash,
      name: user.name,
      role: (user as any).role || 'user',
    } : null;
  } catch (err: any) {
    if (err.message?.includes('no rows')) return null;
    throw new Error(err.message || 'Failed to find user');
  }
}

export async function findUserById(id: string) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(error.message);
    }

    return user ? {
      id: user.id,
      email: user.email,
      password_hash: user.password_hash,
      name: user.name,
      role: (user as any).role || 'user',
    } : null;
  } catch (err: any) {
    if (err.message?.includes('no rows')) return null;
    throw new Error(err.message || 'Failed to find user');
  }
}

export async function getAllUsers() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    return (users || []).map(u => ({
      id: u.id,
      email: u.email,
      password_hash: u.password_hash,
      name: u.name,
    }));
  } catch (err: any) {
    throw new Error(err.message || 'Failed to get users');
  }
}
