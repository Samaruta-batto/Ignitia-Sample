'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { usePathname } from 'next/navigation';

// Helper to convert pathname to title
function pathnameToTitle(pathname: string): string {
  if (pathname === '/') return 'Welcome';
  if (pathname === '/home') return 'Home';
  const title = pathname.replace('/', '').replace(/-/g, ' ');
  return title.charAt(0).toUpperCase() + title.slice(1);
}

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = pathnameToTitle(pathname);

  return <AppLayout headerTitle={title}>{children}</AppLayout>;
}
