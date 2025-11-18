// Controller-like functions for the backend folder
// These are framework-agnostic helpers; wire them into API routes (Next.js API routes, Express, etc.)

import { signUp, signIn, getUserFromToken, SignInInput, SignUpInput } from '../auth/authService';

export async function handleSignUp(body: SignUpInput) {
  try {
    const result = await signUp(body);
    return { status: 201, body: result };
  } catch (err: any) {
    return { status: 400, body: { error: err.message } };
  }
}

export async function handleSignIn(body: SignInInput) {
  try {
    const result = await signIn(body);
    return { status: 200, body: result };
  } catch (err: any) {
    return { status: 401, body: { error: err.message } };
  }
}

export async function handleGetProfile(token: string) {
  try {
    const user = await getUserFromToken(token);
    if (!user) return { status: 401, body: { error: 'Invalid token' } };
    return { status: 200, body: { user } };
  } catch (err: any) {
    return { status: 500, body: { error: err.message } };
  }
}
