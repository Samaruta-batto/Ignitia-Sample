
'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern';
import { devTeam } from '@/lib/data/placeholder-data';

export function TeamsPageContent() {
  return (
    <div className="pt-24">
      <InteractiveGridPattern>
          <div className="space-y-16">
        <section className="text-center">
            <h1 className="font-headline text-5xl tracking-wider uppercase">Meet the Team</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            The passionate individuals working behind the scenes to make Ignitia 2026 a reality.
            </p>
        </section>

        <section>
            <h2 className="font-headline text-4xl text-center mb-10 uppercase tracking-wider text-accent">Development Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {devTeam.map((member) => (
                <Card key={member.name} className="text-center overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative h-40 bg-gradient-to-r from-primary to-accent">
                    <Image src={member.avatar.imageUrl} alt={member.name} width={120} height={120} className="rounded-full border-4 border-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[-50%] object-cover mx-auto transition-transform duration-300 group-hover:scale-110" data-ai-hint={member.avatar.imageHint}/>
                </div>
                <CardHeader className="pt-20">
                    <CardTitle className="font-bold text-xl">{member.name}</CardTitle>
                    <p className="text-accent font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground min-h-[40px]">{member.bio}</p>
                    <div className="flex justify-center gap-4 mt-4">
                    {member.social.github && <Button variant="ghost" size="icon" asChild><a href={member.social.github}><Github className="h-5 w-5"/></a></Button>}
                    {member.social.linkedin && <Button variant="ghost" size="icon" asChild><a href={member.social.linkedin}><Linkedin className="h-5 w-5"/></a></Button>}
                    </div>
                </CardContent>
                </Card>
            ))}
            </div>
        </section>
        </div>
    </InteractiveGridPattern>
    </div>
  );
}
