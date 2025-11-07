import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { events, products } from '@/lib/placeholder-data';
import { Calendar, MapPin, ArrowRight, ShoppingCart } from 'lucide-react';
import { Sponsors } from '@/components/sponsors';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export default function HomePage() {
  const featuredEvents = events.slice(0, 2);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16">
      <section>
        <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-4xl uppercase tracking-wider">
            Trending Events
            </h2>
             <Button variant="outline" asChild>
                <Link href="/events">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {featuredEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden flex flex-col hover:shadow-accent/20 hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="p-0 relative h-60">
                <Image
                  src={event.image.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                  data-ai-hint={event.image.imageHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <h3 className="font-headline text-2xl mb-2 uppercase tracking-wide">
                  {event.title}
                </h3>
                <div className="flex items-center text-muted-foreground text-sm mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-muted-foreground text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <CardDescription>{event.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

       <section>
        <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-4xl uppercase tracking-wider">
            Featured Merch
            </h2>
             <Button variant="outline" asChild>
                <Link href="/merchandise">Shop All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
      </section>

      <Sponsors />
    </div>
  );
}
