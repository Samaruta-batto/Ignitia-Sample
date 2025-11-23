"use client";

import { useEffect, useState, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (!token) {
      router.replace('/');
      return;
    }

    (async () => {
      try {
        const res = await fetch('/api/user/profile', { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) {
          router.replace('/');
          return;
        }
        const data = await res.json();
        // `role` should be present from the userService; fallback to env-based check is server-side
        if (data?.user?.role === 'admin') {
          setAllowed(true);
        } else {
          router.replace('/');
        }
      } catch (err) {
        console.error('AdminGuard check failed', err);
        router.replace('/');
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent>Checking admin permissions…</CardContent>
        </Card>
      </div>
    );
  }

  if (!allowed) return null;

  return <>{children}</>;
}
