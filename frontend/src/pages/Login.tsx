import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export default function Login() {
  const auth = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.login(email, password);
      navigate('/profile');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container flex items-center justify-center py-16 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-purple-200 overflow-hidden animate-fadeIn">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-12 text-center border-b border-purple-400">
            <div className="text-5xl mb-3">🐘</div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-blue-100 text-sm">Sign in to your account</p>
          </div>
          <div className="px-8 py-10">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-4 rounded-lg mb-6 text-sm animate-slideDown">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-sm">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400">✉️</span>
                  <input
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 bg-white"
                    placeholder="your@email.com"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-sm">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400">🔐</span>
                  <input
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 bg-white"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 active:scale-95 shadow-md mt-8 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            <p className="text-center text-gray-700 mt-6 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-purple-600 hover:text-purple-700 transition duration-200">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
