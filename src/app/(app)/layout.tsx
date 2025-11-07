
'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noLayoutRoutes = ['/user-login', '/signup', '/login'];
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
      });

      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [supabase]);

  if (noLayoutRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return <AppLayout user={user}>{children}</AppLayout>;
}
