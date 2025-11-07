'use client';

import * as React from 'react';
import { AppHeader } from './header';
import { ChatbotTrigger } from '@/components/chatbot/chatbot-trigger';
import { Chatbot } from '@/components/chatbot/chatbot';

export function AppLayout({
  children,
  headerTitle,
}: {
  children: React.ReactNode;
  headerTitle: string;
}) {
  const handleChatbotOpen = () => {
    window.dispatchEvent(new CustomEvent('open-chatbot'));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-4 md:p-8 animate-fade-in container mx-auto">
        {children}
      </main>
      <Chatbot />
      <ChatbotTrigger onClick={handleChatbotOpen} />
    </div>
  );
}
