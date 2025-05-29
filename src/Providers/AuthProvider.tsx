'use client';
import React, { createContext, useContext } from 'react';
import { useAppSelector } from '../store/hooks';

interface AuthContextType {
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.user);
  const loading = !user.id; // consider user loaded if id exists

  return (
    <AuthContext.Provider value={{ loading }}>
      {children}
    </AuthContext.Provider>
  );
};
