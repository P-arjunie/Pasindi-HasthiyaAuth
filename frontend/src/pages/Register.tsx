import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

type AuthContextType = {
  register: (form: { full_name: string; email: string; password: string }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
};

export default function Register() {
  const auth = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 10) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setForm({ ...form, password: pwd });
    checkPasswordStrength(pwd);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.register(form);
      await auth.login(form.email, form.password);
      navigate('/profile');
    } catch (err: unknown) {
      let message = 'Registration failed';
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === 'object' && err !== null && 'response' in err) {
        const maybe = err as { response?: { data?: { error?: string } } };
        if (maybe.response?.data?.error) message = maybe.response.data.error;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-orange-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (form.password.length === 0) return '';
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="container flex items-center justify-center py-16 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-purple-200 overflow-hidden animate-fadeIn">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-12 text-center border-b border-purple-400">
            <div className="text-5xl mb-3">🐘</div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-white text-sm">Join our community</p>
          </div>
          <div className="px-8 py-10">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-4 rounded-lg mb-6 text-sm animate-slideDown">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-sm">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400">👤</span>
                  <input
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 bg-white"
                    placeholder="Your full name"
                    value={form.full_name}
                    onChange={e => setForm({ ...form, full_name: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-sm">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400">✉️</span>
                  <input
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 bg-white"
                    placeholder="your@email.com"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-800 font-semibold text-sm">Password</label>
                  {form.password && (
                    <span className={`text-xs font-semibold ${getStrengthColor() === 'bg-red-500' ? 'text-red-600' : getStrengthColor() === 'bg-orange-500' ? 'text-orange-600' : getStrengthColor() === 'bg-yellow-500' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {getStrengthText()}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400">🔐</span>
                  <input
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 bg-white"
                    placeholder="At least 6 characters"
                    type="password"
                    value={form.password}
                    onChange={handlePasswordChange}
                  />
                </div>
                {form.password && (
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${getStrengthColor()} transition-all duration-300`} style={{ width: `${(passwordStrength / 5) * 100}%` }}></div>
                  </div>
                )}
              </div>
              <button
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 active:scale-95 shadow-md mt-8 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
            <p className="text-center text-gray-700 mt-6 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-purple-600 hover:text-purple-700 transition duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
