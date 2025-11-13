
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
import type { User } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useCartStore } from '@/hooks/use-cart-store';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { PlaceHolderImages } from '@/lib/data/placeholder-images';

export function AppHeader({ user }: { user: User | null }) {
  const router = useRouter();
  const auth = useAuth();
  const { cart, toggleCart } = useCartStore();
  const pravatarPlaceholder = PlaceHolderImages.find(p => p.id === 'pravatar-placeholder');

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/');
    router.refresh();
  };
  
  const userInitial = (user?.displayName || user?.email)?.charAt(0).toUpperCase();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getAvatarUrl = () => {
    if (user?.photoURL) return user.photoURL;
    if (pravatarPlaceholder && user?.uid) {
      return `${pravatarPlaceholder.imageUrl}${user.uid}`;
    }
    return '';
  }

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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                     <AvatarImage src={getAvatarUrl()} />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || 'Signed In'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
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
