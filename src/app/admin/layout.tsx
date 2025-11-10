
'use client';
import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '../(app)/loading';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const isAuthorized = user?.role === 'ADMIN' || user?.role === 'DEV_TEAM';

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAuthorized)) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, isAuthorized, router]);

  if (isLoading || !isAuthenticated || !isAuthorized) {
    return <Loading />;
  }
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 bg-background/50">
        {children}
      </main>
    </div>
  );
}
