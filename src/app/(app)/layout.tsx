'use client';

import { AppLayout } from '@/components/layout/app-layout';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <AppLayout headerTitle="">{children}</AppLayout>;
}
