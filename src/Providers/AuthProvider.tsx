'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

interface User {
  id: string;
  email: string;
  name?: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<number>;
  signInWithGoogle: (credential: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter()
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await axios.post('http://localhost:5000/api/users/auth/login', { email, password });
    console.log(res)
    setUser(res.data.user);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    router.push('/dashboard');
  };

  const signUp = async (name: string, email: string, password: string):Promise<number> => {
    const res = await axios.post('http://localhost:5000/api/users/auth/register', { name, email, password });
    return res.status;
  };

  const signInWithGoogle = async (credential: string) => {
    const res = await axios.post('http://localhost:5000/api/users/auth/google', { token: credential });
    setUser(res.data.user);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    router.push('/dashboard');
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };
  useEffect(() => {
    try{
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }
  catch(err){}
  }, []);


  return (
    
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, signInWithGoogle }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
