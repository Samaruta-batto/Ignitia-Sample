
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Users,
  BarChart3,
  Github,
  Linkedin,
  Settings,
  MessageSquare
} from 'lucide-react';
import { mockWalletTransactions, mockEventRegistrations, mockMerchOrders } from '@/lib/mock-profile-data';
import Loading from '../loading';
import type { User as AuthUser } from '@/contexts/auth-context';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout, switchRole } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<AuthUser | null>(user);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/user-login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  if (isLoading || !isAuthenticated || !user) {
    return <Loading />;
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-500';
      case 'ORGANIZER':
        return 'bg-purple-500';
      case 'DEV_TEAM':
        return 'bg-blue-500';
      default:
        return 'bg-green-500';
    }
  };

  const handleSaveProfile = () => {
    // In a real app, you'd call an API to save the user data
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#1A1625] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-400">Manage your account and preferences</p>
          </div>
          
          <div className="flex gap-3">
            <select
              value={user.role}
              onChange={(e) => switchRole(e.target.value as any)}
              className="px-4 py-2 bg-[#312A41] text-white rounded-lg border border-[#D4AF37]/20"
            >
              <option value="ATTENDEE">Attendee</option>
              <option value="ORGANIZER">Organizer</option>
              <option value="ADMIN">Admin</option>
              <option value="DEV_TEAM">Dev Team</option>
            </select>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-[#D4AF37]/30 hover:bg-[#D4AF37]/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
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
                    <AvatarImage src={user.profilePhoto} alt={user.name} />
                    <AvatarFallback className="text-3xl bg-[#D4AF37] text-[#1A1625]">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                  <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                    {user.role.replace('_', ' ')}
                  </Badge>
                </div>

                {isEditing && user.role === 'ATTENDEE' ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Name</Label>
                      <Input
                        value={editedUser?.name || ''}
                        onChange={(e) => setEditedUser({ ...editedUser!, name: e.target.value })}
                        className="bg-[#1A1625] border-[#D4AF37]/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Email</Label>
                      <Input
                        value={editedUser?.email || ''}
                        onChange={(e) => setEditedUser({ ...editedUser!, email: e.target.value })}
                        className="bg-[#1A1625] border-[#D4AF37]/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Phone</Label>
                      <Input
                        value={editedUser?.phone || ''}
                        onChange={(e) => setEditedUser({ ...editedUser!, phone: e.target.value })}
                        className="bg-[#1A1625] border-[#D4AF37]/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">College</Label>
                      <Input
                        value={editedUser?.college || ''}
                        onChange={(e) => setEditedUser({ ...editedUser!, college: e.target.value })}
                        className="bg-[#1A1625] border-[#D4AF37]/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Year</Label>
                      <Input
                        value={editedUser?.year || ''}
                        onChange={(e) => setEditedUser({ ...editedUser!, year: e.target.value })}
                        className="bg-[#1A1625] border-[#D4AF37]/20 text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="flex-1 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1625]">
                        Save
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1 border-[#D4AF37]/30">
                        Cancel
                      </Button>
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
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <span className="text-[#D4AF37]">🎓</span>
                      <span>{user.college}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <span>{user.year}</span>
                    </div>
                    
                    {user.role === 'ATTENDEE' && (
                      <Button 
                        onClick={() => setIsEditing(true)}
                        className="w-full mt-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1625]"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
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
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">
                  ₹{user.walletBalance.toLocaleString()}
                </div>
                <p className="text-gray-400 text-sm mb-4">Available balance</p>
                <Button className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1625]">
                  Add Money
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-[#312A41]">
                <TabsTrigger value="events" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1625]">
                  Events
                </TabsTrigger>
                <TabsTrigger value="wallet" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1625]">
                  Wallet
                </TabsTrigger>
                <TabsTrigger value="merch" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1625]">
                  Merch
                </TabsTrigger>
                <TabsTrigger value="role" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1625]">
                  {user.role === 'ORGANIZER' ? 'My Events' : user.role === 'ADMIN' ? 'Admin' : user.role === 'DEV_TEAM' ? 'Stats' : 'More'}
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

              <TabsContent value="role" className="mt-6">
                {user.role === 'ORGANIZER' && (
                  <Card className="bg-[#312A41] border-[#D4AF37]/20">
                    <CardHeader>
                      <CardTitle className="text-white">My Events</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage events you've created
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {user.createdEvents?.map((eventId) => (
                          <div
                            key={eventId}
                            className="p-4 bg-[#1A1625] rounded-lg border border-[#D4AF37]/10"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-white font-semibold">Event {eventId}</h3>
                                <p className="text-gray-400 text-sm">45 participants registered</p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1625]">
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  Message
                                </Button>
                                <Button size="sm" variant="outline" className="border-[#D4AF37]/30">
                                  <BarChart3 className="w-4 h-4 mr-1" />
                                  Stats
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {user.role === 'ADMIN' && (
                  <Card className="bg-[#312A41] border-[#D4AF37]/20">
                    <CardHeader>
                      <CardTitle className="text-white">Admin Tools</CardTitle>
                      <CardDescription className="text-gray-400">
                        Access administrative features
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1625] justify-start">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Button>
                        <Button className="w-full bg-[#1A1625] hover:bg-[#1A1625]/80 text-white justify-start">
                          <Users className="w-4 h-4 mr-2" />
                          User Management
                        </Button>
                        <Button className="w-full bg-[#1A1625] hover:bg-[#1A1625]/80 text-white justify-start">
                          <Settings className="w-4 h-4 mr-2" />
                          System Settings
                        </Button>
                        <Button className="w-full bg-[#1A1625] hover:bg-[#1A1625]/80 text-white justify-start">
                          <Wallet className="w-4 h-4 mr-2" />
                          Wallet Adjustments
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {user.role === 'DEV_TEAM' && (
                  <Card className="bg-[#312A41] border-[#D4AF37]/20">
                    <CardHeader>
                      <CardTitle className="text-white">Contribution Stats</CardTitle>
                      <CardDescription className="text-gray-400">
                        Your development contributions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-[#1A1625] rounded-lg">
                          <p className="text-3xl font-bold text-[#D4AF37]">{user.contributionStats?.commits}</p>
                          <p className="text-gray-400 text-sm mt-1">Commits</p>
                        </div>
                        <div className="text-center p-4 bg-[#1A1625] rounded-lg">
                          <p className="text-3xl font-bold text-[#D4AF37]">{user.contributionStats?.pullRequests}</p>
                          <p className="text-gray-400 text-sm mt-1">PRs</p>
                        </div>
                        <div className="text-center p-4 bg-[#1A1625] rounded-lg">
                          <p className="text-3xl font-bold text-[#D4AF37]">{user.contributionStats?.issues}</p>
                          <p className="text-gray-400 text-sm mt-1">Issues</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        {user.githubUrl && (
                          <Button asChild className="flex-1 bg-[#1A1625] hover:bg-[#1A1625]/80 text-white">
                            <a href={user.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {user.linkedinUrl && (
                          <Button asChild className="flex-1 bg-[#0077B5] hover:bg-[#0077B5]/90 text-white">
                            <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="w-4 h-4 mr-2" />
                              LinkedIn
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {user.role === 'ATTENDEE' && (
                  <Card className="bg-[#312A41] border-[#D4AF37]/20">
                    <CardHeader>
                      <CardTitle className="text-white">Achievements</CardTitle>
                      <CardDescription className="text-gray-400">
                        Your fest milestones
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-[#1A1625] rounded-lg">
                          <Trophy className="w-8 h-8 text-[#D4AF37]" />
                          <div>
                            <p className="text-white font-semibold">Early Bird</p>
                            <p className="text-gray-400 text-sm">Registered for 3+ events</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-[#1A1625] rounded-lg">
                          <Trophy className="w-8 h-8 text-gray-500" />
                          <div>
                            <p className="text-white font-semibold">Super Fan</p>
                            <p className="text-gray-400 text-sm">Participate in 5 events (3/5)</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
