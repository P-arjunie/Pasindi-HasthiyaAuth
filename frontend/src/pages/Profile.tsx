import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const auth = useContext(AuthContext)!;
  if (!auth.user) return <div className="container"><div className="card">Not found</div></div>;
  return (
    <div className="container">
      <div className="card">
        <h2 className="text-xl font-bold mb-4">My Profile</h2>
        <p><strong>Name:</strong> {auth.user.full_name}</p>
        <p><strong>Email:</strong> {auth.user.email}</p>
        <p><strong>Joined:</strong> {auth.user.created_at}</p>
        <div className="mt-4">
          <button onClick={auth.logout} className="px-4 py-2 bg-red-600 text-white rounded">Logout</button>
        </div>
      </div>
    </div>
  );
}
