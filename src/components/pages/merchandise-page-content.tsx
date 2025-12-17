
'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { products } from '@/lib/data/placeholder-data';
import type { Product } from '@/lib/data/types';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/hooks/use-cart-store';
// Firebase removed - using Rust backend
import { useUser } from '@/lib/auth';
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern';

export function MerchandisePageContent() {
  const { toast } = useToast();
  const { user } = useUser();
  const { addToCart } = useCartStore();

  const handleAddToCart = async (product: Product) => {
    // TODO: Implement user authentication check with Rust backend
    // For now, allow adding to cart without authentication
    
    try {
      // Add to local cart store
      addToCart({ ...product, quantity: 1 });
      
      // TODO: Sync with Rust backend when user is authenticated
      toast({
        title: 'Added to Cart!',
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'Could not add item to cart. Please try again.',
      });
    }
  };

  return (
    <InteractiveGridPattern>
      <div className="space-y-16">
      <section className="text-center">
          <h1 className="font-headline text-5xl tracking-wider uppercase">
            Official Merch
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Grab your exclusive Ignitia gear and wear the fest vibe.
          </p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <CardHeader className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={product.image.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    data-ai-hint={product.image.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                <p className="text-2xl font-bold text-accent">{formatCurrency(product.price)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <ShimmerButton onClick={() => handleAddToCart(product)} className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </ShimmerButton>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </InteractiveGridPattern>
  );
}
