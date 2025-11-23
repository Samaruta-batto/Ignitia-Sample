import { NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/backend/services/userService';
import { hashPassword, signToken } from '@/backend/auth/authService';
import * as WalletService from '@/backend/services/walletService';

// DEBUG ONLY: Create a test user for testing the login flow
// In production, this endpoint should be removed
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email = 'test@example.com', password = 'test123', name = 'Test User' } = body;

    // Check if user already exists
    const existing = await findUserByEmail(email);
    if (existing) {
      const token = signToken({ sub: existing.id, email: existing.email });
      return NextResponse.json({
        message: 'User already exists',
        user: { id: existing.id, email: existing.email, name: existing.name },
        token,
      });
    }

    // Hash password and create user
    const hashed = await hashPassword(password);
    const user = await createUser({ email, password: hashed, name });

    // Initialize wallet with default balance
    try {
      await WalletService.getWallet(user.id);
    } catch (err) {
      console.log('Wallet may already exist or Supabase not ready');
    }

    // Generate token
    const token = signToken({ sub: user.id, email: user.email });

    return NextResponse.json({
      message: 'Test user created',
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
  } catch (err: any) {
    console.error('[DEBUG] create-test-user error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create test user' },
      { status: 500 }
    );
  }
}
