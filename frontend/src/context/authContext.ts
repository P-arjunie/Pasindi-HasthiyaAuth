import { createContext } from 'react';

export type User = { 
  id: number; 
  full_name: string; 
  email: string; 
  created_at?: string 
} | null;

export type AuthContextType = {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { full_name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
