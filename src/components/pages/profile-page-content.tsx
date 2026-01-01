
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  User,
  Wallet,
  Edit,
  LogOut,
} from 'lucide-react';
// Remove backend service imports - using types from Rust backend responses
interface EventRegistration {
  eventId: string;
  eventName: string;
  registrationDate: string;
  status: string;
  paymentAmount?: number;
}

interface WalletTransaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
  status: string;
}

interface UserProfile {
  id: string;
  email: string;
  name?: string;
}

interface WalletData {
  balance: number;
  transactions: WalletTransaction[];
}

export function ProfilePageContent() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [profileError, setProfileError] = useState<string | null>(null);
  const [addFundsAmount, setAddFundsAmount] = useState<string>('500');

  // Load token from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('auth_token');
    if (saved) {
      setToken(saved);
    }
  }, []);

  // Auth handlers (sign in / sign up)
  const handleSignIn = async () => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || 'Sign in failed');
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        setToken(data.token);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Sign in failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignUp = async () => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword, name: authName }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || 'Sign up failed');
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        setToken(data.token);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Sign up failed');
    } finally {
      setAuthLoading(false);
    }
  };

  // Fetch user profile and wallet data
  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      setProfileError(null);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setProfileError(null);
      try {
        console.log('[DEBUG] profile-page: fetching with token:', token.slice(0, 30) + (token.length > 30 ? '...' : ''));
        const backendUrl = process.env.NEXT_PUBLIC_RUST_BACKEND_URL || 'http://localhost:8081';
        const [profileRes, walletRes, registrationsRes] = await Promise.all([
          fetch(`${backendUrl}/api/user/profile`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch(`${backendUrl}/api/user/wallet`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch(`${backendUrl}/api/user/registrations`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
        ]);

        console.log('[DEBUG] profile-page: profileRes status:', profileRes.status);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          console.log('[DEBUG] profile-page: profile data:', profileData);
          setUser(profileData.user);
          setEditedName(profileData.user.name || '');
        } else {
          const errData = await profileRes.json().catch(() => ({}));
          console.error('[DEBUG] profile-page: profile fetch failed:', profileRes.status, errData);
          setProfileError(`Failed to load profile: ${errData.error || 'Unknown error'}`);
        }

        if (walletRes.ok) {
          const walletData = await walletRes.json();
          setWallet(walletData);
        }

        if (registrationsRes.ok) {
          const regsData = await registrationsRes.json();
          setRegistrations(regsData);
        }
      } catch (err) {
        console.error('[DEBUG] profile-page: fetch error:', err);
        setProfileError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Auto-refresh data when page becomes visible (for better sync)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && token) {
        refreshWalletData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  const handleSaveProfile = () => {
    // TODO: Add API call to update profile
    setIsEditing(false);
  };

  const refreshWalletData = async () => {
    if (!token) return;
    try {
      const backendUrl = process.env.NEXT_PUBLIC_RUST_BACKEND_URL || 'http://localhost:8081';
      const [walletRes, registrationsRes] = await Promise.all([
        fetch(`${backendUrl}/api/user/wallet`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${backendUrl}/api/user/registrations`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (walletRes.ok) {
        const walletData = await walletRes.json();
        setWallet(walletData);
      }

      if (registrationsRes.ok) {
        const regsData = await registrationsRes.json();
        setRegistrations(regsData);
      }
    } catch (err) {
      console.error('Failed to refresh wallet data:', err);
    }
  };

  const handleAddFunds = async (amount: number) => {
    if (!token || !user) return;
    
    try {
      // Load Razorpay script
      const { loadRazorpayScript, RAZORPAY_KEY_ID } = await import('@/lib/razorpay');
      const isLoaded = await loadRazorpayScript();
      
      if (!isLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        return;
      }

      // Create payment order
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, currency: 'INR' }),
      });

      if (!orderRes.ok) {
        const error = await orderRes.json();
        alert(`Failed to create payment order: ${error.error || 'Unknown error'}`);
        return;
      }

      const order = await orderRes.json();

      // Initialize Razorpay checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Ignitia Wallet',
        description: `Add ₹${amount} to wallet`,
        order_id: order.razorpay_order_id,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: amount,
              }),
            });

            const result = await verifyRes.json();
            
            if (result.success) {
              // Refresh wallet data
              await refreshWalletData();
              alert(`${result.message} New balance: ₹${result.newBalance}`);
            } else {
              alert(`Payment verification failed: ${result.message}`);
            }
          } catch (err) {
            console.error('Payment verification error:', err);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user.name || 'User',
          email: user.email,
        },
        theme: {
          color: '#D4AF37',
        },
        modal: {
          ondismiss: () => {
            console.log('Payment cancelled by user');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (err) {
      console.error('Failed to initiate payment:', err);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  // If no token, show sign-in / sign-up UI inside profile page
  if (!token) {
    return (
      <div className="min-h-screen pt-24 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-gray-400">Sign in or create an account to view your profile</p>
          </div>

          <div className="bg-[#1A1625] p-6 rounded-lg border border-[#D4AF37]/10">
            <div className="flex justify-center gap-2 mb-4">
              <ShimmerButton 
                onClick={() => setAuthMode('signin')} 
                className={authMode === 'signin' ? '' : 'bg-transparent border border-input hover:bg-accent hover:text-accent-foreground'}
              >
                Sign In
              </ShimmerButton>
              <ShimmerButton 
                onClick={() => setAuthMode('signup')} 
                className={authMode === 'signup' ? '' : 'bg-transparent border border-input hover:bg-accent hover:text-accent-foreground'}
              >
                Sign Up
              </ShimmerButton>
            </div>

            {authError && <p className="text-red-500 text-sm mb-2">{authError}</p>}

            <div className="space-y-3">
              {authMode === 'signup' && (
                <div>
                  <Label className="text-gray-300">Name</Label>
                  <Input value={authName} onChange={(e) => setAuthName(e.target.value)} className="bg-[#111015]" />
                </div>
              )}

              <div>
                <Label className="text-gray-300">Email</Label>
                <Input value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="bg-[#111015]" />
              </div>

              <div>
                <Label className="text-gray-300">Password</Label>
                <Input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="bg-[#111015]" />
              </div>

              <div className="flex gap-2">
                {authMode === 'signin' ? (
                  <ShimmerButton onClick={handleSignIn} className="flex-1" disabled={authLoading}>
                    {authLoading ? 'Signing in...' : 'Sign In'}
                  </ShimmerButton>
                ) : (
                  <ShimmerButton onClick={handleSignUp} className="flex-1" disabled={authLoading}>
                    {authLoading ? 'Signing up...' : 'Create Account'}
                  </ShimmerButton>
                )}
                <ShimmerButton onClick={() => { setAuthEmail(''); setAuthPassword(''); setAuthName(''); }} className="flex-1 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground">
                  Clear
                </ShimmerButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userInitial = (user?.name || user?.email)?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="min-h-screen pt-24 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-400">Manage your account and preferences</p>
            {profileError && <p className="text-red-400 text-sm mt-2">{profileError}</p>}
          </div>

          <div className="flex gap-3">
            <ShimmerButton
              onClick={handleLogout}
              className="bg-transparent border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </ShimmerButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            {isLoading ? (
              <Card className="bg-[#312A41] border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <p className="text-gray-400">Loading profile...</p>
                </CardContent>
              </Card>
            ) : !user ? (
              <Card className="bg-[#312A41] border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <p className="text-red-400">Unable to load profile. {profileError ? `Error: ${profileError}` : 'Please try signing in again.'}</p>
                  <ShimmerButton onClick={handleLogout} className="w-full mt-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1625]">
                    Sign In Again
                  </ShimmerButton>
                </CardContent>
              </Card>
            ) : (
              <>
            <Card className="bg-[#312A41] border-[#D4AF37]/20">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="w-32 h-32 mb-4 border-4 border-[#D4AF37]">
                    <AvatarFallback className="text-3xl bg-[#D4AF37] text-[#1A1625]">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-white mb-1">{user.name || 'User'}</h2>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Name</Label>
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="bg-[#1A1625] border-[#D4AF37]/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Email</Label>
                      <Input
                        value={user.email}
                        disabled
                        className="bg-[#1A1625] border-[#D4AF37]/20 text-gray-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <ShimmerButton onClick={handleSaveProfile} className="flex-1 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1625]">
                        Save
                      </ShimmerButton>
                      <ShimmerButton onClick={() => setIsEditing(false)} className="flex-1 bg-transparent border border-[#D4AF37]/30">
                        Cancel
                      </ShimmerButton>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <User className="w-4 h-4 text-[#D4AF37]" />
                      <span>{user.email}</span>
                    </div>
                    <ShimmerButton
                      onClick={() => setIsEditing(true)}
                      className="w-full mt-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1625]"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </ShimmerButton>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#312A41] border-[#D4AF37]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-[#D4AF37]" />
                  Wallet Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-[#D4AF37]">
                  ₹{wallet?.balance || 0}
                </div>
                <p className="text-gray-400 text-sm mb-4">Available balance</p>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-300 text-sm">Add Amount (₹)</Label>
                    <Input
                      type="number"
                      value={addFundsAmount}
                      onChange={(e) => setAddFundsAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="bg-[#1A1625] border-[#D4AF37]/20 text-white"
                      min="1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <ShimmerButton
                      onClick={() => setAddFundsAmount('500')}
                      className="bg-transparent border border-[#D4AF37]/30 text-xs"
                    >
                      ₹500
                    </ShimmerButton>
                    <ShimmerButton
                      onClick={() => setAddFundsAmount('1000')}
                      className="bg-transparent border border-[#D4AF37]/30 text-xs"
                    >
                      ₹1000
                    </ShimmerButton>
                    <ShimmerButton
                      onClick={() => setAddFundsAmount('2000')}
                      className="bg-transparent border border-[#D4AF37]/30 text-xs"
                    >
                      ₹2000
                    </ShimmerButton>
                  </div>
                  
                  <ShimmerButton
                    onClick={() => handleAddFunds(parseInt(addFundsAmount) || 0)}
                    className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1625]"
                    disabled={!addFundsAmount || parseInt(addFundsAmount) <= 0}
                  >
                    Add ₹{addFundsAmount || 0} to Wallet
                  </ShimmerButton>
                </div>
              </CardContent>
            </Card>
              </>
            )}
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#312A41]">
                <TabsTrigger value="events" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1625]">
                  Events
                </TabsTrigger>
                <TabsTrigger value="wallet" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1625]">
                  Wallet
                </TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="mt-6">
                <Card className="bg-[#312A41] border-[#D4AF37]/20">
                  <CardHeader>
                    <CardTitle className="text-white">Event Registrations</CardTitle>
                    <CardDescription className="text-gray-400">
                      Track your registered and participated events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {registrations.length === 0 ? (
                        <p className="text-gray-400">No event registrations yet.</p>
                      ) : (
                        registrations.map((event) => (
                          <div
                            key={event.eventId}
                            className="p-4 bg-[#1A1625] rounded-lg border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-white font-semibold text-lg">{event.eventName}</h3>
                                <p className="text-gray-400 text-sm">Registered on {event.registrationDate}</p>
                              </div>
                              <Badge
                                className={
                                  event.status === 'participated'
                                    ? 'bg-green-500'
                                    : event.status === 'registered'
                                    ? 'bg-blue-500'
                                    : 'bg-red-500'
                                }
                              >
                                {event.status}
                              </Badge>
                            </div>
                            {event.paymentAmount && (
                              <p className="text-[#D4AF37] font-semibold">₹{event.paymentAmount}</p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wallet" className="mt-6">
                <Card className="bg-[#312A41] border-[#D4AF37]/20">
                  <CardHeader>
                    <CardTitle className="text-white">Transaction History</CardTitle>
                    <CardDescription className="text-gray-400">
                      View all your wallet transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {!wallet || wallet.transactions.length === 0 ? (
                        <p className="text-gray-400">No transactions yet.</p>
                      ) : (
                        wallet.transactions.map((txn) => (
                          <div
                            key={txn.id}
                            className="p-4 bg-[#1A1625] rounded-lg border border-[#D4AF37]/10 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  txn.type === 'credit' ? 'bg-green-500/20' : 'bg-red-500/20'
                                }`}
                              >
                                {txn.type === 'credit' ? '↓' : '↑'}
                              </div>
                              <div>
                                <p className="text-white font-medium">{txn.description}</p>
                                <p className="text-gray-400 text-sm">{txn.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p
                                className={`font-bold ${
                                  txn.type === 'credit' ? 'text-green-500' : 'text-red-500'
                                }`}
                              >
                                {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                              </p>
                              <Badge variant="outline" className="mt-1 text-xs border-[#D4AF37]/30">
                                {txn.status}
                              </Badge>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
