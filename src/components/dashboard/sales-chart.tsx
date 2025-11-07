'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const data = [
  { name: 'Tee', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Cap', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Bottle', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Hoodie', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Pins', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Tote', total: Math.floor(Math.random() * 5000) + 1000 },
];

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Merchandise Sales</CardTitle>
        <CardDescription>Breakdown of sales by product type.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
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
              tickFormatter={(value) => `₹${value}`}
            />
            <Bar dataKey="total" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
