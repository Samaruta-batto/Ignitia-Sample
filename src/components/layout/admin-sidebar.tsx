
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, Shield, Users, LogOut, Flame, User, Wallet, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Separator } from '../ui/separator';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/add-event', label: 'Add Event', icon: PlusCircle },
  { href: '/admin/stats', label: 'Stats', icon: BarChart2 },
  { href: '/admin/audits', label: 'Audits', icon: Shield },
  { href: '/admin/users', label: 'Users', icon: Users },
];

const userMenuItems = [
  { href: '/profile', label: 'My Profile', icon: User },
  { href: '/wallet', label: 'My Wallet', icon: Wallet },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const auth = useAuth();


  const handleSignOut = async () => {
    if (auth) {
        await signOut(auth);
    }
    router.push('/');
    router.refresh();
  };

  const availableMenuItems = menuItems;

  return (
    <aside className="w-64 flex-shrink-0 bg-sidebar border-r border-sidebar-border text-sidebar-foreground p-4 flex flex-col">
      <div className="flex items-center gap-2 p-4 mb-4">
        <Flame className="text-sidebar-primary h-8 w-8" />
        <span className="font-headline text-2xl font-bold">IGNITIA</span>
      </div>
      <nav className="flex-1 space-y-2">
        <div className="space-y-2">
          {availableMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                pathname === item.href
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-2">
          <p className="px-3 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
            Personal
          </p>
          {userMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                pathname === item.href
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
