
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
import { Button } from '../ui/button';
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
  { href: '/contact', label: 'Contact', icon: Contact },
];

export function TopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav className="hidden md:flex items-center justify-center flex-1">
        <div className="flex items-center gap-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
              asChild
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>
      </nav>
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <div className="p-4">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Logo className="w-36" />
              </Link>
            </div>
            <Separator />
            <nav className="flex-1 flex flex-col gap-2 p-4">
              {menuItems.map((item) => (
                <Button
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
                </Button>
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
