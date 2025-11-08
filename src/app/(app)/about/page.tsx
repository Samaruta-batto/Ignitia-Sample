'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Target, Trophy, Milestone, BrainCircuit, Lightbulb, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShimmerButton } from '@/components/ui/shimmer-button';

const aboutImage =
  PlaceHolderImages.find((img) => img.id === 'archive-3') || PlaceHolderImages[0];

const milestones = [
  {
    year: '2021',
    description: 'Ignitia was born, hosting its first virtual festival and bringing together 1,000+ attendees.',
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

const values = [
    {
        icon: Lightbulb,
        title: 'Innovation',
        description: 'Fostering a spirit of creativity and pushing the boundaries of technology and culture.'
    },
    {
        icon: Users,
        title: 'Community',
        description: 'Building a vibrant and inclusive community where everyone can connect, learn, and grow.'
    },
    {
        icon: BrainCircuit,
        title: 'Excellence',
        description: 'Striving for the highest quality in every event, workshop, and performance we organize.'
    }
]

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="font-headline text-5xl tracking-wider uppercase">
          About Ignitia
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Your one-stop platform for event discovery, merchandise, and unforgettable experiences.
        </p>
      </section>

      <section className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={aboutImage.imageUrl}
          alt="Ignitia event"
          fill
          className="object-cover"
          data-ai-hint="event networking"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-headline text-3xl mb-4 text-accent">Our Mission</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            To empower event organizers and delight attendees by providing a seamless, integrated platform that handles everything from discovery and registration to payments and engagement. We believe in the power of connection and aim to make every event a memorable success.
          </p>
        </div>
        <div>
          <h2 className="font-headline text-3xl mb-4 text-accent">Our Legacy</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Founded by a group of passionate festival-goers and tech enthusiasts, Ignitia started as a small project to solve a big problem: the fragmented and often frustrating experience of attending large-scale events. Today, we are proud to be a leading platform in the industry, trusted by organizers and loved by millions of users.
          </p>
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="font-headline text-4xl text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
                <Card key={value.title} className="bg-card/50 text-center p-6">
                    <div className="flex justify-center mb-4">
                        <div className="bg-accent/10 p-4 rounded-full">
                             <value.icon className="w-10 h-10 text-accent" />
                        </div>
                    </div>
                    <h3 className="font-headline text-2xl mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                </Card>
            ))}
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="font-headline text-4xl text-center mb-12">Our Journey</h2>
        <div className="relative">
           <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2"></div>
           {milestones.map((milestone, index) => (
             <div key={milestone.year} className={`relative mb-12 flex items-center w-full ${index % 2 === 1 ? 'justify-end' : ''}`}>
                <div className="w-1/2 px-8">
                    <div className={index % 2 === 0 ? 'text-right' : 'text-left'}>
                        <h3 className="font-headline text-2xl text-accent">{milestone.year}</h3>
                        <p className="text-muted-foreground mt-2">{milestone.description}</p>
                    </div>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-2 rounded-full border-2 border-accent">
                    <milestone.icon className="w-8 h-8 text-accent" />
                </div>
            </div>
           ))}
        </div>
      </section>
      
      <Separator />

      <section className="text-center bg-card/50 py-16 rounded-lg">
          <h2 className="font-headline text-4xl mb-4">Get Involved!</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Whether you want to attend, sponsor, or volunteer, there's a place for you at Ignitia.
          </p>
          <div className="flex gap-4 justify-center">
              <ShimmerButton asChild className="px-8 py-3 h-11">
                  <Link href="/events">Explore Events <ArrowRight className="ml-2" /></Link>
              </ShimmerButton>
              <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
              </Button>
          </div>
      </section>
    </div>
  );
}
