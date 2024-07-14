// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { loggedIn } from '../PocketbaseConfig';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!loggedIn()) {
    return <Navigate to="/auth" />;
  }
  return children;
};

export default ProtectedRoute;
