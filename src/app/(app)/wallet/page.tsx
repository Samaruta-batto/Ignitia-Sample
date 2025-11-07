
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IndianRupee, PlusCircle, History } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';

const transactions = [
    { id: 1, description: 'Merchandise: Official Tee', amount: -350, date: '2024-08-16' },
    { id: 2, description: 'UPI Top-up', amount: 2000, date: '2024-08-15' },
    { id: 3, description: 'Food Stall: Pizza', amount: -250, date: '2024-08-15' },
    { id: 4, description: 'Initial Deposit', amount: 1000, date: '2024-08-14' },
];

const currentBalance = transactions.reduce((acc, t) => acc + t.amount, 0);

export default function WalletPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-primary-foreground/80">
            Current Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <span className="text-5xl font-bold tracking-tighter">
              {formatCurrency(currentBalance)}
            </span>
            <IndianRupee className="ml-2 h-8 w-8 text-accent" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <PlusCircle className="text-accent"/> Manage Your Wallet
          </CardTitle>
          <CardDescription>
            Top-up your balance to make seamless payments during events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
            Top-Up via UPI
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <History className="text-accent"/>
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {transactions.map((tx, index) => (
              <li key={tx.id}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                  <p
                    className={`font-bold text-lg ${
                      tx.amount > 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                  </p>
                </div>
                {index < transactions.length - 1 && <Separator className="mt-4" />}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
