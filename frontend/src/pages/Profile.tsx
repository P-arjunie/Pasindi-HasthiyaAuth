import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const auth = useContext(AuthContext)!;
  const navigate = useNavigate();
  
  if (!auth.user) return (
    <div className="container flex items-center justify-center py-16 min-h-[calc(100vh-80px)]">
      <div className="bg-white/95 rounded-2xl p-8 text-center border border-yellow-400/30">
        <p className="text-gray-800 text-lg">Profile not found</p>
      </div>
    </div>
  );

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  const joinDate = new Date(auth.user.created_at || '').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container flex items-center justify-center py-16 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg border border-purple-200 overflow-hidden animate-fadeIn">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-12 text-center border-b border-purple-400">
            <div className="text-6xl mb-4">🐘</div>
            <h2 className="text-3xl font-bold text-white mb-2">My Profile</h2>
            <p className="text-blue-100 text-sm">Welcome, <span className="text-white font-semibold">{auth.user.full_name}</span></p>
          </div>
          <div className="px-8 py-10">
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-l-4 border-purple-500 px-6 py-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 transform hover:scale-102">
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Full Name</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{auth.user.full_name}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-l-4 border-purple-500 px-6 py-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 transform hover:scale-102">
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Email Address</p>
                <p className="text-lg font-mono text-gray-900 mt-1 break-all">{auth.user.email}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-l-4 border-purple-500 px-6 py-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 transform hover:scale-102">
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Member Since</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{joinDate}</p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t-2 border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2"
              >
                <span>🚪</span>
                Sign Out
              </button>
            </div>

            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
              <p className="text-sm text-gray-700">
                Welcome to <span className="font-bold text-purple-600">Hasthiya IT</span>! You're now a verified member.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
