
'use client';
import { create } from 'zustand';
import type { Product } from '@/lib/data/types';

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
  checkoutWithWallet: (token: string) => Promise<{ success: boolean; message: string; newBalance?: number }>;
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

  removeFromCart: (productId) => {
    // TODO: Sync with Rust backend
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== productId);
      const newTotal = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { cart: newCart, total: newTotal };
    });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    // TODO: Sync with Rust backend
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
  
  checkoutWithWallet: async (token: string) => {
    const { cart, total } = get();
    
    if (cart.length === 0) {
      return { success: false, message: 'Cart is empty' };
    }
    
    try {
      const response = await fetch('/api/user/wallet/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          total: total,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Clear cart on successful purchase
        set({ cart: [], total: 0, isCartOpen: false });
        return { 
          success: true, 
          message: result.message || 'Purchase successful!',
          newBalance: result.newBalance 
        };
      } else {
        return { 
          success: false, 
          message: result.error || 'Purchase failed' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        message: 'Network error. Please try again.' 
      };
    }
  },
}));
