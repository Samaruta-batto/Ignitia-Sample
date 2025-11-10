
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { products } from '@/lib/placeholder-data';
import { ArrowRight, Ticket, Users, Award, Youtube, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatCurrency } from '@/lib/utils';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import NumberTicker from '@/components/ui/number-ticker';
import { PastGuests } from '@/components/home/past-guests';
import { LightRays } from '@/components/ui/light-rays';


export default function HomePage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'techno-background')!;
  const featuredProducts = products.slice(0, 3);
  const aboutIgnitiaImage = PlaceHolderImages.find(p => p.id === 'about-ignitia')!;
  const aboutPsitImage = PlaceHolderImages.find(p => p.id === 'about-psit')!;
  const neetiMohanPoster = PlaceHolderImages.find(p => p.id === 'neeti-mohan-poster')!;

  return (
    <LightRays>
      <div className="space-y-24 -mt-8 -mx-8">
         <section className="relative h-[70vh]">
          <Image
            src={heroImage.imageUrl}
            alt="Hero background"
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground p-4">
            <h1 className="font-headline text-6xl md:text-8xl uppercase tracking-wider text-shadow-lg">
              IGNITIA 2k26
            </h1>
             <p className="font-semibold text-accent text-xl md:text-2xl mt-2">Where Technology Meets Culture</p>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
              April 28-29, 2026 | PSIT Kanpur
            </p>
            <div className="mt-8 flex gap-4">
              <ShimmerButton className="px-8 py-3">
                <Link href="/events" className="flex items-center gap-2">Register Now <ArrowRight /></Link>
              </ShimmerButton>
              <ShimmerButton asChild className="px-8 py-3 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground">
                <Link href="/events">Explore Events <Ticket className="ml-2"/></Link>
              </ShimmerButton>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
              <ShimmerButton size="icon" asChild className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground"><a href="#"><Youtube className="text-white"/></a></ShimmerButton>
              <ShimmerButton size="icon" asChild className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground"><a href="#"><Instagram className="text-white"/></a></ShimmerButton>
              <ShimmerButton size="icon" asChild className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground"><a href="#"><Facebook className="text-white"/></a></ShimmerButton>
              <ShimmerButton size="icon" asChild className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground"><a href="#"><Linkedin className="text-white"/></a></ShimmerButton>
              <ShimmerButton size="icon" asChild className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground"><a href="#"><Twitter className="text-white"/></a></ShimmerButton>
          </div>
        </section>

        <section className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="border-r border-border last:border-r-0">
                  <Ticket className="h-12 w-12 text-accent mx-auto mb-4"/>
                  <p className="text-4xl font-bold"><NumberTicker value={50} />+</p>
                  <p className="text-muted-foreground">Events</p>
              </div>
              <div className="border-r border-border last:border-r-0">
                  <Users className="h-12 w-12 text-accent mx-auto mb-4"/>
                  <p className="text-4xl font-bold"><NumberTicker value={100} />+</p>
                  <p className="text-muted-foreground">Teams</p>
              </div>
              <div>
                  <Award className="h-12 w-12 text-accent mx-auto mb-4"/>
                  <p className="text-4xl font-bold"><NumberTicker value={20} />+</p>
                  <p className="text-muted-foreground">Sponsors</p>
              </div>
          </div>
        </section>

        <section className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                  <h2 className="font-headline text-5xl uppercase tracking-wider text-accent">About Ignitia</h2>
                  <p className="text-lg text-muted-foreground">
                  IGNITIA is the annual techno-cultural fest of PSIT, a vibrant convergence of innovation, creativity, and culture. It's a platform for students to showcase their talents, compete in exciting events, and connect with peers and industry leaders. From coding marathons to electrifying concerts, Ignitia is an experience you won't forget.
                  </p>
                  <ShimmerButton asChild className="px-6 py-2 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground">
                      <Link href="/about">Learn More <ArrowRight className="ml-2" /></Link>
                  </ShimmerButton>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl">
                   <Image
                      src={aboutIgnitiaImage.imageUrl}
                      alt="About Ignitia"
                      fill
                      className="object-cover"
                      data-ai-hint={aboutIgnitiaImage.imageHint}
                  />
              </div>
          </div>
        </section>
        
        <section className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl md:order-2">
                   <Image
                      src={aboutPsitImage.imageUrl}
                      alt="About PSIT"
                      fill
                      className="object-cover"
                      data-ai-hint={aboutPsitImage.imageHint}
                  />
              </div>
              <div className="space-y-4 md:order-1">
                  <h2 className="font-headline text-5xl uppercase tracking-wider text-accent">About PSIT</h2>
                  <p className="text-lg text-muted-foreground">
                  Pranveer Singh Institute of Technology (PSIT) is a leading institution in Kanpur, renowned for its commitment to academic excellence and holistic development. With state-of-the-art infrastructure and a world-class faculty, PSIT provides an environment where students can thrive and achieve their full potential.
                  </p>
                   <ShimmerButton asChild className="px-6 py-2 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground">
                      <a href="https://psit.ac.in/" target="_blank" rel="noopener noreferrer">Visit PSIT <ArrowRight className="ml-2" /></a>
                  </ShimmerButton>
              </div>
          </div>
        </section>

        <section className="container mx-auto">
          <div className="text-center mb-12">
              <h2 className="font-headline text-5xl uppercase tracking-wider text-accent">Celebrity Revealed!</h2>
              <p className="mt-2 text-lg text-muted-foreground">Get ready for an electrifying performance by the sensational Neeti Mohan</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                   <Image
                      src={neetiMohanPoster.imageUrl}
                      alt="Neeti Mohan Ignitia Poster"
                      width={600}
                      height={750}
                      className="object-cover"
                      data-ai-hint={neetiMohanPoster.imageHint}
                  />
              </div>
              <div className="space-y-6">
                   <h3 className="font-headline text-6xl tracking-wider uppercase" style={{fontFamily: "'Times New Roman', Times, serif"}}>Neeti Mohan</h3>
                  <p className="text-lg text-muted-foreground">
                      We are thrilled to announce a spectacular performance by Neeti Mohan that will light up the stage at IGNITIA 2K25. Get ready for an unforgettable experience with one of India's most celebrated artists.
                  </p>
                  <div className="flex gap-8">
                      <div className="text-center">
                          <p className="text-4xl font-bold text-accent"><NumberTicker value={100} />+</p>
                          <p className="text-muted-foreground">Shows</p>
                      </div>
                      <div className="text-center">
                          <p className="text-4xl font-bold text-accent"><NumberTicker value={10} />M+</p>
                          <p className="text-muted-foreground">Followers</p>
                      </div>
                  </div>
                  <ShimmerButton asChild className="px-6 py-2">
                      <Link href="#">See More</Link>
                  </ShimmerButton>
              </div>
          </div>
        </section>

        <PastGuests />


         <section className="container mx-auto">
          <div className="text-center mb-12">
              <h2 className="font-headline text-5xl uppercase tracking-wider">Official Merchandise</h2>
              <p className="mt-2 text-lg text-muted-foreground">Get your hands on exclusive IGNITIA merchandise</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                  <Card key={product.id} className="w-full overflow-hidden group">
                      <CardHeader className="p-0">
                          <div className="relative aspect-square">
                              <Image
                                  src={product.image.imageUrl}
                                  alt={product.name}
                                  fill
                                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                                  data-ai-hint={product.image.imageHint}
                              />
                          </div>
                      </CardHeader>
                      <CardContent className="p-6 text-center space-y-2">
                          <h3 className="font-headline text-2xl text-accent">{product.name}</h3>
                          <p className="text-4xl font-bold text-white">{formatCurrency(product.price)}</p>
                      </CardContent>
                      <CardFooter className="px-6 pb-6">
                          <ShimmerButton asChild className="w-full">
                              <Link href="/merchandise" className='flex items-center gap-2'>View Product</Link>
                          </ShimmerButton>
                      </CardFooter>
                  </Card>
              ))}
            </div>
            <div className="text-center mt-12">
                <ShimmerButton asChild size="lg" className="px-6 py-2">
                    <Link href="/merchandise">Shop All Merch <ArrowRight/></Link>
                </ShimmerButton>
            </div>
         </section>

      </div>
    </LightRays>
  );
}
