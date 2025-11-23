import * as EventService from '@/backend/services/eventService';
import * as RegistrationService from '@/backend/services/registrationService';
import * as WalletService from '@/backend/services/walletService';
import { getUserFromToken } from '../auth/authService';

export async function handleRegister(eventId: string, token: string) {
  // authenticate
  const user = await getUserFromToken(token);
  console.log('[DEBUG] handleRegister: user from token:', user);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };
  try {
    const event = await EventService.getEventById(eventId);
    console.log('[DEBUG] handleRegister: event:', event);
    if (!event) return { status: 404, body: { error: 'Event not found' } };

    const registrationFee = event.price || 0;

    // Check wallet balance if registration has a fee
    if (registrationFee > 0) {
      try {
        const wallet = await WalletService.getWallet(user.id);
        console.log('[DEBUG] handleRegister: wallet balance:', wallet.balance);
        if (wallet.balance < registrationFee) {
          return { status: 402, body: { error: 'Insufficient wallet balance' } };
        }

        // Deduct from wallet
        await WalletService.addTransaction(user.id, {
          userId: user.id,
          type: 'debit',
          amount: registrationFee,
          description: `Event registration: ${event.name || event.title}`,
          date: new Date().toISOString().split('T')[0],
          status: 'completed',
        });
        console.log('[DEBUG] handleRegister: wallet deduction successful');
      } catch (walletErr: any) {
        // If wallet operation fails, still allow registration but log the error
        console.error('[DEBUG] handleRegister: wallet operation failed:', walletErr.message);
      }
    }

    console.log('[DEBUG] handleRegister: registering user', user.id, 'for event', eventId);
    const res = await EventService.registerForEvent(eventId, user.id);
    console.log('[DEBUG] handleRegister: EventService.registerForEvent result:', res);
    
    // Also track in registration service
    try {
      const regRes = await RegistrationService.registerUserForEvent(user.id, eventId, event.name || '', event.price);
      console.log('[DEBUG] handleRegister: RegistrationService.registerUserForEvent result:', regRes);
    } catch (regErr: any) {
      console.error('[DEBUG] handleRegister: registration tracking failed:', regErr.message);
    }
    
    return { status: 200, body: res };
  } catch (err: any) {
    console.error('[DEBUG] handleRegister: general error:', err);
    return { status: 400, body: { error: err.message } };
  }
}

export async function handleLeaderboard() {
  try {
    const lb = await EventService.getLeaderboard();
    return { status: 200, body: lb };
  } catch (err: any) {
    return { status: 500, body: { error: err.message } };
  }
}

export async function handleListEvents() {
  try {
    const list = await EventService.listEvents();
    return { status: 200, body: list };
  } catch (err: any) {
    return { status: 500, body: { error: err.message } };
  }
}

export async function handleGetRegistrations(token: string) {
  const user = await getUserFromToken(token);
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };
  try {
    console.log('[DEBUG] handleGetRegistrations: fetching registrations for user:', user.id);
    const registrations = await RegistrationService.getUserRegistrations(user.id);
    console.log('[DEBUG] handleGetRegistrations: found registrations:', registrations);
    return { status: 200, body: registrations };
  } catch (err: any) {
    console.error('[DEBUG] handleGetRegistrations error:', err);
    return { status: 500, body: { error: err.message } };
  }
}
