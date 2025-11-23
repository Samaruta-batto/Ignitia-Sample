// Merchandise service for managing merchandise purchases (Supabase + fallback)

import { supabase } from '@/lib/supabase';

export interface MerchItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  size?: string;
  quantity: number;
}

export interface MerchOrder {
  id: string;
  userId: string;
  items: MerchItem[];
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  orderedAt: string;
  completedAt?: string;
}

const merch = new Map<string, MerchItem>();
const orders = new Map<string, MerchOrder>();

// Initialize available merchandise into in-memory fallback
export function initializeMerch() {
  if (merch.size === 0) {
    merch.set('1', {
      id: '1',
      name: 'Official Ignitia Tee',
      price: 299,
      description: 'Premium cotton t-shirt with official Ignitia branding',
      size: 'M',
      quantity: 100,
    });
    merch.set('2', {
      id: '2',
      name: 'Ignitia Hoodie',
      price: 649,
      description: 'Comfortable hoodie with embroidered logo',
      size: 'L',
      quantity: 50,
    });
    merch.set('3', {
      id: '3',
      name: 'Ignitia Cap',
      price: 199,
      description: 'Adjustable baseball cap',
      quantity: 75,
    });
  }
}

export async function getMerch() {
  try {
    const { data, error } = await supabase.from('merchandise').select('*');
    if (error) throw error;
    if (!data || data.length === 0) {
      initializeMerch();
      return Array.from(merch.values());
    }
    return (data || []).map((m: any) => ({
      id: m.id,
      name: m.name,
      price: m.price,
      description: m.description,
      quantity: m.quantity,
    })) as MerchItem[];
  } catch (err) {
    console.warn('getMerch supabase error, falling back to in-memory', err);
    initializeMerch();
    return Array.from(merch.values());
  }
}

export async function getMerchItem(itemId: string) {
  try {
    const { data, error } = await supabase.from('merchandise').select('*').eq('id', itemId).single();
    if (error) throw error;
    if (!data) return null;
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      description: data.description,
      quantity: data.quantity,
    } as MerchItem;
  } catch (err) {
    console.warn('getMerchItem supabase error, falling back to in-memory', err);
    initializeMerch();
    return merch.get(itemId) || null;
  }
}

export async function createMerchOrder(
  userId: string,
  items: { itemId: string; quantity: number }[]
): Promise<MerchOrder> {
  // Try to create order in Supabase
  try {
    // Fetch merchandise rows and validate stock
    const merchIds = items.map(i => i.itemId);
    const { data: rows, error: rowsErr } = await supabase.from('merchandise').select('*').in('id', merchIds);
    if (rowsErr) throw rowsErr;

    const rowMap = new Map((rows || []).map((r: any) => [String(r.id), r]));

    let totalPrice = 0;
    for (const it of items) {
      const row = rowMap.get(it.itemId);
      if (!row) throw new Error(`Merchandise item ${it.itemId} not found`);
      if (row.quantity < it.quantity) throw new Error(`Not enough stock for ${row.name}`);
      totalPrice += row.price * it.quantity;
    }

    // Insert order
    const { data: orderRow, error: orderErr } = await supabase
      .from('merch_orders')
      .insert([{ user_id: userId, total_price: totalPrice, status: 'pending' }])
      .select()
      .single();
    if (orderErr) throw orderErr;

    // Insert order items and decrement stock
    for (const it of items) {
      const row = rowMap.get(it.itemId);
      await supabase.from('merch_order_items').insert([{ order_id: orderRow.id, merch_id: it.itemId, quantity: it.quantity, price: row.price }]);
      // decrement stock
      await supabase.from('merchandise').update({ quantity: (row.quantity - it.quantity) }).eq('id', it.itemId);
    }

    const order: MerchOrder = {
      id: orderRow.id,
      userId,
      items: (items || []).map(it => ({
        id: it.itemId,
        name: rowMap.get(it.itemId)?.name || 'Item',
        price: rowMap.get(it.itemId)?.price || 0,
        quantity: it.quantity,
      })),
      totalPrice,
      status: 'pending',
      orderedAt: new Date().toISOString(),
    };

    return order;
  } catch (err) {
    console.warn('createMerchOrder supabase error, falling back to in-memory', err);
    // fallback in-memory
    initializeMerch();
    let totalPrice = 0;
    const orderItems: MerchItem[] = [];
    for (const { itemId, quantity } of items) {
      const item = merch.get(itemId);
      if (!item) throw new Error(`Merchandise item ${itemId} not found`);
      if (item.quantity < quantity) throw new Error(`Not enough stock for ${item.name}`);
      const orderItem = { ...item, quantity };
      totalPrice += item.price * quantity;
      orderItems.push(orderItem);
      item.quantity -= quantity;
      merch.set(itemId, item);
    }
    const order: MerchOrder = {
      id: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      userId,
      items: orderItems,
      totalPrice,
      status: 'pending',
      orderedAt: new Date().toISOString(),
    };
    orders.set(order.id, order);
    return order;
  }
}

