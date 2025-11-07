import type { WalletTransaction, EventRegistration } from './types';

export const mockWalletTransactions: WalletTransaction[] = [
  {
    id: 'txn-1',
    type: 'debit',
    amount: 500,
    description: 'Event Registration - Tech Symposium',
    date: '2024-10-15',
    status: 'completed',
  },
  {
    id: 'txn-2',
    type: 'credit',
    amount: 2000,
    description: 'Wallet Top-up',
    date: '2024-10-10',
    status: 'completed',
  },
  {
    id: 'txn-3',
    type: 'debit',
    amount: 300,
    description: 'Merchandise Purchase - T-Shirt',
    date: '2024-10-08',
    status: 'completed',
  },
  {
    id: 'txn-4',
    type: 'debit',
    amount: 400,
    description: 'Event Registration - Cultural Night',
    date: '2024-10-05',
    status: 'completed',
  },
  {
    id: 'txn-5',
    type: 'credit',
    amount: 1000,
    description: 'Prize Money - Hackathon Winner',
    date: '2024-10-01',
    status: 'completed',
  },
];

export const mockEventRegistrations: EventRegistration[] = [
  {
    eventId: 'event-1',
    eventName: 'Tech Symposium 2024',
    registrationDate: '2024-10-15',
    status: 'participated',
    paymentAmount: 500,
  },
  {
    eventId: 'event-2',
    eventName: 'Cultural Night',
    registrationDate: '2024-10-05',
    status: 'participated',
    paymentAmount: 400,
  },
  {
    eventId: 'event-3',
    eventName: 'Hackathon 2024',
    registrationDate: '2024-09-28',
    status: 'registered',
    paymentAmount: 750,
  },
  {
    eventId: 'event-4',
    eventName: 'Sports Fest',
    registrationDate: '2024-09-20',
    status: 'registered',
    paymentAmount: 300,
  },
];

export const mockMerchOrders = [
  {
    id: 'merch-1',
    itemName: 'IGNITIA T-Shirt',
    quantity: 2,
    amount: 600,
    date: '2024-10-08',
    status: 'delivered',
  },
  {
    id: 'merch-2',
    itemName: 'Festival Hoodie',
    quantity: 1,
    amount: 1200,
    date: '2024-09-15',
    status: 'in-transit',
  },
];
