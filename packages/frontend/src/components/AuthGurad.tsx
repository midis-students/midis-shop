import { FC } from 'react';
import { useIsAuth } from '@/store/auth.ts';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard: FC = () => {
  const isAuth = useIsAuth();

  if (!isAuth) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};
