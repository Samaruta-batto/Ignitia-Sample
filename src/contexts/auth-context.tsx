'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'ATTENDEE' | 'ORGANIZER' | 'ADMIN' | 'DEV_TEAM';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  role: UserRole;
  profilePhoto: string;
  walletBalance: number;
  registeredEvents: string[];
  participatedEvents: string[];
  createdEvents?: string[];
  contributionStats?: {
    commits: number;
    pullRequests: number;
    issues: number;
  };
  githubUrl?: string;
  linkedinUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      phone: '+1 234 567 8900',
      college: 'MIT',
      year: '3rd Year',
      role: 'ATTENDEE',
      profilePhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      walletBalance: 1500,
      registeredEvents: ['event-1', 'event-2', 'event-3'],
      participatedEvents: ['event-1'],
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;

    let updatedUser = { ...user, role };

    if (role === 'ORGANIZER') {
      updatedUser.createdEvents = ['event-1', 'event-4'];
    } else if (role === 'DEV_TEAM') {
      updatedUser.contributionStats = {
        commits: 142,
        pullRequests: 28,
        issues: 15,
      };
      updatedUser.githubUrl = 'https://github.com/johndoe';
      updatedUser.linkedinUrl = 'https://linkedin.com/in/johndoe';
    } else if (role === 'ATTENDEE') {
      delete updatedUser.createdEvents;
      delete updatedUser.contributionStats;
      delete updatedUser.githubUrl;
      delete updatedUser.linkedinUrl;
    } else if (role === 'ADMIN') {
      delete updatedUser.createdEvents;
      delete updatedUser.contributionStats;
      delete updatedUser.githubUrl;
      delete updatedUser.linkedinUrl;
    }

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
