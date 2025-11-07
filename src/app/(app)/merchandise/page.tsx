import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/placeholder-data';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';

export default function MerchandisePage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden flex flex-col group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
        >
          <CardHeader className="p-0 relative aspect-square">
            <Image
              src={product.image.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={product.image.imageHint}
            />
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="font-bold text-accent text-xl">
              {formatCurrency(product.price)}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full bg-primary hover:bg-primary/80">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
