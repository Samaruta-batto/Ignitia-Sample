
'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern';

const coreTeam = [
  {
    name: 'Alex Johnson',
    role: 'Fest Coordinator',
    avatar: 'https://picsum.photos/seed/core1/200/200',
    bio: 'The mastermind behind Ignitia, ensuring every detail is perfect.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Maria Garcia',
    role: 'Head of Events',
    avatar: 'https://picsum.photos/seed/core2/200/200',
    bio: 'Curating an unforgettable lineup of tech and cultural events.',
     social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Sam Lee',
    role: 'Sponsorship Lead',
    avatar: 'https://picsum.photos/seed/core3/200/200',
    bio: 'Building bridges with our amazing partners and sponsors.',
     social: {
      linkedin: '#',
      twitter: '#',
    },
  },
   {
    name: 'Priya Singh',
    role: 'Marketing Head',
    avatar: 'https://picsum.photos/seed/core4/200/200',
    bio: 'Spreading the word and creating the buzz for Ignitia.',
     social: {
      linkedin: '#',
      twitter: '#',
    },
  },
];

const devTeam = [
  {
    name: 'Chris Patel',
    role: 'Lead Developer',
    avatar: 'https://picsum.photos/seed/dev1/200/200',
    bio: 'Architecting the digital backbone of the Ignitia platform.',
    social: {
      github: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Jordan Davis',
    role: 'Frontend Developer',
    avatar: 'https://picsum.photos/seed/dev2/200/200',
    bio: 'Crafting the user experience with React and Tailwind CSS.',
    social: {
      github: '#',
      linkedin: '#',
    },
  },
];

export default function TeamsPage() {
  return (
    <InteractiveGridPattern>
        <div className="space-y-16">
        <section className="text-center">
            <h1 className="font-headline text-5xl tracking-wider uppercase">Meet the Team</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            The passionate individuals working behind the scenes to make Ignitia 2026 a reality.
            </p>
        </section>

        <section>
            <h2 className="font-headline text-4xl text-center mb-10 uppercase tracking-wider text-accent">Core Organizers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreTeam.map((member) => (
                <Card key={member.name} className="text-center overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative h-40 bg-gradient-to-r from-primary to-accent">
                    <Image src={member.avatar} alt={member.name} width={120} height={120} className="rounded-full border-4 border-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[-50%] object-cover mx-auto transition-transform duration-300 group-hover:scale-110" data-ai-hint="person portrait"/>
                </div>
                <CardHeader className="pt-20">
                    <CardTitle className="font-bold text-xl">{member.name}</CardTitle>
                    <p className="text-accent font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground min-h-[40px]">{member.bio}</p>
                    <div className="flex justify-center gap-4 mt-4">
                    <Button variant="ghost" size="icon" asChild><a href={member.social.linkedin}><Linkedin className="h-5 w-5"/></a></Button>
                    <Button variant="ghost" size="icon" asChild><a href={member.social.twitter}><Twitter className="h-5 w-5"/></a></Button>
                    </div>
                </CardContent>
                </Card>
            ))}
            </div>
        </section>

        <section>
            <h2 className="font-headline text-4xl text-center mb-10 uppercase tracking-wider text-accent">Development Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {devTeam.map((member) => (
                <Card key={member.name} className="text-center overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative h-40 bg-gradient-to-r from-primary to-accent">
                    <Image src={member.avatar} alt={member.name} width={120} height={120} className="rounded-full border-4 border-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[-50%] object-cover mx-auto transition-transform duration-300 group-hover:scale-110" data-ai-hint="person portrait"/>
                </div>
                <CardHeader className="pt-20">
                    <CardTitle className="font-bold text-xl">{member.name}</CardTitle>
                    <p className="text-accent font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground min-h-[40px]">{member.bio}</p>
                    <div className="flex justify-center gap-4 mt-4">
                    <Button variant="ghost" size="icon" asChild><a href={member.social.github}><Github className="h-5 w-5"/></a></Button>
                    <Button variant="ghost" size="icon" asChild><a href={member.social.linkedin}><Linkedin className="h-5 w-5"/></a></Button>
                    </div>
                </CardContent>
                </Card>
            ))}
            </div>
        </section>
        </div>
    </InteractiveGridPattern>
  );
}
