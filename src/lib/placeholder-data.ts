import type { Event, Product, Sponsor, ArchiveItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    throw new Error(`Image with id ${id} not found`);
  }
  return image;
};

export const events: Event[] = [
  {
    id: '1',
    title: 'Synthwave Summer Fest',
    date: 'August 15-17, 2024',
    location: 'Miami Beach, FL',
    description: 'The biggest electronic music festival of the year, featuring artists from around the globe.',
    image: getImage('event-1'),
  },
  {
    id: '2',
    title: 'Innovate & Create Tech Summit',
    date: 'September 5, 2024',
    location: 'Silicon Valley, CA',
    description: 'A summit for the brightest minds in technology and design to share ideas that shape the future.',
    image: getImage('event-2'),
  },
  {
    id: '3',
    title: 'Modern Art Showcase: The Digital Age',
    date: 'October 10-20, 2024',
    location: 'New York, NY',
    description: 'An immersive art exhibition exploring the intersection of art and digital technology.',
    image: getImage('event-3'),
  },
  {
    id: '4',
    title: 'Gourmet Bites Food & Wine Festival',
    date: 'November 1-3, 2024',
    location: 'Napa Valley, CA',
    description: 'Experience world-class cuisine and wines in the beautiful Napa Valley.',
    image: getImage('event-4'),
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'FestConnect Official Tee',
    price: 29.99,
    image: getImage('merch-1'),
  },
  {
    id: '2',
    name: 'Synthwave Snapback Cap',
    price: 24.99,
    image: getImage('merch-2'),
  },
  {
    id: '3',
    name: 'Eco-Friendly Water Bottle',
    price: 19.99,
    image: getImage('merch-3'),
  },
  {
    id: '4',
    name: 'Innovate Summit Hoodie',
    price: 59.99,
    image: getImage('merch-4'),
  },
  {
    id: '5',
    name: 'Collector\'s Edition Pin Set',
    price: 14.99,
    image: getImage('merch-5'),
  },
  {
    id: '6',
    name: 'Art Showcase Tote Bag',
    price: 22.99,
    image: getImage('merch-6'),
  },
];

export const sponsors: Sponsor[] = [
    { id: '1', name: 'TechCorp', logo: getImage('sponsor-1') },
    { id: '2', name: 'AquaFizz', logo: getImage('sponsor-2') },
    { id: '3', name: 'MediaStream', logo: getImage('sponsor-3') },
    { id: '4', name: 'CapitalBank', logo: getImage('sponsor-4') },
];

export const archiveItems: ArchiveItem[] = [
    { id: '1', title: 'Main Stage Highlights', year: 2023, topic: 'Music', image: getImage('archive-1') },
    { id: '2', title: 'Future of AI Panel', year: 2023, topic: 'Tech', image: getImage('archive-2') },
    { id: '3', title: 'Startup Networking Mixer', year: 2022, topic: 'Business', image: getImage('archive-3') },
    { id: '4', title: 'Closing Ceremony Rock Band', year: 2022, topic: 'Music', image: getImage('archive-4') },
    { id: '5', title: 'Interactive Light Sculpture', year: 2021, topic: 'Art', image: getImage('archive-5') },
    { id: '6', title: 'Crowd Enjoying the Show', year: 2021, topic: 'Community', image: getImage('archive-6') },
];
