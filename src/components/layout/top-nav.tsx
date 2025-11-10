
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Ticket,
  Image as ImageIcon,
  LayoutDashboard,
  Home,
  Info,
  Users,
  Award,
  Contact,
  Menu,
  ShoppingBag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShimmerButton } from '../ui/shimmer-button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Logo } from '../icons/logo';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const menuItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: Info },
  { href: '/events', label: 'Events', icon: Ticket },
  { href: '/merchandise', label: 'Merch', icon: ShoppingBag },
  { href: '/dashboard', label: 'Leaderboard', icon: LayoutDashboard },
  { href: '/archive', label: 'Gallery', icon: ImageIcon },
  { href: '/sponsors', label: 'Sponsors', icon: Award },
  { href: '/teams', label: 'Teams', icon: Users },
];

export function TopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav className="hidden md:flex items-center justify-center flex-1">
        <div className="bg-card/50 backdrop-blur-md rounded-full border border-border/20 shadow-lg px-4 py-2">
          <div className="flex items-center gap-1">
            {menuItems.map((item) => (
              <ShimmerButton
                key={item.label}
                variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                asChild
                className="text-sm rounded-full"
              >
                <Link href={item.href}>{item.label}</Link>
              </ShimmerButton>
            ))}
          </div>
        </div>
      </nav>
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <ShimmerButton variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Open Menu</span>
            </ShimmerButton>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <div className="p-4">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Logo className="w-36" />
              </Link>
            </div>
            <Separator />
            <nav className="flex-1 flex flex-col gap-2 p-4">
              {[...menuItems, { href: '/contact', label: 'Contact', icon: Contact }].map((item) => (
                <ShimmerButton
                  key={item.label}
                  variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                  asChild
                  className="justify-start gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4 text-accent" />
                    {item.label}
                  </Link>
                </ShimmerButton>
              ))}
            </nav>
             <Separator />
             <div className="p-4 flex items-center gap-3">
                <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/user/40/40" data-ai-hint="user avatar"/>
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">User</span>
                    <span className="text-xs text-muted-foreground">user@ignitia.in</span>
                </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
