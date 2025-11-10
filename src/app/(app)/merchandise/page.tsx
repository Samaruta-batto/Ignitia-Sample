
'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/placeholder-data';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { useToast } from '@/hooks/use-toast';

export default function MerchandisePage() {
  const { toast } = useToast();

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to Cart!",
      description: `${productName} has been added to your cart.`,
    });
  };

  return (
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
              <ShimmerButton onClick={() => handleAddToCart(product.name)} className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </ShimmerButton>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
