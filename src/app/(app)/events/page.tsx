
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { events, eventCategories, eventSubCategories } from '@/lib/placeholder-data';
import type { Event } from '@/lib/types';
import { cn } from '@/lib/utils';
import { MagicCard } from '@/components/ui/magic-card';
import { WarpBackground } from '@/components/ui/warp-background';

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = React.useState<string>('entrepreneurial');
  const [activeSubCategory, setActiveSubCategory] = React.useState<string>('fintech');
  const [filteredItems, setFilteredItems] = React.useState<Event[]>([]);

  React.useEffect(() => {
    const subCategory = eventSubCategories[activeCategory]?.find(sc => sc.id === activeSubCategory);
    if (subCategory) {
      const items = events.filter(event => subCategory.eventIds.includes(event.id));
      setFilteredItems(items);
    } else {
      // Fallback to first subcategory if current is not in the new active category
      const firstSubCategory = eventSubCategories[activeCategory]?.[0];
      if (firstSubCategory) {
        setActiveSubCategory(firstSubCategory.id);
      } else {
        setFilteredItems([]);
      }
    }
  }, [activeCategory, activeSubCategory]);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex justify-center border-b border-accent/20">
          {eventCategories.map(category => (
            <Button
              key={category.id}
              variant="ghost"
              onClick={() => {
                setActiveCategory(category.id);
                // Set the active subcategory to the first one in the new category
                const firstSubCategory = eventSubCategories[category.id]?.[0];
                if (firstSubCategory) {
                  setActiveSubCategory(firstSubCategory.id);
                }
              }}
              className={cn(
                'mx-4 py-6 text-lg uppercase tracking-widest rounded-none hover:bg-transparent hover:text-accent',
                activeCategory === category.id ? 'border-b-2 border-accent text-accent' : 'text-muted-foreground'
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
        {eventSubCategories[activeCategory] && (
          <div className="flex justify-center border-b border-accent/20 flex-wrap">
            {eventSubCategories[activeCategory].map(sub => (
              <Button
                key={sub.id}
                variant="ghost"
                onClick={() => setActiveSubCategory(sub.id)}
                className={cn(
                  'mx-2 py-4 text-md rounded-none hover:bg-transparent hover:text-accent',
                  activeSubCategory === sub.id ? 'border-b-2 border-accent text-accent' : 'text-muted-foreground'
                )}
              >
                {sub.name}
              </Button>
            ))}
          </div>
        )}
      </section>

      <WarpBackground>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {filteredItems.map(item => (
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
                    <h3 className="font-headline text-2xl text-white mb-4">{item.title}</h3>
                    <div className="mt-auto">
                        <Button
                        variant="outline"
                        className="border-accent/50 text-accent bg-transparent hover:bg-accent hover:text-accent-foreground w-full"
                        >
                        ₹ {item.prize || '75,000'}/-
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              </MagicCard>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-16">
                <h3 className="text-2xl font-headline">No Events Found</h3>
                <p className="text-muted-foreground">Please select a different category.</p>
              </div>
            )}
          </div>
        </div>
      </WarpBackground>
    </div>
  );
}
