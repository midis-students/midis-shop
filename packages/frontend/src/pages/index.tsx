import { FC, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Layout } from './layout/layout.tsx';
import { Loadable } from '@/components/Loadable.tsx';
import { NotFound } from '@/pages/errors/404.tsx';
import { AuthGuard } from '@/components/AuthGurad.tsx';

const MainPage = Loadable(lazy(() => import('./main')));
const LoginPage = Loadable(lazy(() => import('./login')));
const BasketPage = Loadable(lazy(() => import('./basket')));

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
        {
          path: '/basket',
          element: (
            <AuthGuard>
              <BasketPage />
            </AuthGuard>
          ),
        },
        {
          element: <NotFound />,
          path: '*',
        },
      ],
    },
  ]);
};
