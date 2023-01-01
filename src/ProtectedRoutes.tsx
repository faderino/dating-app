import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from './hooks/store';
import { useGetProfileQuery } from './services/profile.service';
import { selectAuthState } from './store/auth/authSlice';

type Props = {
  allowedRole: number;
};

export const AuthorizeUserRoute: React.FC<Props> = () => {
  const location = useLocation();
  const { isAuthenticated, token } = useAppSelector(selectAuthState);
  useGetProfileQuery();

  if (!isAuthenticated || !token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // if (user?.role_id !== allowedRole) {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};
