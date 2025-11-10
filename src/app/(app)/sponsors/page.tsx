
import Image from 'next/image';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { sponsors } from '@/lib/placeholder-data';
import { Separator } from '@/components/ui/separator';
import type { Sponsor } from '@/lib/types';
import { cn } from '@/lib/utils';
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern';

export default function SponsorsPage() {
  const platinumSponsors = sponsors.filter(s => s.tier === 'Platinum');
  const goldSponsors = sponsors.filter(s => s.tier === 'Gold');
  const silverSponsors = sponsors.filter(s => s.tier === 'Silver');
  const otherSponsors = sponsors.filter(s => s.tier === 'Partner');

  const SponsorCard = ({ sponsor, className }: { sponsor: Sponsor, className?: string }) => (
    <div className={cn("flex justify-center p-6 bg-card/50 rounded-lg aspect-video items-center transition-all duration-300 hover:bg-card/80", className)}>
        <Image
            src={sponsor.logo.imageUrl}
            alt={`${sponsor.name} logo`}
            width={150}
            height={75}
            className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            data-ai-hint={sponsor.logo.imageHint}
        />
    </div>
  );

  return (
    <InteractiveGridPattern>
        <div className="space-y-16">
        <section className="text-center">
            <h1 className="font-headline text-5xl tracking-wider uppercase">Our Sponsors</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            The driving force behind our fest. We are incredibly grateful for their support.
            </p>
        </section>

        <section>
            <h2 className="font-headline text-4xl mb-8 text-center uppercase tracking-wider" style={{ color: '#E5E4E2', textShadow: '0 0 15px #E5E4E2' }}>Platinum Sponsors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platinumSponsors.map((sponsor) => (
                <Card key={sponsor.id} className="bg-card/80 border-slate-400/50 border-2 shadow-lg shadow-slate-400/20">
                <div className="md:flex items-center">
                    <div className="md:w-1/3 p-6 flex justify-center">
                    <Image
                        src={sponsor.logo.imageUrl}
                        alt={`${sponsor.name} logo`}
                        width={250}
                        height={125}
                        className="object-contain"
                        data-ai-hint={sponsor.logo.imageHint}
                    />
                    </div>
                    <div className="md:w-2/3 p-6 border-t md:border-t-0 md:border-l border-border">
                    <h3 className="font-bold text-2xl mb-2">{sponsor.name}</h3>
                    <p className="text-muted-foreground">As a platinum sponsor, {sponsor.name} plays a pivotal role in making Ignitia a grand success. Their contribution helps us elevate the experience for every participant.</p>
                    </div>
                </div>
                </Card>
            ))}
            </div>
        </section>
        
        <Separator />

        <section>
            <h2 className="font-headline text-3xl mb-8 text-center uppercase tracking-wider" style={{ color: '#FFD700', textShadow: '0 0 10px #FFD700' }}>Gold Sponsors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {goldSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} className="border-yellow-400/30 border" />
            ))}
            </div>
        </section>

        <Separator />

        <section>
            <h2 className="font-headline text-3xl mb-8 text-center uppercase tracking-wider" style={{ color: '#C0C0C0', textShadow: '0 0 10px #C0C0C0' }}>Silver Sponsors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {silverSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} className="border-gray-500/30 border"/>
            ))}
            </div>
        </section>

        {otherSponsors.length > 0 && (
            <>
            <Separator />
            <section>
                <h2 className="font-headline text-2xl mb-8 text-center uppercase tracking-wider text-muted-foreground">Our Valued Partners</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center">
                {otherSponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
                </div>
            </section>
            </>
        )}
        </div>
    </InteractiveGridPattern>
  );
}
