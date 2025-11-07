import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { sponsors } from '@/lib/placeholder-data';
import { Separator } from '@/components/ui/separator';

export default function SponsorsPage() {
  const platinumSponsors = sponsors.slice(0, 1);
  const otherSponsors = sponsors.slice(1);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="font-headline text-5xl tracking-wider uppercase">Our Sponsors</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          The driving force behind our fest. We are incredibly grateful for their support.
        </p>
      </section>

      <section>
        <h2 className="font-headline text-3xl mb-6 text-center uppercase tracking-wider text-accent">Platinum Sponsors</h2>
        <div className="grid grid-cols-1 gap-8">
          {platinumSponsors.map((sponsor) => (
            <Card key={sponsor.id} className="bg-card/80 border-accent/50 border-2 shadow-lg shadow-accent/10">
              <div className="md:flex items-center">
                <div className="md:w-1/3 p-6 flex justify-center">
                   <Image
                    src={sponsor.logo.imageUrl}
                    alt={`${sponsor.name} logo`}
                    width={250}
                    height={125}
                    className="object-contain filter grayscale-0"
                     data-ai-hint={sponsor.logo.imageHint}
                  />
                </div>
                <div className="md:w-2/3 p-6 border-t md:border-t-0 md:border-l border-border">
                  <h3 className="font-bold text-2xl mb-2">{sponsor.name}</h3>
                  <p className="text-muted-foreground">As a platinum sponsor, {sponsor.name} plays a pivotal role in making Ignitia a grand success. Their contribution helps us elevate the experience for every participant, bringing bigger events and better opportunities.</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="font-headline text-3xl mb-8 text-center uppercase tracking-wider">Our Valued Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center">
          {otherSponsors.map((sponsor) => (
            <div key={sponsor.id} className="flex justify-center p-6 bg-card/50 rounded-lg aspect-video items-center">
              <Image
                src={sponsor.logo.imageUrl}
                alt={`${sponsor.name} logo`}
                width={150}
                height={75}
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                data-ai-hint={sponsor.logo.imageHint}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
