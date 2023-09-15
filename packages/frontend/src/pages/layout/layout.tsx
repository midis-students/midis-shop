import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@/pages/layout/header.tsx';
import { Footer } from '@/pages/layout/footer.tsx';
import { UserPopout } from '@/pages/popouts/users.tsx';

const popouts = {
  user: UserPopout,
};

export const Layout: FC = () => {
  const location = useLocation();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  ///@ts-ignore
  const Popout = popouts[location.state?.popout] ?? null;

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
