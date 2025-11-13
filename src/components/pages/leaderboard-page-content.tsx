
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trophy, Users, IndianRupee } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useCollection, type WithId } from '@/firebase/firestore/use-collection';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Event } from '@/lib/data/types';
import { useMemoFirebase, useFirestore } from '@/firebase/provider';
import { WarpBackground } from '@/components/ui/warp-background';

type EventWithRegistrations = WithId<Event & { registeredAttendees: number }>;

export function LeaderboardPageContent() {
  const router = useRouter();
  const firestore = useFirestore();

  const eventsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'events'), orderBy('registeredAttendees', 'desc'));
  }, [firestore]);
  
  const { data: events, isLoading } = useCollection<EventWithRegistrations>(eventsQuery);

  const handleRowClick = (event: Event) => {
    router.push(`/events`);
  };

  return (
    <WarpBackground>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>Event Title</TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Users /> Participants
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                     <div className="flex items-center justify-end gap-2">
                      <IndianRupee /> Entry Fee
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">Loading leaderboard...</TableCell>
                  </TableRow>
                )}
                {events && events.map((event, index) => (
                  <TableRow 
                    key={event.id} 
                    className={`cursor-pointer ${index < 3 ? 'bg-card/50' : ''}`}
                    onClick={() => handleRowClick(event)}
                  >
                    <TableCell className="font-bold text-lg text-accent">
                       <div className="flex items-center gap-2">
                          {index < 3 ? <Trophy className="w-5 h-5 text-yellow-400" /> : null}
                          {index + 1}
                       </div>
                    </TableCell>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell className="text-right font-semibold">{event.registeredAttendees}</TableCell>
                    <TableCell className="text-right font-bold text-green-400">{formatCurrency(event.price || 0)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </WarpBackground>
  );
}
