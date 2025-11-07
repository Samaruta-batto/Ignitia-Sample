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
import { ArrowRight, Ticket, Users, Award, Youtube, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';


export default function HomePage() {
  const featuredEvent = events[0];
  const heroImage = PlaceHolderImages.find(p => p.id === 'event-1')!;

  return (
    <div className="space-y-16 -mt-8 -mx-8">
       <section className="relative h-[70vh]">
        <Image
          src={heroImage.imageUrl}
          alt="Hero background"
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground p-4">
          <h1 className="font-headline text-6xl md:text-8xl uppercase tracking-wider text-shadow-lg">
            IGNITIA '24
          </h1>
           <p className="font-semibold text-accent text-xl md:text-2xl mt-2">Where Technology Meets Culture</p>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
            October 15-17, 2024 | College Campus
          </p>
          <div className="mt-8 flex gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/events">Register Now <ArrowRight className="ml-2"/></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/events">Explore Events <Ticket className="ml-2"/></Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
            <Button variant="ghost" size="icon" asChild><a href="#"><Youtube className="text-white"/></a></Button>
            <Button variant="ghost" size="icon" asChild><a href="#"><Instagram className="text-white"/></a></Button>
            <Button variant="ghost" size="icon" asChild><a href="#"><Facebook className="text-white"/></a></Button>
            <Button variant="ghost" size="icon" asChild><a href="#"><Linkedin className="text-white"/></a></Button>
            <Button variant="ghost" size="icon" asChild><a href="#"><Twitter className="text-white"/></a></Button>
        </div>
      </section>

      <section className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="border-r border-border last:border-r-0">
                <Ticket className="h-12 w-12 text-accent mx-auto mb-4"/>
                <p className="text-4xl font-bold">50+</p>
                <p className="text-muted-foreground">Events</p>
            </div>
            <div className="border-r border-border last:border-r-0">
                <Users className="h-12 w-12 text-accent mx-auto mb-4"/>
                <p className="text-4xl font-bold">100+</p>
                <p className="text-muted-foreground">Teams</p>
            </div>
            <div>
                <Award className="h-12 w-12 text-accent mx-auto mb-4"/>
                <p className="text-4xl font-bold">20+</p>
                <p className="text-muted-foreground">Sponsors</p>
            </div>
        </div>
      </section>

    </div>
  );
}
