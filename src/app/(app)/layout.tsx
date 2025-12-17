
'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { usePathname } from 'next/navigation';
import { useUser, type User } from '@/lib/auth';
import { motion } from 'framer-motion';

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

  const variants = {
    hidden: { opacity: 0, y: 15 },
    enter: { opacity: 1, y: 0 },
  };

  return (
    <AppLayout user={user}>
        <motion.div 
            key={pathname}
            variants={variants}
            initial="hidden"
            animate="enter"
            transition={{ type: 'linear', duration: 0.5 }}
            className="p-4 md:p-8"
        >
            {children}
        </motion.div>
    </AppLayout>
  );
}
