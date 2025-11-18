import { events as seedEvents } from '@/lib/data/placeholder-data';
import type { Event } from '@/lib/data/types';
import { supabase } from '@/lib/supabase';

export type EventRecord = Event & {
  registeredAttendees: number;
  registrations: { userId: string; at: string }[];
};

const eventsMap = new Map<string, EventRecord>();

// seed from placeholder-data for fallback
for (const e of seedEvents) {
  const eventRecord: EventRecord = {
    ...(e as any),
    name: e.name || e.title || 'Untitled Event',
    registeredAttendees: e.registeredAttendees || 0,
    registrations: [],
  };
  eventsMap.set(e.id, eventRecord);
}

export async function listEvents() {
  try {
    const { data, error } = await supabase.from('events').select('*');
    if (error) throw error;
    if (!data || data.length === 0) {
      return Array.from(eventsMap.values());
    }
    // map DB rows to EventRecord-ish objects (no registrations included)
    return (data || []).map((r: any) => ({
      id: r.id,
      name: r.name || r.title || 'Event',
      title: r.title,
      date: r.date,
      location: r.location,
      description: r.description,
      price: r.price || 0,
      image: (r as any).image || null,
      category: (r as any).category || null,
      subCategory: (r as any).subCategory || null,
      registeredAttendees: 0,
      registrations: [],
    }));
  } catch (err) {
    console.warn('listEvents supabase error, falling back to in-memory', err);
    return Array.from(eventsMap.values());
  }
}

export async function getEventById(id: string) {
  try {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    if (error) throw error;
    if (!data) return eventsMap.get(id) || null;
    return {
      id: data.id,
      name: data.name || data.title || 'Event',
      title: data.title,
      date: data.date,
      location: data.location,
      description: data.description,
      price: data.price || 0,
      image: (data as any).image || null,
      category: (data as any).category || null,
      subCategory: (data as any).subCategory || null,
      registeredAttendees: 0,
      registrations: [],
    };
  } catch (err) {
    // fallback
    return eventsMap.get(id) || null;
  }
}

export async function registerForEvent(eventId: string, userId: string) {
  // Try to write into Supabase event_registrations
  try {
    // Check existing registration
    const { data: exists, error: existsErr } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .limit(1)
      .single();
    if (existsErr && (existsErr as any).code !== 'PGRST116') throw existsErr;
    if (exists) {
      // return existing event info if possible
      const ev = await getEventById(eventId);
      return { alreadyRegistered: true, event: ev };
    }

    const { data: inserted, error: insertErr } = await supabase
      .from('event_registrations')
      .insert([{ user_id: userId, event_id: eventId, status: 'registered' }])
      .select()
      .single();

    if (insertErr) throw insertErr;

    // Optionally increment registration count in events table (if you maintain a counter)
    try {
      await supabase.rpc('increment_event_count', { ev_id: eventId });
    } catch (_) {
      // ignore if rpc not present
    }

    const ev = await getEventById(eventId);
    return { alreadyRegistered: false, event: ev };
  } catch (err) {
    console.warn('registerForEvent supabase error, falling back to in-memory', err);
    const ev = eventsMap.get(eventId);
    if (!ev) throw new Error('Event not found');
    if (ev.registrations.find(r => r.userId === userId)) {
      return { alreadyRegistered: true, event: ev };
    }
    ev.registrations.push({ userId, at: new Date().toISOString() });
    ev.registeredAttendees = ev.registrations.length;
    eventsMap.set(eventId, ev);
    return { alreadyRegistered: false, event: ev };
  }
}

export async function getLeaderboard() {
  try {
    // fetch registrations grouped by event
    const { data, error } = await supabase
      .from('event_registrations')
      .select('event_id, id', { count: 'exact' });
    if (error) throw error;
    // If we cannot easily aggregate here, fallback to listing events and sorting by registeredAttendees
    const events = await listEvents();
    // try to compute counts per event from registrations table
    try {
      const { data: counts, error: cntErr } = await supabase
        .from('event_registrations')
        .select('event_id, count:id', { count: 'exact' });
      if (!cntErr && counts) {
        // cannot rely on this shape across Supabase setups; fallback below
      }
    } catch (_) {
      // ignore
    }
    // fallback: return events (DB won't have counts unless you maintain them)
    return events.sort((a: any, b: any) => (b.registeredAttendees || 0) - (a.registeredAttendees || 0));
  } catch (err) {
    console.warn('getLeaderboard supabase error, falling back to in-memory', err);
    const arr = Array.from(eventsMap.values()).sort((a, b) => b.registeredAttendees - a.registeredAttendees);
    return arr;
  }
}
