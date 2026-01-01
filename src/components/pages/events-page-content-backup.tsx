'use client';

import * as React from 'react';
import { ShimmerButton } from '@/components/ui/shimmer-button';

export function EventsPageContent() {
  return (
    <div className="pt-24 min-h-screen p-4 md:p-8">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="font-headline text-5xl tracking-wider uppercase">Events</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Coming Soon!
          </p>
        </div>
      </div>
    </div>
  );
}