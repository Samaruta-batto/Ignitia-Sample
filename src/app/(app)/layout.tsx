
'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import type { User } from 'firebase/auth';
import { WarpBackground } from '@/components/ui/warp-background';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noLayoutRoutes = ['/user-login', '/signup', '/login'];
  const { user } = useUser();

  if (noLayoutRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <AppLayout user={user}>
      <WarpBackground>
        <div className="p-4 md:p-8">
            {children}
        </div>
      </WarpBackground>
    </AppLayout>
  );
}
