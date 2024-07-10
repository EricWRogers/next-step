// ProtectedRoute.tsx
import { User } from 'firebase/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }: { user: User | null, children: JSX.Element }) => {
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
};

export default ProtectedRoute;
