import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <nav className="bg-white border-b-2 border-purple-200 shadow-lg">
        <div className="container flex items-center gap-8 py-4">
          <Link to="/" className="font-bold text-2xl text-purple-700 hover:text-purple-900 transition">🐘 Hasthiya Auth Portal</Link>
          <Link to="/register" className="text-purple-600 hover:text-purple-800 transition font-semibold">Register</Link>
          <Link to="/login" className="text-purple-600 hover:text-purple-800 transition font-semibold">Login</Link>
          <Link to="/profile" className="text-purple-600 hover:text-purple-800 transition font-semibold">My Profile</Link>
        </div>
      </nav>

      <main className="min-h-[calc(100vh-80px)]">
        <Routes>
          <Route path="/" element={<div className="container py-20"><div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-16 text-center"><h1 className="text-5xl font-bold text-purple-700 mb-4">Hasthiya</h1><p className="text-purple-700 text-xl">Elegant & Secure Authentication</p></div></div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

