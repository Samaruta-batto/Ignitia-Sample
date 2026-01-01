'use client';

import * as React from 'react';
import { WarpBackground } from '@/components/ui/warp-background';

export function EventsPageContent() {
  return (
    <WarpBackground className="min-h-screen">
      <div className="pt-24 min-h-screen p-4 md:p-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="font-headline text-5xl tracking-wider uppercase">Events</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Exciting events are being planned for Ignitia 2026. Stay tuned for announcements!
            </p>
            <div className="mt-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-accent/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-4xl font-headline text-accent mb-4 uppercase tracking-wider">Coming Soon!</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Follow our social media for the latest updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </WarpBackground>
  );
}