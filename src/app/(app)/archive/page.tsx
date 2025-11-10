'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { archiveItems } from '@/lib/placeholder-data';
import { Separator } from '@/components/ui/separator';
import type { ArchiveItem } from '@/lib/types';

const years = [...new Set(archiveItems.map(item => item.year))].sort((a,b) => b-a);
const topics = [...new Set(archiveItems.map(item => item.topic))];

export default function ArchivePage() {
    const [filteredItems, setFilteredItems] = React.useState<ArchiveItem[]>(archiveItems);
    const [activeYear, setActiveYear] = React.useState<number | 'all'>('all');
    const [activeTopic, setActiveTopic] = React.useState<string | 'all'>('all');

    React.useEffect(() => {
        let items = archiveItems;
        if (activeYear !== 'all') {
            items = items.filter(item => item.year === activeYear);
        }
        if (activeTopic !== 'all') {
            items = items.filter(item => item.topic === activeTopic);
        }
        setFilteredItems(items);
    }, [activeYear, activeTopic]);


  return (
    <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
             <div>
                <h2 className="font-headline text-2xl uppercase tracking-wider">Filter by Year</h2>
                <div className="flex gap-2 mt-2 flex-wrap">
                    <ShimmerButton variant={activeYear === 'all' ? 'default' : 'secondary'} onClick={() => setActiveYear('all')}>All</ShimmerButton>
                    {years.map(year => (
                        <ShimmerButton key={year} variant={activeYear === year ? 'default' : 'secondary'} onClick={() => setActiveYear(year)}>{year}</ShimmerButton>
                    ))}
                </div>
            </div>
            <Separator orientation="vertical" className="hidden md:block h-16"/>
            <div>
                <h2 className="font-headline text-2xl uppercase tracking-wider">Filter by Topic</h2>
                <div className="flex gap-2 mt-2 flex-wrap">
                    <ShimmerButton variant={activeTopic === 'all' ? 'default' : 'secondary'} onClick={() => setActiveTopic('all')}>All</ShimmerButton>
                    {topics.map(topic => (
                        <ShimmerButton key={topic} variant={activeTopic === topic ? 'default' : 'secondary'} onClick={() => setActiveTopic(topic)}>{topic}</ShimmerButton>
                    ))}
                </div>
            </div>
        </div>
        
        <Separator/>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden group">
                    <div className="relative aspect-video">
                        <Image
                        src={item.image.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={item.image.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute bottom-0 left-0 p-4">
                            <h3 className="font-bold text-lg text-white">{item.title}</h3>
                            <div className="flex gap-2 mt-1">
                                <span className="text-xs font-semibold text-background bg-accent/90 px-2 py-1 rounded">{item.year}</span>
                                <span className="text-xs font-semibold text-foreground bg-secondary px-2 py-1 rounded">{item.topic}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
            {filteredItems.length === 0 && (
                <div className="col-span-full text-center py-16">
                    <h3 className="text-2xl font-headline">No memories found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters.</p>
                </div>
            )}
        </div>
    </div>
  );
}
