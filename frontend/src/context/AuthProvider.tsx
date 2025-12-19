import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext, type User } from './authContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
