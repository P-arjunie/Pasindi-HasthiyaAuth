import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div>
      <nav className="p-4 bg-gray-100">
        <div className="container flex gap-4">
          <Link to="/" className="font-semibold">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/profile">My Profile</Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<div className="container"><div className="card">Welcome to Hasthiya Auth demo</div></div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

