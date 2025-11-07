'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Target, Trophy, Milestone } from 'lucide-react';

const aboutImage =
  PlaceHolderImages.find((img) => img.id === 'archive-3') || PlaceHolderImages[0];

const milestones = [
  {
    year: '2021',
    description: 'FestConnect was born, hosting its first virtual festival and bringing together 1,000+ attendees.',
    icon: Milestone,
  },
  {
    year: '2022',
    description: 'Introduced the digital wallet and merchandise marketplace, creating a seamless event experience.',
    icon: Trophy,
  },
  {
    year: '2023',
    description: 'Expanded to hybrid events, partnering with three major city-wide festivals and reaching over 50,000 participants.',
    icon: Trophy,
  },
  {
    year: '2024',
    description: 'Launched the AI-powered chatbot, providing instant support and enhancing user engagement.',
    icon: Target,
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="font-headline text-5xl tracking-wider uppercase">
          About FestConnect
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Your one-stop platform for event discovery, merchandise, and unforgettable experiences.
        </p>
      </section>

      <section className="relative w-full h-80 rounded-lg overflow-hidden">
        <Image
          src={aboutImage.imageUrl}
          alt="FestConnect event"
          fill
          className="object-cover"
          data-ai-hint="event networking"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-headline text-3xl mb-4 text-accent">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            To empower event organizers and delight attendees by providing a seamless, integrated platform that handles everything from discovery and registration to payments and engagement. We believe in the power of connection and aim to make every event a memorable success.
          </p>
        </div>
        <div>
          <h2 className="font-headline text-3xl mb-4 text-accent">Our Legacy</h2>
          <p className="text-lg leading-relaxed">
            Founded by a group of passionate festival-goers and tech enthusiasts, FestConnect started as a small project to solve a big problem: the fragmented and often frustrating experience of attending large-scale events. Today, we are proud to be a leading platform in the industry, trusted by organizers and loved by millions of users.
          </p>
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="font-headline text-4xl text-center mb-10">Our Journey</h2>
        <div className="relative">
           <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
           {milestones.map((milestone, index) => (
             <div key={milestone.year} className="relative mb-12">
                <div className="flex items-center" style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
                    <div className="w-1/2 px-8" style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                        <h3 className="font-headline text-2xl text-accent">{milestone.year}</h3>
                        <p className="text-muted-foreground mt-2">{milestone.description}</p>
                    </div>
                     <div className="w-1/2 flex" style={{ justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-2 rounded-full border-2 border-accent">
                            <milestone.icon className="w-8 h-8 text-accent" />
                        </div>
                    </div>
                </div>
            </div>
           ))}
        </div>
      </section>
    </div>
  );
}
