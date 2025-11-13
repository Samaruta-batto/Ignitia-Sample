
'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { products, events } from '@/lib/data/placeholder-data';
import { ArrowRight, Ticket, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/data/placeholder-images';
import { formatCurrency } from '@/lib/utils';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { PastGuests } from '@/components/home/past-guests';
import NumberTicker from '@/components/ui/number-ticker';
import { siteConfig } from '@/lib/data/site-config';
import { motion } from 'framer-motion';

export function HomePageContent() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'home-background')!;
  const featuredProducts = products.slice(0, 3);
  const aboutIgnitiaImage = PlaceHolderImages.find(p => p.id === 'about-ignitia')!;
  const aboutPsitImage = PlaceHolderImages.find(p => p.id === 'about-psit')!;
  const neetiMohanPoster = PlaceHolderImages.find(p => p.id === 'celebrity-neeti-mohan-reveal')!;
  
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
<<<<<<< HEAD
    <div className="space-y-24 -mt-8 -mx-8">
      <section className="relative w-screen h-[70vh] flex items-center justify-center text-center text-white overflow-hidden">
  {/* Background image — ensure parent is relative and has height */}
  <div className="absolute inset-0 z-0">
    <Image
      src={heroImage.imageUrl}
      alt={heroImage.imageHint ?? 'Hero background'}
      fill
      priority
      // inline style to force object-fit if global styles override Tailwind
      style={{ objectFit: 'cover' }}
      className="w-full h-full"
      unoptimized={false}
    />
  </div>

  {/* Foreground content — higher z */}
  <motion.div 
    className="z-10 px-4 max-w-5xl"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
  >
=======
    <div className="space-y-24">
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-10">
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.imageHint}
                fill
                priority
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
            />
        </div>
        <motion.div 
            className="z-10 px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
>>>>>>> 684a094 (well i want those images as the bg of my landing page and homepage check)
            <h1 className="font-headline text-6xl md:text-8xl uppercase tracking-wider text-shadow-lg drop-shadow-2xl">
                IGNITIA 2K26
            </h1>
            <p className="font-semibold text-accent text-xl md:text-2xl mt-2 drop-shadow-2xl">Where Technology Meets Culture</p>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80 drop-shadow-2xl">
                April 28-29, 2026 | PSIT Kanpur
            </p>
            <div className="mt-8 flex justify-center gap-4 pointer-events-auto">
                <ShimmerButton className="px-8 py-3">
                <Link href="/events" className="flex items-center gap-2">Register Now <ArrowRight /></Link>
                </ShimmerButton>
                <ShimmerButton asChild className="px-8 py-3 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground">
                <Link href="/events">Explore Events <Ticket className="ml-2"/></Link>
                </ShimmerButton>
            </div>
        </motion.div>
      </section>

      <motion.section 
        className="container mx-auto"
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
            {siteConfig.socials.map((social) => (
              <motion.div key={social.href} variants={itemVariants}>
                <ShimmerButton size="icon" asChild className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground">
                    <a href={social.href} aria-label={social['aria-label']}><social.icon className="text-white"/></a>
                </ShimmerButton>
              </motion.div>
            ))}
        </motion.div>
      </motion.section>

      <motion.section 
        className="container mx-auto"
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
        className="container mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="font-headline text-5xl uppercase tracking-wider text-accent">About Ignitia</h2>
                <p className="text-lg text-muted-foreground">
                IGNITIA is the annual techno-cultural fest of PSIT, a vibrant convergence of innovation, creativity, and culture. It's a platform for students to showcase their talents, compete in exciting events, and connect with peers and industry leaders. From coding marathons to electrifying concerts, Ignitia is an experience you won't forget.
                </p>
                <div className="inline-flex">
                    <ShimmerButton asChild className="px-6 py-2 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground">
                        <Link href="/about">Learn More <ArrowRight className="ml-2" /></Link>
                    </ShimmerButton>
                </div>
            </motion.div>
            <motion.div 
                className="relative h-80 rounded-lg overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                 <Image
                    src={aboutIgnitiaImage.imageUrl}
                    alt="About Ignitia"
                    fill
                    className="object-cover"
                    data-ai-hint={aboutIgnitiaImage.imageHint}
                />
            </motion.div>
        </div>
      </motion.section>
      
      <motion.section 
        className="container mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
                className="relative h-80 rounded-lg overflow-hidden shadow-2xl md:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                 <Image
                    src={aboutPsitImage.imageUrl}
                    alt="About PSIT"
                    fill
                    className="object-cover"
                    data-ai-hint={aboutPsitImage.imageHint}
                />
            </motion.div>
            <motion.div 
                className="space-y-4 md:order-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="font-headline text-5xl uppercase tracking-wider text-accent">About PSIT</h2>
                <p className="text-lg text-muted-foreground">
                Pranveer Singh Institute of Technology (PSIT) is a leading institution in Kanpur, renowned for its commitment to academic excellence and holistic development. With state-of-the-art infrastructure and a world-class faculty, PSIT provides an environment where students can thrive and achieve their full potential.
                </p>
                <div className="inline-flex">
                    <ShimmerButton asChild className="px-6 py-2 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground text-foreground">
                        <a href="https://psit.ac.in/" target="_blank" rel="noopener noreferrer">Visit PSIT <ArrowRight className="ml-2" /></a>
                    </ShimmerButton>
                </div>
            </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="container mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="text-center mb-12">
            <h2 className="font-headline text-5xl uppercase tracking-wider text-accent">Celebrity Revealed!</h2>
            <p className="mt-2 text-lg text-muted-foreground">Get ready for an electrifying performance by the sensational Neeti Mohan</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
                className="rounded-lg overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                 <Image
                    src={neetiMohanPoster.imageUrl}
                    alt="Neeti Mohan Ignitia Poster"
                    width={600}
                    height={750}
                    className="object-cover"
                    data-ai-hint={neetiMohanPoster.imageHint}
                />
            </motion.div>
            <motion.div 
                className="space-y-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                 <motion.h3 variants={itemVariants} className="font-headline text-6xl tracking-wider uppercase" style={{fontFamily: "'Times New Roman', Times, serif"}}>Neeti Mohan</motion.h3>
                <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
                    We are thrilled to announce a spectacular performance by Neeti Mohan that will light up the stage at IGNITIA 2K25. Get ready for an unforgettable experience with one of India's most celebrated artists.
                </motion.p>
                <motion.div variants={staggerContainer} className="flex gap-8">
                    <motion.div variants={itemVariants} className="text-center">
                        <p className="text-4xl font-bold text-accent"><NumberTicker value={100} />+</p>
                        <p className="text-muted-foreground">Shows</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="text-center">
                        <p className="text-4xl font-bold text-accent"><NumberTicker value={10} />M+</p>
                        <p className="text-muted-foreground">Followers</p>
                    </motion.div>
                </motion.div>
                <motion.div variants={itemVariants} className="inline-flex">
                    <ShimmerButton asChild className="px-6 py-2">
                        <Link href="#">See More</Link>
                    </ShimmerButton>
                </motion.div>
            </motion.div>
        </div>
      </motion.section>

      <PastGuests />


       <motion.section 
        className="container mx-auto"
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
  );
}
