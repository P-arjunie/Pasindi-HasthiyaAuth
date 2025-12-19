import React, { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) return <Navigate to="/login" replace />;
  if (!ctx.token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
