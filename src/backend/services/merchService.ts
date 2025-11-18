// Merchandise service for managing merchandise purchases

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

// Initialize available merchandise
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
  initializeMerch();
  return Array.from(merch.values());
}

export async function getMerchItem(itemId: string) {
  initializeMerch();
  return merch.get(itemId) || null;
}

export async function createMerchOrder(
  userId: string,
  items: { itemId: string; quantity: number }[]
): Promise<MerchOrder> {
  initializeMerch();

  let totalPrice = 0;
  const orderItems: MerchItem[] = [];

  // Validate and collect items
  for (const { itemId, quantity } of items) {
    const item = merch.get(itemId);
    if (!item) {
      throw new Error(`Merchandise item ${itemId} not found`);
    }

    if (item.quantity < quantity) {
      throw new Error(`Not enough stock for ${item.name}`);
    }

    const orderItem = { ...item, quantity };
    totalPrice += item.price * quantity;
    orderItems.push(orderItem);

    // Reduce quantity
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

export async function completeMerchOrder(orderId: string): Promise<MerchOrder> {
  const order = orders.get(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  order.status = 'completed';
  order.completedAt = new Date().toISOString();
  orders.set(orderId, order);
  return order;
}

export async function cancelMerchOrder(orderId: string): Promise<MerchOrder> {
  const order = orders.get(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  if (order.status === 'completed') {
    throw new Error('Cannot cancel completed order');
  }

  // Restore merchandise quantity
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

export async function getUserOrders(userId: string): Promise<MerchOrder[]> {
  return Array.from(orders.values())
    .filter((o) => o.userId === userId)
    .sort((a, b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime());
}

export async function getOrder(orderId: string): Promise<MerchOrder | null> {
  return orders.get(orderId) || null;
}
