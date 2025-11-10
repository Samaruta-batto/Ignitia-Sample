
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
import { Button } from '@/components/ui/button';
import { ArrowRight, Ticket, Users, Award, Youtube, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatCurrency } from '@/lib/utils';
import { ShimmerButton } from '@/components/ui/shimmer-button';

const celebrityGuests = [
    {
        name: 'Anupam Kher',
        title: 'Actor & Author',
        image: PlaceHolderImages.find(p => p.id === 'celebrity-anupam')!
    },
    {
        name: 'Kailash Kher',
        title: 'Playback Singer',
        image: PlaceHolderImages.find(p => p.id === 'celebrity-kailash')!
    },
    {
        name: 'Bhumi Pednekar',
        title: 'Actress',
        image: PlaceHolderImages.find(p => p.id === 'celebrity-bhumi')!
    }
]

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'techno-background')!;
  const featuredProducts = products.slice(0, 3);
  const aboutIgnitiaImage = PlaceHolderImages.find(p => p.id === 'about-ignitia')!;
  const aboutPsitImage = PlaceHolderImages.find(p => p.id === 'about-psit')!;

  return (
    <div className="space-y-24">
      <section className="relative h-[70vh] -mt-16 -mx-16">
        <Image
          src={heroImage.imageUrl}
          alt="Hero background"
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute z-10 inset-0 flex flex-col items-center justify-center text-center text-white font-bold p-4">
          <h1 className="font-headline text-6xl md:text-8xl uppercase tracking-wider text-shadow-lg">
            IGNITIA 2k26
          </h1>
          <p className="font-semibold text-accent text-xl md:text-2xl mt-2">Where Technology Meets Culture</p>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
            April 28-29, 2026 | PSIT Kanpur
          </p>
          <div className="mt-8 flex gap-4">
            <ShimmerButton>
              <Link href="/events" className="flex items-center gap-2">Register Now <ArrowRight /></Link>
            </ShimmerButton>
            <Button variant="ghost" asChild>
              <Link href="/events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="font-headline text-5xl uppercase tracking-wider">Socials</h2>
            <p className="mt-2 text-lg text-muted-foreground">Stay connected with us</p>
        </div>
        <div className="flex justify-center gap-4">
            <Button size="icon" variant="ghost" asChild><a href="#"><Youtube /></a></Button>
            <Button size="icon" variant="ghost" asChild><a href="#"><Instagram /></a></Button>
            <Button size="icon" variant="ghost" asChild><a href="#"><Facebook /></a></Button>
            <Button size="icon" variant="ghost" asChild><a href="#"><Linkedin /></a></Button>
            <Button size="icon" variant="ghost" asChild><a href="#"><Twitter /></a></Button>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="border-r border-border last:border-r-0">
                <Ticket className="h-12 w-12 text-accent mx-auto mb-4"/>
                <p className="text-4xl font-bold">50+</p>
                <p className="text-muted-foreground">Events</p>
            </div>
            <div className="border-r border-border last:border-r-0">
                <Users className="h-12 w-12 text-accent mx-auto mb-4"/>
                <p className="text-4xl font-bold">100+</p>
                <p className="text-muted-foreground">Teams</p>
            </div>
            <div>
                <Award className="h-12 w-12 text-accent mx-auto mb-4"/>
                <p className="text-4xl font-bold">20+</p>
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
                <ShimmerButton asChild>
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
                 <ShimmerButton asChild>
                    <a href="https://psit.ac.in/" target="_blank" rel="noopener noreferrer">Visit PSIT <ArrowRight className="ml-2" /></a>
                </ShimmerButton>
            </div>
        </div>
      </section>

       <section className="w-full py-12">
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h2 className="font-headline text-5xl uppercase tracking-wider">Celebrity Guests</h2>
                <p className="mt-2 text-lg text-muted-foreground">Stars who have graced the Ignitia stage.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {celebrityGuests.map((celebrity) => (
                    <Card key={celebrity.name} className="overflow-hidden group text-center">
                        <div className="relative aspect-[4/5] overflow-hidden">
                             <Image
                                src={celebrity.image.imageUrl}
                                alt={celebrity.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={celebrity.image.imageHint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6">
                                <h3 className="text-3xl font-bold text-white">{celebrity.name}</h3>
                                <p className="text-lg text-accent font-semibold">{celebrity.title}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
       </section>

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
                            <Link href="/merchandise">View Product</Link>
                        </ShimmerButton>
                    </CardFooter>
                </Card>
            ))}
          </div>
          <div className="text-center mt-12">
              <ShimmerButton asChild size="lg">
                  <Link href="/merchandise">Shop All Merch</Link>
              </ShimmerButton>
          </div>
       </section>

    </div>
  );
}
