import type { Event, Product, Sponsor, ArchiveItem, EventCategory, EventSubCategory } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    // Fallback to a default image if not found, to prevent crashes
    console.warn(`Image with id ${id} not found. Using default.`);
    return PlaceHolderImages.find(i => i.id === 'event-1') || PlaceHolderImages[0];
  }
  return image;
};

export const eventCategories: EventCategory[] = [
    { id: 'technical', name: 'Technical' },
    { id: 'entrepreneurial', name: 'Entrepreneurial' },
    { id: 'miscellaneous', name: 'Miscellaneous' },
];

export const eventSubCategories: { [key: string]: EventSubCategory[] } = {
    'technical': [
        { id: 'coding', name: 'Coding', eventIds: ['5'] },
        { id: 'robotics', name: 'Robotics', eventIds: [] },
    ],
    'entrepreneurial': [
        { id: 'fintech', name: 'FinTech', eventIds: ['1', '2'] },
        { id: 'business-events', name: 'Business Events', eventIds: ['3'] },
        { id: 'startup', name: 'Startup', eventIds: [] },
    ],
    'miscellaneous': [
        { id: 'gaming', name: 'Gaming', eventIds: ['4'] },
        { id: 'art', name: 'Art', eventIds: [] },
    ]
};

export const events: Event[] = [
  {
    id: '1',
    title: 'Beat the Market',
    date: 'August 15, 2024',
    location: 'Trading Arena',
    description: 'A high-stakes stock trading simulation challenge. Show off your market knowledge and risk management skills to build the winning portfolio.',
    image: getImage('fintech-1'),
    prize: '75,000',
    category: 'entrepreneurial',
    subCategory: 'fintech'
  },
  {
    id: '2',
    title: 'Trade Quest',
    date: 'August 16, 2024',
    location: 'Trading Arena',
    description: 'An algorithmic trading competition where your bot battles others in a fast-paced virtual market.',
    image: getImage('fintech-2'),
     prize: '75,000',
    category: 'entrepreneurial',
    subCategory: 'fintech'
  },
  {
    id: '3',
    title: 'Innovate & Create Tech Summit',
    date: 'September 5, 2024',
    location: 'Silicon Valley, CA',
    description: 'A summit for the brightest minds in technology and design to share ideas that shape the future.',
    image: getImage('event-2'),
    category: 'entrepreneurial',
    subCategory: 'business-events'
  },
  {
    id: '4',
    title: 'Gourmet Bites Food & Wine Festival',
    date: 'November 1-3, 2024',
    location: 'Napa Valley, CA',
    description: 'Experience world-class cuisine and wines in the beautiful Napa Valley.',
    image: getImage('event-4'),
    category: 'miscellaneous',
    subCategory: 'gaming'
  },
  {
    id: '5',
    title: 'Synthwave Summer Fest',
    date: 'August 15-17, 2024',
    location: 'Miami Beach, FL',
    description: 'The biggest electronic music festival of the year, featuring artists from around the globe.',
    image: getImage('event-1'),
    category: 'technical',
    subCategory: 'coding'
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Ignitia Official Tee',
    price: 350,
    image: getImage('merch-1'),
  },
  {
    id: '4',
    name: 'Ignitia Hoodie',
    price: 800,
    image: getImage('merch-4'),
  },
  {
    id: '7',
    name: 'Ignitia Bomber Jacket',
    price: 1200,
    image: getImage('merch-jacket'),
  },
  {
    id: '2',
    name: 'Synthwave Snapback Cap',
    price: 250,
    image: getImage('merch-2'),
  },
  {
    id: '3',
    name: 'Eco-Friendly Water Bottle',
    price: 200,
    image: getImage('merch-3'),
  },
  {
    id: '5',
    name: 'Collector\'s Edition Pin Set',
    price: 150,
    image: getImage('merch-5'),
  },
  {
    id: '6',
    name: 'Art Showcase Tote Bag',
    price: 300,
    image: getImage('merch-6'),
  },
];

export const sponsors: Sponsor[] = [
    { id: '1', name: 'TechCorp', logo: getImage('sponsor-1'), tier: 'Platinum' },
    { id: '5', name: 'QuantumLeap', logo: getImage('sponsor-quantumleap'), tier: 'Platinum' },
    { id: '2', name: 'AquaFizz', logo: getImage('sponsor-2'), tier: 'Gold' },
    { id: '6', name: 'Starlight Studios', logo: getImage('sponsor-starlight'), tier: 'Gold' },
    { id: '3', name: 'MediaStream', logo: getImage('sponsor-3'), tier: 'Silver' },
    { id: '7', name: 'ByteBuilders', logo: getImage('sponsor-bytebuilders'), tier: 'Silver' },
    { id: '4', name: 'CapitalBank', logo: getImage('sponsor-4'), tier: 'Partner' },
    { id: '8', name: 'Innovate Inc.', logo: getImage('sponsor-innovateinc'), tier: 'Partner' },
];

export const archiveItems: ArchiveItem[] = [
    { id: '1', title: 'Main Stage Highlights', year: 2023, topic: 'Music', image: getImage('archive-1') },
    { id: '2', title: 'Future of AI Panel', year: 2023, topic: 'Tech', image: getImage('archive-2') },
    { id: '3', title: 'Startup Networking Mixer', year: 2022, topic: 'Business', image: getImage('archive-3') },
    { id: '4', title: 'Closing Ceremony Rock Band', year: 2022, topic: 'Music', image: getImage('archive-4') },
    { id: '5', title: 'Interactive Light Sculpture', year: 2021, topic: 'Art', image: getImage('archive-5') },
    { id: '6', title: 'Crowd Enjoying the Show', year: 2021, topic: 'Community', image: getImage('archive-6') },
];
