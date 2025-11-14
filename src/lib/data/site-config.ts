
import { Youtube, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

export const siteConfig = {
  socials: [
    { href: '#', icon: Youtube, 'aria-label': 'Youtube' },
    { href: '#', icon: Instagram, 'aria-label': 'Instagram' },
    { href: '#', icon: Facebook, 'aria-label': 'Facebook' },
    { href: '#', icon: Linkedin, 'aria-label': 'LinkedIn' },
    { href: '#', icon: Twitter, 'aria-label': 'Twitter' },
  ],
};

export const navItems = [
  { href: '/home', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/merchandise', label: 'Merch' },
  { href: '/contact', label: 'Contact' },
];


export type SiteConfig = typeof siteConfig;
