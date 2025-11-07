'use client';

import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ChatbotTriggerProps = {
  onClick: () => void;
};

export function ChatbotTrigger({ onClick }: ChatbotTriggerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        size="icon"
        className="h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-110 hover:bg-accent/90"
        aria-label="Open Chatbot"
      >
        <Bot size={28} />
      </Button>
    </div>
  );
}
