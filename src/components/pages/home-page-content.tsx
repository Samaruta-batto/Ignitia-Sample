
'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { products } from '@/lib/data/placeholder-data';
import { ArrowRight, Ticket, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/data/placeholder-images';
import { formatCurrency } from '@/lib/utils';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { PastGuests } from '@/components/home/past-guests';
import NumberTicker from '@/components/ui/number-ticker';
import { siteConfig } from '@/lib/data/site-config';
import { motion } from 'framer-motion';
import { FlameIconOnly } from '@/components/icons/flame-icon';

export function HomePageContent() {
  const featuredProducts = products.slice(0, 3);
  const aboutIgnitiaImage = PlaceHolderImages.find(p => p.id === 'about-ignitia')!;
  const aboutPsitImage = PlaceHolderImages.find(p => p.id === 'about-psit')!;
  const neetiMohanPoster = PlaceHolderImages.find(p => p.id === 'celebrity-neeti-mohan-reveal')!;
  
  // Countdown timer for January 20, 2026
  useEffect(() => {
    const targetDate = new Date('2026-01-20T00:00:00Z').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const timerElement = document.getElementById('countdown-timer');
        if (timerElement) {
          timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
      } else {
        const timerElement = document.getElementById('countdown-timer');
        if (timerElement) {
          timerElement.innerHTML = 'REVEALED!';
        }
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div>
      {/* Hero Section with Multi-Image Background - True Full Screen */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-center text-white overflow-hidden">
        {/* Multi-Image Background - 6 vertical sections with effects */}
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-6 h-full w-full">
            <div className="relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
                alt="Tech Event 1"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110 filter brightness-75 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent opacity-60"></div>
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
                alt="Tech Event 2"
                fill
                className="object-cover transition-all duration-700 hover:scale-105 hover:rotate-1 filter saturate-150 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/25 to-transparent opacity-70"></div>
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop"
                alt="Tech Event 3"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110 filter hue-rotate-15 brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent opacity-50"></div>
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop"
                alt="Tech Event 4"
                fill
                className="object-cover transition-all duration-600 hover:scale-105 hover:-rotate-1 filter contrast-110 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-green-500/20 to-transparent opacity-60"></div>
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"
                alt="Tech Event 5"
                fill
                className="object-cover transition-transform duration-800 hover:scale-115 filter sepia-10 brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/15 to-transparent opacity-55"></div>
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop"
                alt="Tech Event 6"
                fill
                className="object-cover transition-all duration-700 hover:scale-110 hover:rotate-2 filter brightness-85 contrast-120"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/25 to-transparent opacity-65"></div>
            </div>
          </div>
          {/* Enhanced dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,2,20,0.75)] via-[rgba(18,6,36,0.65)] to-[rgba(0,0,0,0.8)]" />
        </div>
        
        <motion.div 
            className="z-10 px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            {/* Large Ignitia 2K26 Logo - slightly decreased but still prominent */}
            <div className="mb-2">
              <Image
                src="/images/ignitia2k26.png"
                alt="Ignitia 2K26"
                width={1500}
                height={500}
                className="h-80 md:h-96 w-auto mx-auto drop-shadow-2xl"
                priority
              />
            </div>
            <p className="font-semibold text-accent text-3xl md:text-4xl mt-1 drop-shadow-2xl">Where Technology Meets Culture</p>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80 drop-shadow-2xl">
                Coming Soon!! | PSIT Kanpur
            </p>
            <div className="mt-8 flex justify-center gap-4 pointer-events-auto">
                <ShimmerButton className="px-8 py-3">
                <Link href="/about" className="flex items-center gap-2">
                  More About Ignitia
                </Link>
                </ShimmerButton>
                <ShimmerButton asChild className="px-8 py-3 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground">
                <Link href="/events">Explore Events <Ticket className="ml-2"/></Link>
                </ShimmerButton>
            </div>
        </motion.div>
      </section>

      {/* Centered Content Sections */}
      <div className="container mx-auto space-y-24 py-24">
        <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="text-center mb-12">
              <h2 className="font-headline text-5xl uppercase tracking-wider">Socials</h2>
              <p className="mt-2 text-lg text-muted-foreground">Stay connected with us</p>
          </div>
          <motion.div 
              className="flex justify-center gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
          >
              {siteConfig.socials.map((social, index) => (
                <motion.div key={social['aria-label']} variants={itemVariants}>
                  <ShimmerButton asChild className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground p-2">
                      <a href={social.href} aria-label={social['aria-label']}><social.icon className="text-white"/></a>
                  </ShimmerButton>
                </motion.div>
              ))}
          </motion.div>
        </motion.section>

        <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              variants={staggerContainer}
          >
              <motion.div variants={itemVariants} className="border-r border-border last:border-r-0">
                  <Ticket className="h-12 w-12 text-accent mx-auto mb-4"/>
                  <p className="text-4xl font-bold"><NumberTicker value={50} />+</p>
                  <p className="text-muted-foreground">Events</p>
              </motion.div>
              <motion.div variants={itemVariants} className="border-r border-border last:border-r-0">
                  <Users className="h-12 w-12 text-accent mx-auto mb-4"/>
                  <p className="text-4xl font-bold"><NumberTicker value={100} />+</p>
                  <p className="text-muted-foreground">Teams</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                  <Award className="h-12 w-12 text-accent mx-auto mb-4"/>
                  <p className="text-4xl font-bold"><NumberTicker value={20} />+</p>
                  <p className="text-muted-foreground">Sponsors</p>
              </motion.div>
          </motion.div>
        </motion.section>

        <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* About PSIT Section - Text left, Image right */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
              >
                  <h2 className="font-headline text-5xl md:text-6xl tracking-wider uppercase text-accent">About PSIT</h2>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                      Pranveer Singh Institute of Technology (PSIT) is a premier engineering institution located in Kanpur, Uttar Pradesh. Established with a vision to provide quality technical education, PSIT has consistently produced industry-ready professionals who excel in their respective fields.
                  </p>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                      With state-of-the-art infrastructure, experienced faculty, and a vibrant campus life, PSIT offers undergraduate and postgraduate programs in various engineering disciplines. The institute emphasizes holistic development through academic excellence, research opportunities, and extracurricular activities.
                  </p>
                  <div className="pt-4">
                      <ShimmerButton asChild>
                          <a href="https://psit.ac.in/" target="_blank" rel="noopener noreferrer">
                              Visit PSIT
                          </a>
                      </ShimmerButton>
                  </div>
              </motion.div>
              <motion.div 
                  className="flex justify-center items-center"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
              >
                  <Image
                      src={aboutPsitImage.imageUrl}
                      alt="PSIT Campus"
                      width={600}
                      height={400}
                      className="object-cover rounded-lg shadow-lg"
                      data-ai-hint={aboutPsitImage.imageHint}
                  />
              </motion.div>
          </div>
        </motion.section>
        
        {/* About Ignitia Section - Purple gradient box right, Text left */}
        <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="py-16"
        >
          <div className="container mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div 
                      className="flex justify-center items-center md:order-2"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                  >
                      {/* Purple/Pink Gradient Box */}
                      <div className="w-full h-80 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-lg shadow-lg"></div>
                  </motion.div>
                  <motion.div 
                      className="space-y-6 md:order-1"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                  >
                      <h2 className="font-headline text-5xl md:text-6xl tracking-wider uppercase text-accent">About Ignitia</h2>
                      <p className="text-lg text-foreground/80 leading-relaxed">
                          Ignitia is the flagship annual fest of PSIT that brings together students, faculty, and industry professionals in a celebration of technology, culture, and innovation. This vibrant convergence showcases the best of student talent through competitions, performances, and networking opportunities.
                      </p>
                      <p className="text-lg text-foreground/80 leading-relaxed">
                          IGNITIA is the annual techno-cultural fest of PSIT, a vibrant convergence of innovation, creativity, and culture. It's a platform for students to showcase their talents, compete in exciting events, and connect with peers and industry leaders. From coding marathons to electrifying concerts, Ignitia is an experience you won't forget.
                      </p>
                      <div className="pt-4">
                          <ShimmerButton asChild>
                              <Link href="/about">Learn More</Link>
                          </ShimmerButton>
                      </div>
                  </motion.div>
              </div>
          </div>
        </motion.section>

        <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="text-center mb-12">
              <h2 className="font-headline text-5xl uppercase tracking-wider text-accent">Celebrity Reveal</h2>
              <p className="mt-2 text-lg text-muted-foreground">Something big is coming...</p>
              
              {/* Countdown Timer */}
              <div className="mt-8 mb-8">
                <div className="inline-block bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg p-6 border border-accent/30">
                  <p className="text-sm text-accent mb-2 uppercase tracking-wider">Revealing In</p>
                  <div id="countdown-timer" className="text-3xl font-bold text-white">
                    Loading...
                  </div>
                </div>
              </div>
          </div>
          
          {/* Flip Card */}
          <div className="flex justify-center">
            <div className="flip-card w-80 h-96 perspective-1000">
              <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-preserve-3d">
                {/* Front of card (locked) */}
                <div className="flip-card-front absolute w-full h-full backface-hidden rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex flex-col items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Celebrity Locked</h3>
                    <p className="text-accent">The big reveal is coming soon!</p>
                    <div className="text-sm text-muted-foreground">
                      Stay tuned for the announcement
                    </div>
                  </div>
                </div>
                
                {/* Back of card (revealed - hidden for now) */}
                <div className="flip-card-back absolute w-full h-full backface-hidden rounded-lg rotate-y-180 bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/50 overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={neetiMohanPoster.imageUrl}
                      alt="Celebrity Reveal"
                      fill
                      className="object-cover rounded-lg"
                      data-ai-hint={neetiMohanPoster.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <h3 className="text-2xl font-bold text-white">Coming Soon!</h3>
                      <p className="text-accent">The wait will be worth it</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <PastGuests />


         <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
         >
          <div className="text-center mb-12">
              <h2 className="font-headline text-5xl uppercase tracking-wider">Official Merchandise</h2>
              <p className="mt-2 text-lg text-muted-foreground">Get your hands on exclusive IGNITIA merchandise</p>
          </div>
          <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
          >
              {featuredProducts.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <Card className="w-full overflow-hidden group">
                        <CardHeader className="p-0">
                            <div className="relative aspect-square">
                                <Image
                                    src={product.image.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                  </motion.div>
              ))}
            </motion.div>
            <div className="text-center mt-12">
                <div className="inline-flex">
                  <ShimmerButton asChild className="px-8 py-3">
                      <Link href="/merchandise">Shop All Merch <ArrowRight/></Link>
                  </ShimmerButton>
                </div>
            </div>
         </motion.section>
      </div>
    </div>
  );
}
