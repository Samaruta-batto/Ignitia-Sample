'use client';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { TopNav } from './top-nav';
import { Logo } from '../icons/logo';
import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-background/30 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo className="w-36 hidden sm:block" />
          </Link>
        </div>
        <TopNav />
        <div className="flex items-center gap-2">
          <Button className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20">
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
        </div>
      </div>
    </header>
  );
}
