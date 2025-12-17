
'use client';
import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '../(app)/loading';
import { useUser } from '@/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  // For now, let's allow any signed in user to be an admin for demo purposes
  const isAuthorized = !!user;

  useEffect(() => {
    if (!isUserLoading && !isAuthorized) {
      router.push('/user-login');
    }
  }, [isUserLoading, isAuthorized, router]);

  if (isUserLoading || !isAuthorized) {
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
