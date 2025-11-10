
'use client';

import * as React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { eventCategories, eventSubCategories } from '@/lib/placeholder-data';
import type { Event as StaticEvent } from '@/lib/types';
import { cn, formatCurrency } from '@/lib/utils';
import { MagicCard } from '@/components/ui/magic-card';
import { useFirebase } from '@/firebase';
import {
  runTransaction,
  doc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useCollection, type WithId } from '@/firebase/firestore/use-collection';
import { query, where } from 'firebase/firestore';
import { useMemoFirebase, useUser } from '@/firebase/provider';
import { WarpBackground } from '@/components/ui/warp-background';

type Event = WithId<StaticEvent>;

export default function EventsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const subCategoryParam = searchParams.get('subCategory');

  const { firestore } = useFirebase();
  const { user } = useUser();
  const { toast } = useToast();

  const [activeCategory, setActiveCategory] = React.useState<string>(categoryParam || 'entrepreneurial');
  const [activeSubCategory, setActiveSubCategory] = React.useState<string>(subCategoryParam || 'fintech');
  
  const eventsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    const subCategory = eventSubCategories[activeCategory]?.find(sc => sc.id === activeSubCategory);
    if (!subCategory || subCategory.eventIds.length === 0) {
      return null;
    }
    return query(
      collection(firestore, 'events'), 
      where('__name__', 'in', subCategory.eventIds)
    );
  }, [firestore, activeCategory, activeSubCategory]);

  const { data: filteredItems, isLoading } = useCollection<Event>(eventsQuery);

  const handleRegister = async (eventId: string) => {
    if (!firestore || !user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'You must be logged in to register for an event.',
      });
      return;
    }

    const eventRef = doc(firestore, 'events', eventId);
    const registrationRef = doc(collection(firestore, 'events', eventId, 'registrations'));

    try {
      await runTransaction(firestore, async (transaction) => {
        const eventDoc = await transaction.get(eventRef);
        if (!eventDoc.exists()) {
          throw new Error("Event does not exist!");
        }

        // Increment the registered attendees count
        const newAttendeeCount = (eventDoc.data().registeredAttendees || 0) + 1;
        transaction.update(eventRef, { registeredAttendees: newAttendeeCount });

        // Create a new registration document
        transaction.set(registrationRef, {
          userId: user.uid,
          registrationDate: serverTimestamp(),
          paymentStatus: 'paid', // Assuming payment is handled
        });
      });

      toast({
        title: 'Registration Successful!',
        description: "You're all set for the event.",
      });
    } catch (error) {
      console.error('Registration failed: ', error);
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: 'Something went wrong. Please try again.',
      });
    }
  };


  React.useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
    if (subCategoryParam) setActiveSubCategory(subCategoryParam);
  }, [categoryParam, subCategoryParam]);

   React.useEffect(() => {
    const subCategoryExists = eventSubCategories[activeCategory]?.some(sc => sc.id === activeSubCategory);
    if (!subCategoryExists) {
      const firstSubCategory = eventSubCategories[activeCategory]?.[0];
      if (firstSubCategory) {
        setActiveSubCategory(firstSubCategory.id);
      }
    }
  }, [activeCategory, activeSubCategory]);

  return (
    <WarpBackground>
      <div className="space-y-8">
        <section className="space-y-4">
          <div className="flex justify-center border-b border-accent/20">
            {eventCategories.map(category => (
              <ShimmerButton
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'mx-4 py-6 text-lg uppercase tracking-widest rounded-none border-b-2 bg-transparent',
                  activeCategory === category.id 
                    ? 'border-accent text-accent' 
                    : 'border-transparent text-muted-foreground hover:text-accent'
                )}
              >
                {category.name}
              </ShimmerButton>
            ))}
          </div>
          {eventSubCategories[activeCategory] && (
            <div className="flex justify-center border-b border-accent/20 flex-wrap py-2 gap-2">
              {eventSubCategories[activeCategory].map(sub => (
                <ShimmerButton
                  key={sub.id}
                  onClick={() => setActiveSubCategory(sub.id)}
                  className={cn(
                    'py-2 px-4 text-md rounded-full border bg-transparent',
                     activeSubCategory === sub.id 
                      ? 'border-accent text-accent bg-accent/10' 
                      : 'border-input text-muted-foreground hover:text-accent hover:border-accent'
                  )}
                >
                  {sub.name}
                </ShimmerButton>
              ))}
            </div>
          )}
        </section>

        
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
               {isLoading && <p>Loading events...</p>}
              {filteredItems && filteredItems.map(item => (
                <MagicCard
                  key={item.id}
                  className="w-[350px] flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-none overflow-hidden group w-full h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={item.image.imageHint}
                      />
                    </div>
                    <CardContent className="p-6 text-center flex flex-col flex-grow">
                      <h3 className="font-headline text-2xl text-white mb-2">{item.name}</h3>
                      <p className="text-muted-foreground text-sm flex-grow">{item.description}</p>
                      <div className="mt-4">
                        <p className="font-bold text-lg text-accent mb-4">{formatCurrency(150)}</p>
                          <ShimmerButton
                          variant="outline"
                          onClick={() => handleRegister(item.id)}
                          className="border-accent/50 text-accent bg-transparent hover:bg-accent hover:text-accent-foreground w-full"
                          >
                          Register Now
                          </ShimmerButton>
                      </div>
                    </CardContent>
                  </Card>
                </MagicCard>
              ))}
              {!isLoading && (!filteredItems || filteredItems.length === 0) && (
                <div className="col-span-full text-center py-16">
                  <h3 className="text-2xl font-headline">No Events Found</h3>
                  <p className="text-muted-foreground">Please select a different category.</p>
                </div>
              )}
            </div>
          </div>
        
      </div>
    </WarpBackground>
  );
}
