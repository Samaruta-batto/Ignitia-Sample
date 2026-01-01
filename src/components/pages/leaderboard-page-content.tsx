
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { WarpBackground } from '@/components/ui/warp-background';

export function LeaderboardPageContent() {
  return (
    <WarpBackground className="min-h-screen">
      <div className="pt-24 min-h-screen p-4 md:p-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="font-headline text-5xl tracking-wider uppercase">Event Leaderboard</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              See which events are drawing the biggest crowds in real-time.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Trophy className="text-accent"/>
                Top Events by Participation
              </CardTitle>
              <CardDescription>
                Events sorted by the number of registered participants. Click a row to view events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Coming Soon Message */}
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-accent" />
                  </div>
                  <h3 className="text-4xl font-headline text-accent mb-4 uppercase tracking-wider">Coming Soon!</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Event leaderboard will be available once events are announced and registrations begin.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Check back soon for live participation stats!
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WarpBackground>
  );
}