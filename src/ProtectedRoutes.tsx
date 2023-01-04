import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from './hooks/store';
import { useGetUserQuery } from './services/auth.service';
import { useGetProfileQuery } from './services/profile.service';
import { selectAuthState } from './store/auth/authSlice';
import { RoleID } from './types/user';

type AuthorizeRoleProps = {
  allowedRole: number;
};

export const AuthorizeRoleRoute: React.FC<AuthorizeRoleProps> = ({
  allowedRole,
}) => {
  const location = useLocation();
  const { user, isAuthenticated, token } = useAppSelector(selectAuthState);
  useGetUserQuery();
  useGetProfileQuery();

  if (!isAuthenticated || !token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (user && user.role_id !== allowedRole) {
    if (user.role_id === RoleID.Admin) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const GuardAuthPage: React.FC = () => {
  const { user, isAuthenticated, token } = useAppSelector(selectAuthState);

  if (isAuthenticated || token) {
    if (user && user.role_id === RoleID.Admin) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/app" replace />;
  }
  return <Outlet />;
};
