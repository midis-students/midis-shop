import { FC, PropsWithChildren } from 'react';
import { useIsAuth } from '@/store/auth.ts';
import { Navigate } from 'react-router-dom';

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const isAuth = useIsAuth();

  if (!isAuth) {
    return <Navigate to={'/login'} />;
  }

  return children;
};
