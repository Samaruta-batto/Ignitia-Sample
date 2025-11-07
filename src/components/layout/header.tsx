'use client';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { TopNav } from './top-nav';
import { Logo } from '../icons/logo';
import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo className="w-36 hidden sm:block" />
          </Link>
        </div>
        <TopNav />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="text-accent" />
            <span className="sr-only">Shopping Cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
