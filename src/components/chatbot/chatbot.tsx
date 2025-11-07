'use client';

import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bot, User, CornerDownLeft, Loader2, AlertTriangle } from 'lucide-react';
import {
  answerQuestion,
  AnswerQuestionInput,
} from '@/ai/flows/chatbot-answers-faqs';
import {
  escalateToSupport,
  EscalationInput,
} from '@/ai/flows/chatbot-escalates-complex-issues';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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

export function Chatbot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => setIsOpen(open);

  React.useEffect(() => {
    // This is a global listener to open the chat.
    const openChat = () => setIsOpen(true);
    window.addEventListener('open-chatbot', openChat);
    return () => window.removeEventListener('open-chatbot', openChat);
  }, []);

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
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="flex flex-col p-0 w-full sm:max-w-md">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="font-headline text-xl flex items-center gap-2">
            <Bot className="text-accent" />
            AI Support Chat
          </SheetTitle>
           <SheetDescription>
            Ask questions or escalate to a human agent.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="p-4 space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role !== 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {message.role === 'assistant' ? <Bot size={20}/> : <AlertTriangle size={20} />}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs rounded-lg p-3 text-sm whitespace-pre-wrap',
                    message.role === 'user'
                      ? 'bg-accent text-accent-foreground'
                      : message.role === 'assistant' ? 'bg-primary' : 'bg-destructive/20 text-destructive-foreground',
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
              <div className="flex items-start gap-3 justify-start">
                 <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot size={20}/>
                    </AvatarFallback>
                  </Avatar>
                <div className="max-w-xs rounded-lg p-3 bg-primary flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin"/>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <SheetFooter className="p-4 border-t bg-background space-y-4">
          <Button variant="outline" onClick={handleEscalation} disabled={isLoading}>
            <AlertTriangle className="mr-2 h-4 w-4"/> Escalate to Human Support
          </Button>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <CornerDownLeft size={16} />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
