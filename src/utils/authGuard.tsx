import type { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import type { UserRole } from '../types/common';
import { selectCurrentUser } from '../features/auth/authSlice';

interface AuthGuardProps {
  children: ReactElement;
  roles?: UserRole | UserRole[];
  redirectTo?: string;
}

export const AuthGuard = ({ children, roles, redirectTo = '/login' }: AuthGuardProps) => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (roles) {
    const roleList = Array.isArray(roles) ? roles : [roles];
    if (!roleList.includes(user.role)) {
      const fallback = user.role === 'admin' ? '/admin/dashboard' : user.role === 'staff' ? '/staff/bookings' : '/';
      return <Navigate to={fallback} replace />;
    }
  }

  return children;
};

