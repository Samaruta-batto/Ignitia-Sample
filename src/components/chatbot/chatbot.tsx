'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Bot, User, CornerDownLeft, Loader2, AlertTriangle, X, Send } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content:
      "Hello! I'm the Ignitia AI assistant. How can I help you today? You can ask me about events, merchandise, or general questions.",
  },
];

// Mock responses for frontend-only deployment
const getMockResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('event') || lowerQuestion.includes('schedule')) {
    return "Ignitia 2K26 is coming soon! We'll be announcing our exciting lineup of tech events, workshops, and competitions. Stay tuned for updates on our website and social media channels.";
  }
  
  if (lowerQuestion.includes('merch') || lowerQuestion.includes('merchandise')) {
    return "Our exclusive Ignitia merchandise will be available soon! We'll have t-shirts, hoodies, stickers, and more. Keep an eye out for our merchandise launch announcement.";
  }
  
  if (lowerQuestion.includes('date') || lowerQuestion.includes('when')) {
    return "Ignitia 2K26 dates will be announced soon! We're working hard to bring you an amazing tech fest experience. Follow us for the latest updates.";
  }
  
  if (lowerQuestion.includes('register') || lowerQuestion.includes('signup')) {
    return "Registration for Ignitia 2K26 will open soon! We'll announce registration details on our website and social media. Make sure to follow us so you don't miss out!";
  }
  
  if (lowerQuestion.includes('location') || lowerQuestion.includes('venue')) {
    return "Ignitia 2K26 will be held at our campus. Detailed venue information and maps will be shared closer to the event date.";
  }
  
  return "Thanks for your question! Ignitia 2K26 is still in the planning phase. For the most up-to-date information, please check our website regularly or contact our team directly.";
};

export function Chatbot({ isOpen, onClose }: { isOpen: boolean, onClose: () => void}) {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: getMockResponse(currentInput),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  const handleEscalation = async () => {
    setIsLoading(true);
    const systemMessage: Message = { role: 'system', content: 'Escalating to human support...' };
    setMessages((prev) => [...prev, systemMessage]);

    // Simulate escalation delay
    setTimeout(() => {
      const escalationMessage: Message = { 
        role: 'assistant', 
        content: "I've escalated your query to our human support team. They'll get back to you soon via email or phone. For immediate assistance, you can also contact us directly through our contact page."
      };
      setMessages((prev) => [...prev, escalationMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
         <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 w-[400px] h-[600px] bg-card/80 backdrop-blur-lg border border-border/30 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
        >
          <header className="flex items-center justify-between p-4 border-b border-border/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10 border-2 border-accent">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot size={24}/>
                    </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 border-2 border-card" />
              </div>
              <div>
                <h2 className="font-bold text-lg">AI Assistant</h2>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
            <ShimmerButton variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5"/>
            </ShimmerButton>
          </header>
          
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-6 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-end gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role !== 'user' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={cn(
                        "text-white", 
                        message.role === 'assistant' ? 'bg-primary' : 'bg-destructive'
                      )}>
                        {message.role === 'assistant' ? <Bot size={20}/> : <AlertTriangle size={20} />}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl p-3 text-sm whitespace-pre-wrap shadow-md',
                      message.role === 'user'
                        ? 'bg-accent text-accent-foreground rounded-br-none'
                        : message.role === 'assistant' 
                          ? 'bg-primary rounded-bl-none' 
                          : 'bg-destructive text-destructive-foreground rounded-bl-none',
                    )}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        <User size={20} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end gap-3 justify-start">
                   <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot size={20}/>
                      </AvatarFallback>
                    </Avatar>
                  <div className="max-w-xs rounded-2xl p-3 bg-primary flex items-center rounded-bl-none">
                      <Loader2 className="h-5 w-5 animate-spin"/>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <footer className="p-4 border-t border-border/30 bg-card/50">
             <ShimmerButton variant="outline" size="sm" onClick={handleEscalation} disabled={isLoading} className="mb-3 w-full">
                <AlertTriangle className="mr-2 h-4 w-4"/> Escalate to Human Support
            </ShimmerButton>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-background/50 rounded-full px-4"
                autoComplete="off"
              />
              <ShimmerButton type="submit" size="icon" disabled={isLoading || !input.trim()} className="rounded-full bg-accent hover:bg-accent/90">
                <Send size={18} />
                <span className="sr-only">Send</span>
              </ShimmerButton>
            </form>
          </footer>
        </motion.div>
      )}
      </AnimatePresence>
  );
}
