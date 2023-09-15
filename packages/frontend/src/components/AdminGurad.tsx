import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useIsAdmin } from '@/store/user.ts';

export const AdminGuard: FC = () => {
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return <Navigate to={'/'} />;
  }

  return <Outlet />;
};
