
'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import type { User } from 'firebase/auth';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noLayoutRoutes = ['/user-login', '/signup'];
  const { user } = useUser();

  if (noLayoutRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return <AppLayout user={user}>{children}</AppLayout>;
}
