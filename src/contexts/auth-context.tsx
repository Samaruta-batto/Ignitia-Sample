
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

const initialUser: User = {
  id: 'dev-user-1',
  name: 'Dev User',
  email: 'dev@ignitia.in',
  phone: '+91 98765 43210',
  college: 'IGNITIA Institute of Technology',
  year: 'Final Year',
  role: 'ATTENDEE',
  profilePhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DevUser',
  walletBalance: 2500,
  registeredEvents: ['event-1', 'event-3'],
  participatedEvents: ['event-1'],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('user');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock login. In a real app, you'd verify credentials.
    const isAdmin = email.toLowerCase() === 'admin@ignitia.in' && password === 'password';
    
    if (!isAdmin) {
      // For now, only the admin login is mocked for the /login page
      throw new Error("Invalid credentials");
    }
    
    const mockUser: User = {
      id: 'admin-1',
      name: 'Admin User',
      email: email,
      phone: '+1 234 567 8900',
      college: 'IGNITIA',
      year: 'Admin',
      role: 'ADMIN',
      profilePhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
      walletBalance: 5000,
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
