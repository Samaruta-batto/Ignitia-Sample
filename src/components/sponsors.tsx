import Image from 'next/image';
import { sponsors } from '@/lib/placeholder-data';

export function Sponsors() {
  return (
    <section className="w-full py-12 md:py-16 bg-background/50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-3xl md:text-4xl text-center uppercase tracking-wider mb-4">
          Our Valued Sponsors
        </h2>
        <p className="max-w-2xl mx-auto text-center text-muted-foreground mb-8">
          Powering unforgettable experiences together.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center">
          {sponsors.map((sponsor) => (
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
      </div>
    </section>
  );
}
