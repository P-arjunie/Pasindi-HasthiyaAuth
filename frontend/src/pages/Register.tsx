import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const auth = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await auth.register(form);
      await auth.login(form.email, form.password);
      navigate('/profile');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input required className="w-full p-2 border" placeholder="Full name" value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})} />
          <input required className="w-full p-2 border" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          <input required className="w-full p-2 border" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
          <div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">Create account</button>
          </div>
        </form>
      </div>
    </div>
  );
}
