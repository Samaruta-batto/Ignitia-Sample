import type { ImagePlaceholder } from './placeholder-images';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: ImagePlaceholder;
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
