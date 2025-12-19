import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

type User = { id: number; full_name: string; email: string; created_at?: string } | null;

type AuthContextType = {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { full_name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }>= ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.get('/api/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUser(res.data))
        .catch(() => { setUser(null); setToken(null); localStorage.removeItem('token'); });
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  async function login(email: string, password: string) {
    const res = await axios.post('/api/auth/login', { email, password });
    setToken(res.data.token);
  }

  async function register(data: { full_name: string; email: string; password: string }) {
    await axios.post('/api/auth/register', data);
  }

  function logout() { setToken(null); setUser(null); }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
