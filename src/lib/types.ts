
import type { ImagePlaceholder } from './placeholder-images';

export interface Event {
  id: string;
  title: string;
  name: string;
  date: string;
  location: string;
  description: string;
  image: ImagePlaceholder;
  price?: number;
  prize?: string;
  category: string;
  subCategory: string;
  registeredAttendees?: number;
  imageUrl?: string;
}

export interface EventCategory {
    id: string;
    name: string;
}

export interface EventSubCategory {
    id: string;
    name: string;
    eventIds: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: ImagePlaceholder;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: ImagePlaceholder;
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Partner';
}

export interface ArchiveItem {
  id: string;
  title: string;
  year: number;
  topic: string;
  image: ImagePlaceholder;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface EventRegistration {
  eventId: string;
  eventName: string;
  registrationDate: string;
  status: 'registered' | 'participated' | 'cancelled';
  paymentAmount?: number;
}
