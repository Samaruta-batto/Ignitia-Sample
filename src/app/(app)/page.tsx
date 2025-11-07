import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Ticket } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShimmerButton } from '@/components/ui/shimmer-button';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'event-1')!;

  return (
    <div className="space-y-20">
      <section className="relative h-[60vh] -mt-8 -mx-8">
        <Image
          src={heroImage.imageUrl}
          alt="Hero background"
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground p-4">
          <h1 className="font-headline text-5xl md:text-7xl uppercase tracking-wider text-shadow-lg">
            Ignitia
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
            Your ultimate gateway to the most exciting college festivals. Discover events, grab merchandise, and connect with the community.
          </p>
          <div className="mt-8 flex gap-4">
            <ShimmerButton className="px-8 h-11 flex items-center">
              <Link href="/home" className="flex items-center gap-2">Explore Now <ArrowRight /></Link>
            </ShimmerButton>
            <ShimmerButton className="px-8 h-11 flex items-center bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground">
              <Link href="/events" className='flex items-center gap-2'>View All Events <Ticket className="ml-2"/></Link>
            </ShimmerButton>
          </div>
        </div>
      </section>

      <section className="container mx-auto">
         <div className="text-center">
            <h2 className="font-headline text-4xl uppercase tracking-wider">What is Ignitia?</h2>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground text-lg">
                Ignitia is a comprehensive platform designed to unify the college festival experience. From discovering the hottest events to managing your digital wallet and buying exclusive merchandise, we've got you covered.
            </p>
         </div>
      </section>

    </div>
  );
}
