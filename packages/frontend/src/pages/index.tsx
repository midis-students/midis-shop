import { FC, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Layout } from './layout/layout.tsx';
import { Loadable } from '@/components/Loadable.tsx';

const MainPage = Loadable(lazy(() => import('./main')));
const LoginPage = Loadable(lazy(() => import('./login')));

export const Pages: FC = () => {
  return useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
      ],
    },
  ]);
};
