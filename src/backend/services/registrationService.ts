// Service to track user event registrations (supports Supabase + fallback)

import { supabase } from '@/lib/supabase';

export type EventRegistration = {
  eventId: string;
  eventName: string;
  registrationDate: string;
  status: 'registered' | 'participated' | 'cancelled';
  paymentAmount?: number;
};

const userRegistrations = new Map<string, EventRegistration[]>();

export async function getUserRegistrations(userId: string) {
  try {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('event_id,registered_at,status')
      .eq('user_id', userId);
    if (error) throw error;
    if (!data) return userRegistrations.get(userId) || [];
    return (data || []).map((r: any) => ({
      eventId: r.event_id,
      eventName: '',
      registrationDate: r.registered_at ? new Date(r.registered_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      status: r.status || 'registered',
    }));
  } catch (err) {
    console.warn('getUserRegistrations supabase error, falling back to in-memory', err);
    return userRegistrations.get(userId) || [];
  }
}

export async function registerUserForEvent(
  userId: string,
  eventId: string,
  eventName: string,
  paymentAmount?: number
) {
  try {
    // check existing
    const { data: exists, error: existsErr } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .limit(1)
      .single();
    if (existsErr && (existsErr as any).code !== 'PGRST116') throw existsErr;
    if (exists) throw new Error('Already registered for this event');

    const { data: inserted, error: insertErr } = await supabase
      .from('event_registrations')
      .insert([{ user_id: userId, event_id: eventId, status: 'registered' }])
      .select()
      .single();
    if (insertErr) throw insertErr;
    return {
      eventId,
      eventName,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'registered',
      paymentAmount,
    } as EventRegistration;
  } catch (err) {
    console.warn('registerUserForEvent supabase error, falling back to in-memory', err);
    const registrations = userRegistrations.get(userId) || [];
    if (registrations.some(r => r.eventId === eventId)) {
      throw new Error('Already registered for this event');
    }
    const registration: EventRegistration = {
      eventId,
      eventName,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'registered',
      paymentAmount,
    };
    registrations.push(registration);
    userRegistrations.set(userId, registrations);
    return registration;
  }
}

export async function updateRegistrationStatus(
  userId: string,
  eventId: string,
  status: 'registered' | 'participated' | 'cancelled'
) {
  try {
    const { data, error } = await supabase
      .from('event_registrations')
      .update({ status })
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .select()
      .single();
    if (error) throw error;
    return {
      eventId,
      eventName: '',
      registrationDate: data.registered_at ? new Date(data.registered_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      status: data.status,
    } as EventRegistration;
  } catch (err) {
    console.warn('updateRegistrationStatus supabase error, falling back to in-memory', err);
    const registrations = userRegistrations.get(userId) || [];
    const reg = registrations.find(r => r.eventId === eventId);
    if (!reg) throw new Error('Registration not found');
    reg.status = status;
    userRegistrations.set(userId, registrations);
    return reg;
  }
}
