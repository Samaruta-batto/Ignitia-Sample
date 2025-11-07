import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { useAuth } from '@/contexts/auth-context';
import { redirect } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 bg-background/50">
        {children}
      </main>
    </div>
  );
}
