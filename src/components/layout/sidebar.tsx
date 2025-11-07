'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import {
  Ticket,
  ShoppingBag,
  Wallet,
  Image as ImageIcon,
  LayoutDashboard,
  UserCircle,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const menuItems = [
  {
    href: '/',
    label: 'Events',
    icon: Ticket,
  },
  {
    href: '/merchandise',
    label: 'Merchandise',
    icon: ShoppingBag,
  },
  {
    href: '/wallet',
    label: 'Wallet',
    icon: Wallet,
  },
  {
    href: '/archive',
    label: 'Archive',
    icon: ImageIcon,
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo className="w-36" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon className="text-accent" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <Separator className="my-2" />
        <div className="p-2 flex items-center gap-3">
            <Avatar>
                <AvatarImage src="https://picsum.photos/seed/user/40/40" data-ai-hint="user avatar"/>
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-semibold text-sm">User</span>
                <span className="text-xs text-muted-foreground">user@festconnect.com</span>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
