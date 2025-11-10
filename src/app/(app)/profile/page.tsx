
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Wallet, 
  Calendar, 
  Edit, 
  LogOut, 
  ShoppingBag,
  Trophy,
} from 'lucide-react';
import { mockWalletTransactions, mockEventRegistrations, mockMerchOrders } from '@/lib/mock-profile-data';
import Loading from '../loading';
import { useAuth, useUser } from '@/firebase';
import { signOut, type User as AuthUser } from 'firebase/auth';


export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<AuthUser | null>(user);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/user-login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  if (isUserLoading || !user) {
    return <Loading />;
  }


  const handleSaveProfile = () => {
    // In a real app, you'd call an API to save the user data
    setIsEditing(false);
  };

  const handleLogout = () => {
    if(auth) {
      signOut(auth);
    }
    router.push('/');
  };
  
  const userInitial = (user.displayName || user.email)?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-400">Manage your account and preferences</p>
          </div>
          
          <div className="flex gap-3">
            <ShimmerButton 
              onClick={handleLogout}
              variant="outline"
              className="border-[#D4AF37]/30 hover:bg-[#D4AF37]/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </ShimmerButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-[#312A41] border-[#D4AF37]/20">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="w-32 h-32 mb-4 border-4 border-[#D4AF37]">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                    <AvatarFallback className="text-3xl bg-[#D4AF37] text-[#1A1625]">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-white mb-1">{user.displayName || 'User'}</h2>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Name</Label>
                      <Input
                        value={editedUser?.displayName || ''}
                        onChange={(e) => setEditedUser({ ...editedUser!, displayName: e.target.value, reload: async () => {} })}
                        className="bg-[#1A1625] border-[#D4AF37]/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Email</Label>
                      <Input
                        value={editedUser?.email || ''}
                        onChange={(e) => setEditedUser({ ...editedUser!, email: e.target.value, reload: async () => {} })}
                        className="bg-[#1A1625] border-[#D4AF37]/20 text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <ShimmerButton onClick={handleSaveProfile} className="flex-1 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1625]">
                        Save
                      </ShimmerButton>
                      <ShimmerButton onClick={() => setIsEditing(false)} variant="outline" className="flex-1 border-[#D4AF37]/30">
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
                    <div className="flex items-center gap-3 text-gray-300">
                      <span className="text-[#D4AF37]">📞</span>
                      <span>{user.phoneNumber || 'Not provided'}</span>
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
                  ₹{/* Placeholder balance */ '1,234'}
                </div>
                <p className="text-gray-400 text-sm mb-4">Available balance</p>
                <ShimmerButton className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1625]">
                  Add Money
                </ShimmerButton>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#312A41]">
                <TabsTrigger value="events" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1625]">
                  Events
                </TabsTrigger>
                <TabsTrigger value="wallet" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1625]">
                  Wallet
                </TabsTrigger>
                <TabsTrigger value="merch" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1625]">
                  Merch
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
                      {mockEventRegistrations.map((event) => (
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
                      ))}
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
                      {mockWalletTransactions.map((txn) => (
                        <div
                          key={txn.id}
                          className="p-4 bg-[#1A1625] rounded-lg border border-[#D4AF37]/10 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              txn.type === 'credit' ? 'bg-green-500/20' : 'bg-red-500/20'
                            }`}>
                              {txn.type === 'credit' ? '↓' : '↑'}
                            </div>
                            <div>
                              <p className="text-white font-medium">{txn.description}</p>
                              <p className="text-gray-400 text-sm">{txn.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${txn.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                              {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                            </p>
                            <Badge variant="outline" className="mt-1 text-xs border-[#D4AF37]/30">
                              {txn.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="merch" className="mt-6">
                <Card className="bg-[#312A41] border-[#D4AF37]/20">
                  <CardHeader>
                    <CardTitle className="text-white">Merchandise Orders</CardTitle>
                    <CardDescription className="text-gray-400">
                      Track your merchandise purchases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockMerchOrders.map((order) => (
                        <div
                          key={order.id}
                          className="p-4 bg-[#1A1625] rounded-lg border border-[#D4AF37]/10"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                              <div>
                                <h3 className="text-white font-semibold">{order.itemName}</h3>
                                <p className="text-gray-400 text-sm">Quantity: {order.quantity} • {order.date}</p>
                              </div>
                            </div>
                            <Badge 
                              className={
                                order.status === 'delivered' 
                                  ? 'bg-green-500' 
                                  : 'bg-yellow-500'
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-[#D4AF37] font-semibold">₹{order.amount}</p>
                        </div>
                      ))}
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
