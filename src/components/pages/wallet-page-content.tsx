'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IndianRupee, History, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { WalletTransaction } from '@/backend/services/walletService';

export function WalletPageContent() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('auth_token');
    if (!saved) {
      router.push('/user-login');
      return;
    }
    setToken(saved);
  }, [router]);

  useEffect(() => {
    if (!token) return;

    const fetchWallet = async () => {
      try {
        const [walletRes, txnsRes] = await Promise.all([
          fetch('/api/user/wallet', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch('/api/user/wallet/transactions', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
        ]);

        if (walletRes.ok) {
          const data = await walletRes.json();
          setBalance(data.balance);
        }

        if (txnsRes.ok) {
          const data = await txnsRes.json();
          setTransactions(data);
        }
      } catch (err) {
        console.error('Failed to fetch wallet:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWallet();
  }, [token]);

  return (
    <InteractiveGridPattern>
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
                {formatCurrency(balance)}
              </span>
              <IndianRupee className="ml-2 h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Every user gets ₹2000 welcome bonus. Funds are deducted when you register for events or purchase merchandise.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <History className="text-accent" />
              Transaction History
            </CardTitle>
            <CardDescription>
              All wallet transactions including event registrations and merchandise purchases
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading transactions...</p>
            ) : transactions.length === 0 ? (
              <p className="text-muted-foreground">No transactions yet.</p>
            ) : (
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
                          tx.type === 'credit' ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                      </p>
                    </div>
                    {index < transactions.length - 1 && <Separator className="mt-4" />}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </InteractiveGridPattern>
  );
}
