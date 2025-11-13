
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
  const { user } = useUser();
  
  const noLayoutRoutes = ['/user-login', '/signup', '/login'];
  if (noLayoutRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <AppLayout user={user}>
        <div className="p-4 md:p-8 animate-fade-in">
            {children}
        </div>
    </AppLayout>
  );
}
