
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { ArrowRight, Ticket } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/icons/logo';
import { PlaceHolderImages } from '@/lib/data/placeholder-images';

const navItems = [
  { href: '/home', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/merchandise', label: 'Merch' },
  { href: '/contact', label: 'Contact' },
];

export function LandingPageContent() {
  const landingImage = PlaceHolderImages.find(p => p.id === 'landing-background')!;
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <section className="relative h-screen w-full flex flex-col items-center justify-center text-center text-white p-4">
          <div className="absolute inset-0 -z-10">
            <Image
              src={landingImage.imageUrl}
              alt={landingImage.imageHint}
              fill
              priority
              className="object-cover"
              data-ai-hint={landingImage.imageHint}
            />
          </div>

          <div className="absolute top-0 left-0 right-0 z-20">
            <header className="container mx-auto flex h-20 items-center justify-between">
              <Link href="/">
                <Logo />
              </Link>
              <nav className="hidden md:flex items-center gap-2">
                  {navItems.map((item) => (
                  <ShimmerButton
                      key={item.label}
                      asChild
                      className="px-4 py-2 text-sm bg-transparent text-white"
                  >
                      <Link href={item.href}>{item.label}</Link>
                  </ShimmerButton>
                  ))}
              </nav>
              <ShimmerButton asChild className="px-5 py-2.5">
                  <Link href="/signup">
                      Register
                  </Link>
              </ShimmerButton>
            </header>
          </div>

          <div className="absolute inset-0 -z-10">
            <Image
              src={landingImage.imageUrl}
              alt={landingImage.imageHint}
              fill
              priority
              className="object-cover"
              data-ai-hint={landingImage.imageHint}
            />
          </div>

          <div className="z-10 mt-[-4rem]">
            <h1 className="font-headline text-6xl md:text-8xl uppercase tracking-wider text-shadow-lg drop-shadow-2xl">
              IGNITIA 2K26
            </h1>
            <p className="font-semibold text-accent text-xl md:text-2xl mt-2 drop-shadow-2xl">
              Where Technology Meets Culture
            </p>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80 drop-shadow-2xl">
              April 28-29, 2026 | PSIT Kanpur
            </p>
            <div className="mt-8 flex justify-center gap-4 pointer-events-auto">
              <ShimmerButton className="px-8 py-3">
                <Link href="/events" className="flex items-center gap-2">
                  Register Now <ArrowRight />
                </Link>
              </ShimmerButton>
              <ShimmerButton
                asChild
                className="px-8 py-3 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground"
              >
                <Link href="/events">
                  Explore Events <Ticket className="ml-2" />
                </Link>
              </ShimmerButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
 
