
'use client';

import * as React from 'react';
import { AppHeader } from './header';
import { ChatbotTrigger } from '@/components/chatbot/chatbot-trigger';
import { Chatbot } from '@/components/chatbot/chatbot';
import { ConsoleWarning } from '@/components/layout/console-warning';
import type { User } from 'firebase/auth';
import { CartSheet } from '../cart/cart-sheet';
import { useCartStore } from '@/hooks/use-cart-store';
import { useUser, useFirestore } from '@/firebase/provider';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection } from 'firebase/firestore';
import { useMemoFirebase } from '@/firebase/provider';
import type { WithId } from '@/firebase/firestore/use-collection';
import type { CartItem, Product } from '@/lib/data/types';
import { products } from '@/lib/data/placeholder-data';
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
  const { user: authUser } = useUser();
  const firestore = useFirestore();
  const { setCart, setTotal, clearCart } = useCartStore();
  const pathname = usePathname();

  const cartQuery = useMemoFirebase(() => {
    if (!firestore || !authUser?.uid) return null;
    return collection(firestore, 'users', authUser.uid, 'cart');
  }, [firestore, authUser?.uid]);

  const { data: cartItems } = useCollection<WithId<CartItem>>(cartQuery);

  React.useEffect(() => {
    if (cartItems) {
      const populatedCart = cartItems
        .map(item => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return null;
          return { ...product, quantity: item.quantity };
        })
        .filter((item): item is Product & { quantity: number } => item !== null);
      
      setCart(populatedCart);
      const total = populatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(total);
    } else if (!authUser) {
      clearCart();
    }
  }, [cartItems, setCart, setTotal, authUser, clearCart]);

  const isHomePage = pathname === '/home';

  return (
    <motion.div 
        className="min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
      <ConsoleWarning />
      <AppHeader user={user} />
      <main className={`flex-1 ${isHomePage ? '' : 'container mx-auto'}`}>
        {children}
      </main>
      <CartSheet />
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <ChatbotTrigger onClick={() => setIsChatOpen(true)} />
    </motion.div>
  );
}
