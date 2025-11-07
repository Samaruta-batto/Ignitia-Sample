import type { ImagePlaceholder } from './placeholder-images';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: ImagePlaceholder;
  prize?: string;
  category: string;
  subCategory: string;
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
}

export interface ArchiveItem {
  id: string;
  title: string;
  year: number;
  topic: string;
  image: ImagePlaceholder;
}
