
'use client';
import { create } from 'zustand';
import type { Product } from '@/lib/types';
import { useUser, useFirestore } from '@/firebase';
import { collection, doc, updateDoc, deleteDoc, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';

export type CartItem = Product & { quantity: number };

type CartState = {
  cart: CartItem[];
  total: number;
  isCartOpen: boolean;
  setCart: (cart: CartItem[]) => void;
  setTotal: (total: number) => void;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
};

// Helper function to get Firebase services
const getFirebase = () => {
    try {
        return {
            user: useUser.getState().user,
            firestore: useFirestore.getState(),
        };
    } catch (e) {
        // This can happen if the hook is used outside of a provider,
        // which might occur during store initialization. We'll handle it gracefully.
        return { user: null, firestore: null };
    }
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  total: 0,
  isCartOpen: false,
  setCart: (cart) => set({ cart }),
  setTotal: (total) => set({ total }),
  
  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      } else {
        newCart = [...state.cart, product];
      }
      const newTotal = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { cart: newCart, total: newTotal };
    });
  },

  removeFromCart: async (productId) => {
    const { user, firestore } = getFirebase();
    if (user && firestore) {
        const cartRef = collection(firestore, 'users', user.uid, 'cart');
        const q = query(cartRef, where('productId', '==', productId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await deleteDoc(docRef);
        }
    }

    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== productId);
      const newTotal = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { cart: newCart, total: newTotal };
    });
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    const { user, firestore } = getFirebase();
    if (user && firestore) {
        const cartRef = collection(firestore, 'users', user.uid, 'cart');
        const q = query(cartRef, where('productId', '==', productId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, { quantity });
        }
    }

    set((state) => {
      const newCart = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      const newTotal = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { cart: newCart, total: newTotal };
    });
  },

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  clearCart: () => set({ cart: [], total: 0 }),
}));