export async function completeMerchOrder(orderId: string): Promise<MerchOrder> {
  try {
    const { data, error } = await supabase.from('merch_orders').update({ status: 'completed', completed_at: new Date().toISOString() }).eq('id', orderId).select().single();
    if (error) throw error;
    return {
      id: data.id,
      userId: data.user_id,
      items: [],
      totalPrice: data.total_price,
      status: data.status,
      orderedAt: data.ordered_at,
      completedAt: data.completed_at,
    } as MerchOrder;
  } catch (err) {
    console.warn('completeMerchOrder supabase error, falling back to in-memory', err);
    const order = orders.get(orderId);
    if (!order) throw new Error('Order not found');
    order.status = 'completed';
    order.completedAt = new Date().toISOString();
    orders.set(orderId, order);
    return order;
  }
}

export async function cancelMerchOrder(orderId: string): Promise<MerchOrder> {
  try {
    const { data, error } = await supabase.from('merch_orders').update({ status: 'cancelled' }).eq('id', orderId).select().single();
    if (error) throw error;
    return {
      id: data.id,
      userId: data.user_id,
      items: [],
      totalPrice: data.total_price,
      status: data.status,
      orderedAt: data.ordered_at,
    } as MerchOrder;
  } catch (err) {
    console.warn('cancelMerchOrder supabase error, falling back to in-memory', err);
    const order = orders.get(orderId);
    if (!order) throw new Error('Order not found');
    if (order.status === 'completed') throw new Error('Cannot cancel completed order');
    // restore quantities
    for (const item of order.items) {
      const merchItem = merch.get(item.id);
      if (merchItem) {
        merchItem.quantity += item.quantity;
        merch.set(item.id, merchItem);
      }
    }
    order.status = 'cancelled';
    orders.set(orderId, order);
    return order;
  }
}

export async function getUserOrders(userId: string): Promise<MerchOrder[]> {
  try {
    const { data, error } = await supabase.from('merch_orders').select('*').eq('user_id', userId).order('ordered_at', { ascending: false });
    if (error) throw error;
    return (data || []).map((d: any) => ({
      id: d.id,
      userId: d.user_id,
      items: [],
      totalPrice: d.total_price,
      status: d.status,
      orderedAt: d.ordered_at,
      completedAt: d.completed_at,
    }));
  } catch (err) {
    console.warn('getUserOrders supabase error, falling back to in-memory', err);
    return Array.from(orders.values()).filter(o => o.userId === userId).sort((a,b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime());
  }
}

export async function getOrder(orderId: string): Promise<MerchOrder | null> {
  try {
    const { data, error } = await supabase.from('merch_orders').select('*').eq('id', orderId).single();
    if (error) throw error;
    return {
      id: data.id,
      userId: data.user_id,
      items: [],
      totalPrice: data.total_price,
      status: data.status,
      orderedAt: data.ordered_at,
      completedAt: data.completed_at,
    } as MerchOrder;
  } catch (err) {
    console.warn('getOrder supabase error, falling back to in-memory', err);
    return orders.get(orderId) || null;
  }
}
