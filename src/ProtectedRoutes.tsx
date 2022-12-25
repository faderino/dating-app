import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from './hooks/store';
import { useGetUserQuery } from './services/auth';
import { selectAuthState } from './store/auth/authSlice';

type Props = {
  allowedRole: number;
};

const ProtectedRoutes: React.FC<Props> = ({ allowedRole }) => {
  const location = useLocation();
  const { isAuthenticated, token } = useAppSelector(selectAuthState);
  const { data: user, isLoading } = useGetUserQuery();

  if (!isAuthenticated || !token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  if (!isLoading && user?.data.role_id !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return isLoading ? null : <Outlet />;
};

export default ProtectedRoutes;
