
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';

const navItems = [
  { href: '/home', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/archive', label: 'Gallery' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/teams', label: 'Teams' },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col text-white font-body">
      <Image
        src="https://storage.googleapis.com/stabl-media/6945533d-c182-411a-a114-1e0500a89d2b_ignitia-hero-bg.png"
        alt="Rock concert background"
        fill
        className="object-cover -z-10"
        data-ai-hint="rock concert illustration"
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <header className="sticky top-0 z-40 w-full">
        <div className="container mx-auto flex h-24 items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold uppercase tracking-wider">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            asChild
            className="bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest rounded-sm px-6"
          >
            <Link href="/events">Register</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow flex items-center">
        <div className="container mx-auto text-left">
          <div className="max-w-2xl">
            <h1 style={{ fontFamily: "'Press Start 2P', cursive" }} className="text-7xl md:text-8xl font-bold text-white drop-shadow-lg">
              IGNITIA
            </h1>
            <h2 style={{ fontFamily: "'Press Start 2P', cursive" }} className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg mt-2">
              2K26
            </h2>
            <p className="mt-6 text-xl md:text-2xl text-white/90 drop-shadow-md">
              Igniting Passion, Inspiring Excellence
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
