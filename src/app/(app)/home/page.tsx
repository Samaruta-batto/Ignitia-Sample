import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/placeholder-data';
import { ArrowRight, Ticket, Users, Award, Youtube, Instagram, Facebook, Linkedin, Twitter, Star } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatCurrency } from '@/lib/utils';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import NumberTicker from '@/components/ui/number-ticker';


export default function HomePage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'techno-background')!;
  const featuredProduct = products[0];
  const featuredProductImage = PlaceHolderImages.find(p => p.id === 'merch-tshirt-showcase')!;
  const aboutIgnitiaImage = PlaceHolderImages.find(p => p.id === 'about-ignitia')!;
  const aboutPsitImage = PlaceHolderImages.find(p => p.id === 'about-psit')!;

  const celebrities = [
    {
        name: 'Arijit Singh',
        title: 'Playback Singer',
        image: PlaceHolderImages.find(p => p.id === 'celebrity-1')!
    },
    {
        name: 'Ankit Tiwari',
        title: 'Music Composer',
        image: PlaceHolderImages.find(p => p.id === 'celebrity-2')!
    },
    {
        name: 'Sonu Nigam',
        title: 'Playback Singer',
        image: PlaceHolderImages.find(p => p.id === 'celebrity-3')!
    }
  ];

  return (
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
            <ShimmerButton className="px-8 py-3 h-11">
              <Link href="/events" className="flex items-center gap-2">Register Now <ArrowRight /></Link>
            </ShimmerButton>
            <ShimmerButton asChild className="px-8 py-3 h-11 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground">
              <Link href="/events">Explore Events <Ticket className="ml-2"/></Link>
            </ShimmerButton>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
            <Button variant="ghost" size="icon" asChild><a href="#"><Youtube className="text-white"/></a></Button>
            <Button variant="ghost" size="icon" asChild><a href="#"><Instagram className="text-white"/></a></Button>
            <Button variant="ghost" size="icon" asChild><a href="#"><Facebook className="text-white"/></a></Button>
            <Button variant="ghost" size="icon" asChild><a href="#"><Linkedin className="text-white"/></a></Button>
            <Button variant="ghost" size="icon" asChild><a href="#"><Twitter className="text-white"/></a></Button>
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
                <Button asChild variant="outline">
                    <Link href="/about">Learn More <ArrowRight className="ml-2" /></Link>
                </Button>
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
                 <Button asChild variant="outline">
                    <a href="https://psit.ac.in/" target="_blank" rel="noopener noreferrer">Visit PSIT <ArrowRight className="ml-2" /></a>
                </Button>
            </div>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="font-headline text-5xl uppercase tracking-wider">Celebrity Guests</h2>
            <p className="mt-2 text-lg text-muted-foreground">Meet the stars of IGNITIA 2k26!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {celebrities.map((celebrity) => (
                <Card key={celebrity.name} className="overflow-hidden group text-center border-accent/20">
                     <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                            src={celebrity.image.imageUrl}
                            alt={celebrity.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={celebrity.image.imageHint}
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>
                    <CardHeader className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                        <CardTitle className="text-2xl text-white">{celebrity.name}</CardTitle>
                        <CardDescription className="text-accent flex items-center justify-center gap-2">
                            <Star className="w-4 h-4" /> {celebrity.title}
                        </CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
      </section>


       <section className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="font-headline text-5xl uppercase tracking-wider">Official Merchandise</h2>
            <p className="mt-2 text-lg text-muted-foreground">Get your hands on exclusive IGNITIA merchandise</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-headline text-4xl text-accent" style={{letterSpacing: '0.1em', textShadow: '0 0 5px hsl(var(--accent) / 0.5)'}}>LIMITED EDITION T-SHIRT</h3>
            <p className="text-muted-foreground text-lg">Be a part of IGNITIA 2K26 with our exclusive merchandise. Each piece is crafted with premium quality materials and features unique designs inspired by our theme.</p>
            <p className="text-4xl font-bold text-accent">₹350</p>
            <ShimmerButton asChild>
              <Link href="#" className='flex items-center gap-2'>Buy Now <ArrowRight /></Link>
            </ShimmerButton>
          </div>
          <div className="flex items-center justify-center">
             <Card className="border-2 border-accent/50 p-2 bg-transparent overflow-hidden">
                <div className="relative aspect-square w-[400px] h-[400px]">
                    <Image
                        src={featuredProductImage.imageUrl}
                        alt={featuredProduct.name}
                        fill
                        className="object-contain"
                        data-ai-hint={featuredProductImage.imageHint}
                    />
                </div>
             </Card>
          </div>
        </div>
       </section>

    </div>
  );
}

    
