
'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useCartStore } from '@/hooks/use-cart-store';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { ShimmerButton } from '../ui/shimmer-button';
import { ScrollArea } from '../ui/scroll-area';

export function CartSheet() {
  const { cart, total, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useCartStore();

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="text-2xl font-headline tracking-wider">Shopping Cart</SheetTitle>
        </SheetHeader>
        <Separator />

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
            <SheetClose asChild>
                <Button>Continue Shopping</Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted">
                        <Image
                            src={item.image.imageUrl}
                            alt={item.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-bold w-4 text-center">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-end py-1">
                         <p className="font-bold">{formatCurrency(item.price * item.quantity)}</p>
                         <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="p-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <ShimmerButton className="w-full">
                Proceed to Checkout
              </ShimmerButton>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
