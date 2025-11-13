
'use client';
import * as React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/data/placeholder-images';
import { ArrowLeft, ArrowRight, Video } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ShimmerButton } from '../ui/shimmer-button';

const pastCelebrities = [
  {
      name: 'Kailash Kher',
      title: 'Playback Singer',
      image: PlaceHolderImages.find(p => p.id === 'celebrity-kailash')!
  },
  {
      name: 'Anupam Kher',
      title: 'Actor & Author',
      image: PlaceHolderImages.find(p => p.id === 'celebrity-anupam')!
  },
  {
      name: 'Bhumi Pednekar',
      title: 'Actress',
      image: PlaceHolderImages.find(p => p.id === 'celebrity-bhumi')!
  }
];

export function PastGuests() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);


  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on('select', onSelect);
    return () => {
        api.off('select', onSelect);
    }
  }, [api]);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api]);

  return (
    <section className="w-full py-12">
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h2 className="font-headline text-5xl uppercase tracking-wider">Our Past Guests</h2>
                <p className="mt-2 text-lg text-muted-foreground">A look back at the stars who have graced the Ignitia stage.</p>
            </div>
            <div className="relative">
                <Carousel 
                    setApi={setApi} 
                    className="w-full"
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                >
                <CarouselContent>
                    {pastCelebrities.map((celebrity) => (
                    <CarouselItem key={celebrity.name} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                        <Card className="overflow-hidden group text-center border-accent/20 bg-card/50">
                            <div className="relative aspect-[9/12] overflow-hidden">
                                <Image
                                    src={celebrity.image.imageUrl}
                                    alt={celebrity.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={celebrity.image.imageHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-6 text-left">
                                     <h3 className="text-2xl font-bold text-white">{celebrity.name}</h3>
                                     <p className="text-md text-accent font-semibold flex items-center gap-2">
                                        {celebrity.title}
                                    </p>
                                </div>
                            </div>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                </Carousel>
                <div className="absolute top-1/2 -translate-y-1/2 -left-16 flex flex-col gap-2">
                     <ShimmerButton size="icon" variant="outline" className="rounded-full h-12 w-12 bg-card/50" onClick={scrollPrev} disabled={!canScrollPrev}>
                        <ArrowLeft />
                    </ShimmerButton>
                </div>
                 <div className="absolute top-1/2 -translate-y-1/2 -right-16 flex flex-col gap-2">
                    <ShimmerButton size="icon" variant="outline" className="rounded-full h-12 w-12 bg-card/50" onClick={scrollNext} disabled={!canScrollNext}>
                        <ArrowRight />
                    </ShimmerButton>
                     <ShimmerButton size="icon" variant="outline" className="rounded-full h-12 w-12 bg-card/50">
                        <Video />
                    </ShimmerButton>
                </div>
            </div>
        </div>
    </section>
  );
}
