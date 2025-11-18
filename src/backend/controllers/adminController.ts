import { supabase } from '@/lib/supabase';
import { getUserFromToken } from '../auth/authService';
import { findUserById } from '../services/userService';

function isAdminUser(userRecord: any) {
  // Prefer explicit role field if present
  if (userRecord?.role) return userRecord.role === 'admin';
  // Fallback to environment admin emails (comma separated)
  const admins = (process.env.ADMIN_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  return admins.includes((userRecord?.email || '').toLowerCase());
}

export async function handleGetAudit(token: string) {
  const payloadUser = await getUserFromToken(token);
  if (!payloadUser) return { status: 401, body: { error: 'Unauthorized' } };

  // Fetch the full user record to check role (if role column exists)
  const fullUser = await findUserById(payloadUser.id);
  if (!fullUser) return { status: 401, body: { error: 'Unauthorized' } };

  if (!isAdminUser(fullUser)) return { status: 403, body: { error: 'Forbidden' } };

  try {
    // Aggregate event registrations
    const { data: regs, error: regsErr, count: regsCount } = await supabase
      .from('event_registrations')
      .select('id', { count: 'exact' });

    if (regsErr) throw regsErr;

    // Aggregate merch orders and revenue
    const { data: merchOrders, error: merchErr } = await supabase
      .from('merch_orders')
      .select('id,total_price,status');
    if (merchErr) throw merchErr;

    const completedMerchOrders = (merchOrders || []).filter((o: any) => o.status === 'completed');
    const merchOrdersCount = (merchOrders || []).length;
    const merchRevenue = completedMerchOrders.reduce((s: number, o: any) => s + (o.total_price || 0), 0);

    // Aggregate wallet transactions (treat debits as revenue)
    const { data: txns, error: txnsErr } = await supabase
      .from('wallet_transactions')
      .select('id,type,amount,status');
    if (txnsErr) throw txnsErr;

    const revenue = (txns || []).filter((t: any) => t.type === 'debit' && t.status === 'completed')
      .reduce((s: number, t: any) => s + (t.amount || 0), 0);

    // Recent registrations (last 10)
    const { data: recentRegs, error: recentErr } = await supabase
      .from('event_registrations')
      .select('*')
      .order('registered_at', { ascending: false })
      .limit(10);
    if (recentErr) throw recentErr;

    return {
      status: 200,
      body: {
        registrationsCount: regsCount || (regs || []).length,
        merchOrdersCount,
        merchRevenue,
        revenue,
        recentRegistrations: recentRegs || [],
      },
    };
  } catch (err: any) {
    return { status: 500, body: { error: err.message || 'Failed to gather audit' } };
  }
}
