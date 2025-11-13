
'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/data/placeholder-images';
import { Calendar, Users, Music, Award } from 'lucide-react';
import Link from 'next/link';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern';
import NumberTicker from '../ui/number-ticker';

const aboutImage =
  PlaceHolderImages.find((img) => img.id === 'ignitia-logo-mandala') || PlaceHolderImages[0];
  
const stats = [
    {
        icon: Calendar,
        value: 50,
        suffix: '+',
        label: 'Events'
    },
    {
        icon: Music,
        value: 100,
        suffix: '+',
        label: 'Artists'
    },
    {
        icon: Users,
        value: 10000,
        suffix: 'K+',
        label: 'Attendees',
        displayValue: '10' // Special case for 10K
    },
    {
        icon: Award,
        value: 2,
        suffix: '',
        label: 'Days'
    },
];

export function AboutPageContent() {
  return (
    <InteractiveGridPattern>
        <div className="container mx-auto py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center items-center">
                    <Image
                        src={aboutImage.imageUrl}
                        alt="Ignitia Logo"
                        width={500}
                        height={500}
                        className="object-contain"
                        data-ai-hint={aboutImage.imageHint}
                    />
                </div>
                <div className="space-y-6">
                    <h1 className="font-headline text-5xl md:text-6xl tracking-wider uppercase text-accent">About IGNITIA</h1>
                    <h2 className="text-lg font-semibold text-muted-foreground">By PSIT Kanpur</h2>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                        Ignitia 2025, PSIT's highly anticipated annual techno-cultural fest, stands as a true reflection of our commitment to fostering holistic student development. This two-day extravaganza features an exciting mix of events, performances, and competitions, offering students unique opportunities to showcase their talents, leadership skills, and creativity.
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                        {stats.map(stat => (
                            <Card key={stat.label} className="bg-card/50 text-center p-4">
                                <CardContent className="p-0">
                                    <h3 className="font-bold text-4xl text-accent">
                                        <NumberTicker value={stat.displayValue ? Number(stat.displayValue) : stat.value} />
                                        {stat.suffix}
                                    </h3>
                                    <p className="text-muted-foreground">{stat.label}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="pt-4">
                        <ShimmerButton asChild>
                            <Link href="/events">Learn More</Link>
                        </ShimmerButton>
                    </div>
                </div>
            </div>
        </div>
    </InteractiveGridPattern>
  );
}
