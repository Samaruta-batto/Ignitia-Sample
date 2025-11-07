'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bot, User, CornerDownLeft, Loader2, AlertTriangle, X, Send } from 'lucide-react';
import {
  answerQuestion,
} from '@/ai/flows/chatbot-answers-faqs';
import {
  escalateToSupport,
} from '@/ai/flows/chatbot-escalates-complex-issues';
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
    setInput('');
    setIsLoading(true);

    try {
      const response = await answerQuestion({ question: input });
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'system',
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast({
        variant: "destructive",
        title: "Chatbot Error",
        description: "Could not get a response from the AI assistant."
      })
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEscalation = async () => {
    setIsLoading(true);
    const systemMessage: Message = { role: 'system', content: 'Escalating to human support...' };
    setMessages((prev) => [...prev, systemMessage]);

    try {
      const chatHistory = messages.map(m => `${m.role}: ${m.content}`).join('\n');
      const userQuery = messages.filter(m => m.role === 'user').pop()?.content || "User needs help.";
      
      const response = await escalateToSupport({ userQuery, chatHistory });
      
      const escalationMessage: Message = { role: 'assistant', content: response.escalationMessage };
      setMessages((prev) => [...prev, escalationMessage]);

    } catch (error) {
       const errorMessage: Message = {
        role: 'system',
        content: "Sorry, I couldn't process the escalation request. Please contact support directly.",
      };
      setMessages((prev) => [...prev, errorMessage]);
       toast({
        variant: "destructive",
        title: "Escalation Error",
        description: "Failed to escalate to human support."
      })
    } finally {
      setIsLoading(false);
    }
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
            <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5"/>
            </Button>
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
             <Button variant="outline" size="sm" onClick={handleEscalation} disabled={isLoading} className="mb-3 w-full">
                <AlertTriangle className="mr-2 h-4 w-4"/> Escalate to Human Support
            </Button>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-background/50 rounded-full px-4"
                autoComplete="off"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="rounded-full bg-accent hover:bg-accent/90">
                <Send size={18} />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </footer>
        </motion.div>
      )}
      </AnimatePresence>
  );
}
