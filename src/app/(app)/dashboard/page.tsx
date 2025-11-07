import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, DollarSign, Ticket, ShoppingBag } from 'lucide-react';
import { SalesChart } from '@/components/dashboard/sales-chart';
import { RegistrationsChart } from '@/components/dashboard/registrations-chart';

const stats = [
    { title: 'Total Revenue', value: '$45,231.89', icon: DollarSign, change: '+20.1% from last month' },
    { title: 'Total Registrations', value: '+2350', icon: Users, change: '+180.1% from last month' },
    { title: 'Tickets Sold', value: '+12,234', icon: Ticket, change: '+19% from last month' },
    { title: 'Merch Sales', value: '+573', icon: ShoppingBag, change: '+21 from last month' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
            <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
            </Card>
        ))}
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <RegistrationsChart />
        <SalesChart />
      </div>
    </div>
  );
}
