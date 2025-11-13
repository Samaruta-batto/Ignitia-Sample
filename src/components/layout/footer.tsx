
import Link from 'next/link';
import { Logo } from '../icons/logo';
import { ShimmerButton } from '../ui/shimmer-button';
import { Youtube, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

const footerNav = [
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/merchandise', label: 'Merch' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: '#', icon: Youtube, 'aria-label': 'Youtube' },
  { href: '#', icon: Instagram, 'aria-label': 'Instagram' },
  { href: '#', icon: Facebook, 'aria-label': 'Facebook' },
  { href: '#', icon: Linkedin, 'aria-label': 'LinkedIn' },
  { href: '#', icon: Twitter, 'aria-label': 'Twitter' },
];

export function AppFooter() {
  return (
    <footer className="bg-primary/20 border-t border-border mt-24">
      <div className="container mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start gap-4">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              The premier techno-cultural fest of PSIT, Kanpur.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-headline text-lg uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footerNav.map(item => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-muted-foreground hover:text-accent transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-lg uppercase tracking-wider mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a href={social.href} key={index} target="_blank" rel="noopener noreferrer" aria-label={social['aria-label']}>
                    <ShimmerButton size="icon" className="bg-card/50 rounded-full">
                        <social.icon />
                    </ShimmerButton>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-start-2 md:col-span-2 lg:col-start-auto lg:col-span-1 border-t md:border-t-0 pt-8 md:pt-0">
             <h3 className="font-headline text-lg uppercase tracking-wider mb-4">Stay Updated</h3>
             <p className="text-muted-foreground mb-4">Subscribe to our newsletter for the latest updates.</p>
             {/* Newsletter form can be added here */}
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Ignitia. All Rights Reserved. Designed by the community.</p>
        </div>
      </div>
    </footer>
  );
}
