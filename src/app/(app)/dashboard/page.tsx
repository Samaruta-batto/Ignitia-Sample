'use client';

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
import { events } from '@/lib/placeholder-data';
import { formatCurrency } from '@/lib/utils';
import type { Event } from '@/lib/types';
import { useRouter } from 'next/navigation';

// Add mock participant data to events
const eventsWithParticipants: (Event & { participants: number })[] = events
  .map(event => ({
    ...event,
    participants: Math.floor(Math.random() * (500 - 50 + 1)) + 50, // Random participants between 50 and 500
  }))
  .sort((a, b) => b.participants - a.participants);

export default function LeaderboardPage() {
  const router = useRouter();

  const handleRowClick = (event: Event) => {
    // Navigate to events page and pass category/subcategory info
    // This is a simple implementation. A more robust one might use query params
    // to pre-select the filters on the events page.
    router.push(`/events?category=${event.category}&subCategory=${event.subCategory}`);
  };

  return (
    <div className="space-y-8">
       <div className="text-center">
        <h1 className="font-headline text-5xl tracking-wider uppercase">Event Leaderboard</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          See which events are drawing the biggest crowds.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Trophy className="text-accent"/>
            Top Events by Participation
          </CardTitle>
          <CardDescription>
            Events sorted by the number of registered participants. Click a row to view the event.
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
                    <IndianRupee /> Prize Money
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventsWithParticipants.map((event, index) => (
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
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell className="text-right font-semibold">{event.participants}</TableCell>
                  <TableCell className="text-right font-bold text-green-400">{formatCurrency(Number(event.prize) || 0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
