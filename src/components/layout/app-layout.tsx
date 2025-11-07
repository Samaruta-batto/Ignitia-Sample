'use client';

import * as React from 'react';
import { AppHeader } from './header';
import { ChatbotTrigger } from '@/components/chatbot/chatbot-trigger';
import { Chatbot } from '@/components/chatbot/chatbot';
import { ConsoleWarning } from '@/components/layout/console-warning';

export function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <ConsoleWarning />
      <AppHeader />
      <main className="flex-1 p-4 md:p-8 animate-fade-in container mx-auto">
        {children}
      </main>
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <ChatbotTrigger onClick={() => setIsChatOpen(true)} />
    </div>
  );
}
