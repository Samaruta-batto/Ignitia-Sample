import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * DEBUG ENDPOINT: Initialize Supabase database with tables and seed data
 * 
 * POST /api/debug/setup-db
 * 
 * This endpoint creates all required tables and seeds placeholder events.
 * WARNING: This is for development only. Remove in production.
 */
export async function POST(req: Request) {
  try {
    // Verify this is a development environment
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Setup endpoint not available in production' },
        { status: 403 }
      );
    }

    console.log('[DEBUG] setup-db: Starting database initialization...');

    // Note: In Supabase, you typically can't create tables via the JS client
    // This endpoint instead verifies that tables exist and seeds data
    // You must run the SQL schema in the Supabase dashboard first

    // Try to query the users table to see if it exists
    const { data: usersCheck, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (usersError) {
      console.error('[DEBUG] setup-db: Users table check failed:', usersError);
      return NextResponse.json(
        {
          error: 'Database tables do not exist yet',
          message: 'Please execute the SQL from docs/supabase-schema.sql in the Supabase dashboard first',
          instructions: [
            '1. Go to https://app.supabase.com',
            '2. Select your project',
            '3. Go to SQL Editor',
            '4. Click "New Query"',
            '5. Copy and paste the contents of docs/supabase-schema.sql',
            '6. Click "Run"',
            '7. Then call this endpoint again'
          ]
        },
        { status: 400 }
      );
    }

    console.log('[DEBUG] setup-db: Tables exist, seeding events data...');

    // Seed placeholder events if events table is empty
    const { data: existingEvents, error: eventsCheckError } = await supabase
      .from('events')
      .select('id')
      .limit(1);

    if (!eventsCheckError && (!existingEvents || existingEvents.length === 0)) {
      const { events: placeholderEvents } = await import('@/lib/data/placeholder-data');

      const eventsToInsert = placeholderEvents.map((e: any) => ({
        name: e.name || e.title || 'Untitled Event',
        title: e.title || e.name,
        price: e.price || 0,
        description: e.description,
        date: e.date,
        location: e.location,
      }));

      const { data: insertedEvents, error: insertError } = await supabase
        .from('events')
        .insert(eventsToInsert)
        .select();

      if (insertError) {
        console.error('[DEBUG] setup-db: Failed to seed events:', insertError);
        return NextResponse.json(
          { error: 'Failed to seed events', details: insertError.message },
          { status: 400 }
        );
      }

      console.log('[DEBUG] setup-db: Seeded', insertedEvents?.length || 0, 'events');
    }

    return NextResponse.json({
      message: 'Database setup verified',
      status: 'ready',
      next: 'You can now sign up, login, and register for events'
    });
  } catch (err: any) {
    console.error('[DEBUG] setup-db: Unexpected error:', err);
    return NextResponse.json(
      { error: err.message || 'Setup failed' },
      { status: 500 }
    );
  }
}
