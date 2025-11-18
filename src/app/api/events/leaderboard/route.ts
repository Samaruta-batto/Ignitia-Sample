import { NextResponse } from 'next/server';
import { handleLeaderboard } from '@/backend/controllers/eventsController';

export async function GET() {
  const result = await handleLeaderboard();
  return NextResponse.json(result.body, { status: result.status });
}
