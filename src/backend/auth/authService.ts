// Lightweight auth service helpers (placeholders)
// Replace hashing and token logic with secure implementations (bcrypt, JWT) in production

import { createUser, findUserByEmail, findUserById } from '../services/userService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export type SignUpInput = { email: string; password: string; name?: string };
export type SignInInput = { email: string; password: string };

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '60m' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { [key: string]: any };
  } catch (err) {
    return null;
  }
}

export async function signUp(input: SignUpInput) {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new Error('User already exists');
  }
  const hashed = await hashPassword(input.password);
  const user = await createUser({ email: input.email, password: hashed, name: input.name });
  const token = signToken({ sub: user.id, email: user.email });
  return { user: { id: user.id, email: user.email, name: user.name }, token };
}

export async function signIn(input: SignInInput) {
  const user = await findUserByEmail(input.email);
  if (!user) throw new Error('Invalid credentials');
  const ok = await verifyPassword(input.password, user.password_hash);
  if (!ok) throw new Error('Invalid credentials');
  const token = signToken({ sub: user.id, email: user.email });
  return { user: { id: user.id, email: user.email, name: user.name }, token };
}

export async function getUserFromToken(token: string) {
  const payload = verifyToken(token);
  if (!payload || !payload.sub) return null;
  const user = await findUserById(String(payload.sub));
  if (!user) return null;
  return { id: user.id, email: user.email, name: user.name };
}
