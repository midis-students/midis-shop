import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@/pages/layout/header.tsx';
import { Footer } from '@/pages/layout/footer.tsx';
import { popouts, PopoutsKeys } from '@/pages/popouts';

export const Layout: FC = () => {
  const location = useLocation();

  const Popout = popouts[location.state?.popout as PopoutsKeys] ?? null;

  return (
    <>
      <Header />
      <main className={'p-4 max-w-screen-2xl w-full ml-auto mr-auto'}>
        <Outlet />
      </main>
      <Footer />
      {Popout && <Popout data={location.state.data} />}
    </>
  );
};
