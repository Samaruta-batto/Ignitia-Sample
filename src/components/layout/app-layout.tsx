
'use client';

import * as React from 'react';
import { AppHeader } from './header';
import { ChatbotTrigger } from '@/components/chatbot/chatbot-trigger';
import { Chatbot } from '@/components/chatbot/chatbot';
import { ConsoleWarning } from '@/components/layout/console-warning';
import type { User } from '@/lib/auth';
import { CartSheet } from '../cart/cart-sheet';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function AppLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const pathname = usePathname();

  // TODO: Implement cart synchronization with Rust backend when user authentication is added
  // For now, cart is managed locally via Zustand store

  const isHomePage = pathname === '/home';

  return (
    <motion.div 
        className="min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
      <ConsoleWarning />
      <AppHeader />
      <main className={`flex-1 ${isHomePage ? '' : 'container mx-auto'}`}>
        {children}
      </main>
      <CartSheet />
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <ChatbotTrigger onClick={() => setIsChatOpen(true)} />
    </motion.div>
  );
}
