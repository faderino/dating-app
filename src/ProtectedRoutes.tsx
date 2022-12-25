import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from './hooks/store';
import { selectAuthState } from './store/auth/authSlice';

const ProtectedRoutes: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, token } = useAppSelector(selectAuthState);

  if (!isAuthenticated || !token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
