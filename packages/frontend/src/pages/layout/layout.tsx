import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/pages/layout/header.tsx';
import { Footer } from '@/pages/layout/footer.tsx';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <main className={'h-full p-4 max-w-screen-xl ml-auto mr-auto'}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
