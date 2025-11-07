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
import { events } from '@/lib/placeholder-data';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Sponsors } from '@/components/sponsors';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {events.map((event) => (
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
      <Sponsors />
    </div>
  );
}
