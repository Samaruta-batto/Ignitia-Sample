
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Logo } from '@/components/icons/logo';

export default function UserLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Firebase not configured',
        description: 'Authentication service is not available.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home');
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: error.message,
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
            <div className="flex justify-center">
                 <Logo />
            </div>
            <div className="bg-card/50 p-8 rounded-lg shadow-2xl">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-headline uppercase tracking-wider">Welcome Back</h1>
                    <p className="text-muted-foreground">Enter your credentials to access your account.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background/50"
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        id="password" 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-background/50"
                    />
                    </div>
                    <ShimmerButton type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                        <LogIn className="ml-2 h-4 w-4" />
                    </ShimmerButton>
                </form>
            </div>
             <div className="text-center text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="font-semibold text-accent hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    </div>
  );
}
