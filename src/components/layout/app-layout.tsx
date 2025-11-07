'use client';

import * as React from 'react';
import {
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/sidebar';
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen">
        <AppHeader title={headerTitle} />
        <main className="flex-1 p-4 md:p-8 animate-fade-in">
            {children}
        </main>
      </SidebarInset>
      <Chatbot />
      <ChatbotTrigger onClick={handleChatbotOpen} />
    </SidebarProvider>
  );
}
