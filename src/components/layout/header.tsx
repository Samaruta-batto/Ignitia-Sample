
'use client';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, UserPlus, LogOut, Wallet, User as UserIcon, ShoppingCart } from 'lucide-react';
import { TopNav } from './top-nav';
import { Logo } from '../icons/logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/hooks/use-cart-store';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { PlaceHolderImages } from '@/lib/data/placeholder-images';
import { useEffect, useState } from 'react';

export function AppHeader() {
  const router = useRouter();
  const { cart, toggleCart } = useCartStore();
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pravatarPlaceholder = PlaceHolderImages.find(p => p.id === 'pravatar-placeholder');

  const checkAuthToken = () => {
    const saved = localStorage.getItem('auth_token');
    setToken(saved);
    if (saved) {
      try {
        // Check if token has the expected JWT format (3 parts separated by dots)
        const parts = saved.split('.');
        if (parts.length === 3) {
          const decoded = JSON.parse(atob(parts[1]));
          setUserEmail(decoded.email || null);
        } else {
          // Invalid token format, clear it
          localStorage.removeItem('auth_token');
          setToken(null);
        }
      } catch (error) {
        // Invalid token, clear it
        console.warn('Invalid token found, clearing:', error);
        localStorage.removeItem('auth_token');
        setToken(null);
        setUserEmail(null);
      }
    } else {
      setToken(null);
      setUserEmail(null);
    }
  };

  useEffect(() => {
    // Check token on mount
    checkAuthToken();

    // Listen for storage changes (when token is added/removed in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token') {
        checkAuthToken();
      }
    };

    // Listen for focus events (when user returns to tab after login)
    const handleFocus = () => {
      checkAuthToken();
    };

    // Listen for custom auth-changed events
    const handleAuthChanged = () => {
      checkAuthToken();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('auth-changed', handleAuthChanged);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('auth-changed', handleAuthChanged);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUserEmail(null);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('auth-changed'));
    
    router.push('/');
    router.refresh();
  };
  
  const userInitial = (userEmail)?.charAt(0).toUpperCase() || 'U';

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-background/30 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <TopNav />
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
              <ShoppingCart />
              {cartItemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{cartItemCount}</Badge>
              )}
           </Button>
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Signed In</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                   <Link href="/wallet">
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>My Wallet</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <ShimmerButton asChild className="px-4 py-2 bg-transparent text-white">
                <Link href="/user-login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </ShimmerButton>
              <ShimmerButton asChild className="px-5 py-2.5">
                <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Link>
              </ShimmerButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
