
'use client';

import * as React from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { eventCategories, eventSubCategories, events as allEvents } from '@/lib/data/placeholder-data';
import type { Event as StaticEvent } from '@/lib/data/types';
import { cn, formatCurrency } from '@/lib/utils';
import { MagicCard } from '@/components/ui/magic-card';
import { useToast } from '@/hooks/use-toast';
import { WarpBackground } from '@/components/ui/warp-background';

type Event = StaticEvent & { registeredAttendees?: number };

export function EventsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');
  const subCategoryParam = searchParams.get('subCategory');

  const { toast } = useToast();

  const [events, setEvents] = React.useState<Event[]>(allEvents);
  const [activeCategory, setActiveCategory] = React.useState<string>(categoryParam || 'entrepreneurial');
  const [activeSubCategory, setActiveSubCategory] = React.useState<string>(subCategoryParam || 'fintech');
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = React.useState<string | null>(null);

  // Load token from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('auth_token');
    setToken(saved);
  }, []);

  // Fetch events from backend
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/events/leaderboard');
        const data = await res.json();
        if (!cancelled) {
          // Merge backend registration counts with placeholder data
          const merged = allEvents.map(e => {
            const backendEvent = data.find((be: any) => be.id === e.id);
            return { ...e, registeredAttendees: backendEvent?.registeredAttendees || 0 };
          });
          setEvents(merged);
        }
      } catch (err) {
        console.warn('Failed to fetch events from backend, using placeholder data:', err);
        setEvents(allEvents);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true };
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!events) return [];
    return events.filter(event => event.category === activeCategory && event.subCategory === activeSubCategory);
  }, [events, activeCategory, activeSubCategory]);

  const handleRegister = async (eventId: string) => {
    if (!token) {
      router.push('/user-login');
      return;
    }

    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      let data;
      let responseText = '';
      try {
        responseText = await res.text();
        console.log('Registration response text:', responseText);
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        console.error('Response text was:', responseText);
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.error || `Registration failed (${res.status})`);
      }

      if (data.message && data.message.includes('already registered')) {
        toast({
          variant: 'default',
          title: 'Already Registered',
          description: 'You are already registered for this event.',
        });
      } else {
        // Refresh events data from backend to get updated counts
        try {
          const refreshRes = await fetch('/api/events/leaderboard');
          const refreshData = await refreshRes.json();
          const merged = allEvents.map(e => {
            const backendEvent = refreshData.find((be: any) => be.id === e.id);
            return { ...e, registeredAttendees: backendEvent?.registeredAttendees || 0 };
          });
          setEvents(merged);
        } catch (refreshErr) {
          console.warn('Failed to refresh event counts:', refreshErr);
          // Fallback to local update
          setEvents(prev => 
            prev.map(e => 
              e.id === eventId 
                ? { ...e, registeredAttendees: (e.registeredAttendees || 0) + 1 }
                : e
            )
          );
        }
        
        toast({
          title: 'Registration Successful!',
          description: "You're all set for the event.",
        });
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: error.message || 'Something went wrong. Please try again.',
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
                  'mx-4 py-6 text-lg uppercase tracking-widest bg-transparent',
                  activeCategory === category.id 
                    ? 'border-b-2 border-accent text-accent' 
                    : 'border-b-2 border-transparent text-muted-foreground hover:text-accent'
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
                className="w-[350px] flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 h-full"
              >
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-none overflow-hidden group w-full h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={item.image.imageUrl}
                      alt={item.title || item.name || ''}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      data-ai-hint={item.image.imageHint}
                    />
                  </div>
                  <CardContent className="p-6 text-center flex flex-col flex-1">
                    <h3 className="font-headline text-2xl text-white mb-2">{item.name}</h3>
                    <p className="text-muted-foreground text-sm flex-grow">{item.description}</p>
                    <div className="mt-auto pt-4">
                      <p className="text-sm text-muted-foreground mb-2">{item.registeredAttendees || 0} registered</p>
                      <p className="font-bold text-lg text-accent mb-4">{formatCurrency(item.price || 150)}</p>
                      <ShimmerButton
                        onClick={() => handleRegister(item.id)}
                        className="border-accent/50 text-accent bg-transparent hover:bg-accent hover:text-accent-foreground w-full border"
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
