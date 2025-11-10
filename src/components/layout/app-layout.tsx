
'use client';

import * as React from 'react';
import { AppHeader } from './header';
import { ChatbotTrigger } from '@/components/chatbot/chatbot-trigger';
import { Chatbot } from '@/components/chatbot/chatbot';
import { ConsoleWarning } from '@/components/layout/console-warning';
import type { User } from 'firebase/auth';
import { WarpBackground } from '../ui/warp-background';

export function AppLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <ConsoleWarning />
      <AppHeader user={user} />
      <main className="flex-1 animate-fade-in container mx-auto">
        <WarpBackground>
          <div className="p-4 md:p-8">
            {children}
          </div>
        </WarpBackground>
      </main>
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <ChatbotTrigger onClick={() => setIsChatOpen(true)} />
    </div>
  );
}
