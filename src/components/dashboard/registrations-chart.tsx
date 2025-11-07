'use client';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const data = [
  { date: 'Jan', total: Math.floor(Math.random() * 200) + 50 },
  { date: 'Feb', total: Math.floor(Math.random() * 300) + 150 },
  { date: 'Mar', total: Math.floor(Math.random() * 400) + 250 },
  { date: 'Apr', total: Math.floor(Math.random() * 500) + 300 },
  { date: 'May', total: Math.floor(Math.random() * 600) + 400 },
  { date: 'Jun', total: Math.floor(Math.random() * 700) + 550 },
];

export function RegistrationsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Registrations</CardTitle>
        <CardDescription>Registration trend over the past 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))' 
                }}
            />
            <Line 
                type="monotone" 
                dataKey="total" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                dot={{ r: 4, fill: 'hsl(var(--accent))' }}
                activeDot={{ r: 8, fill: 'hsl(var(--accent))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
