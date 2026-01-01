
'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Logo } from './icons/logo';
import { navItems } from '@/lib/data/site-config';

export default function ConcertHero() {
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    // small parallax on mouse move (desktop)
    const handle = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX - innerWidth / 2) / innerWidth;
      const ny = (e.clientY - innerHeight / 2) / innerHeight;
      el.style.transform = `translate3d(${nx * 8}px, ${ny * 6}px, 0)`;
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden">
        <header className="absolute top-0 left-0 right-0 z-50 container mx-auto flex h-21 items-center justify-between">
            <Link href="/">
            <Logo />
            </Link>
            <nav className="hidden md:flex items-center gap-3">
                {navItems.map((item) => (
                <ShimmerButton
                    key={item.label}
                    asChild
                    className="px-6 py-3 text-base bg-transparent text-white hover:bg-accent/10"
                >
                    <Link href={item.href}>{item.label}</Link>
                </ShimmerButton>
                ))}
            </nav>
        </header>

      {/* background image (parallax wrapper) */}
      <div ref={parallaxRef} className="absolute inset-0 z-0 will-change-transform transition-transform duration-300">
        <Image
          src="/images/landingbg.jpg"
          alt="Concert background"
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,2,20,0.55)] via-[rgba(18,6,36,0.35)] to-[rgba(0,0,0,0.6)]" />
      </div>

      {/* animated spotlights */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="spotlight spotlight-1" />
        <div className="spotlight spotlight-2" />
        <div className="spotlight spotlight-3" />
      </div>

      {/* bokeh / floating orbs */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="bokeh b1" />
        <div className="bokeh b2" />
        <div className="bokeh b3" />
        <div className="bokeh b4" />
        <div className="bokeh b5" />
      </div>

      {/* particles */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="particles" />
      </div>

      {/* hero content */}
      <motion.div
        className="relative z-40 flex flex-col items-center justify-center text-center px-6 py-12 max-w-6xl mx-auto h-full"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="mb-2 group cursor-pointer">
          <Image
            src="/images/ignitia2k26.png"
            alt="Ignitia 2K26"
            width={2400}
            height={800}
            className="h-96 md:h-[28rem] lg:h-[32rem] w-auto drop-shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_0_50px_rgba(255,215,0,0.6)] group-hover:brightness-110"
            priority
          />
        </div>

        <div className="mt-12 flex gap-4">
          <ShimmerButton className="px-8 py-3">
            <Link href="/home">
              Explore Now
            </Link>
          </ShimmerButton>
          <ShimmerButton asChild className="px-8 py-3 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground">
            <Link href="/events">Explore Events <Ticket /></Link>
          </ShimmerButton>
        </div>
      </motion.div>
    </section>
  );
}
