import { FC } from 'react';
import IconLogin from '@/assets/login.svg';
import IconCoffee from '@/assets/coffee.svg';

import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';

export const Header: FC = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <header className={'p-4 flex justify-between border-b mb-4'}>
      <Link
        to={'/'}
        className={
          'text-2xl font-semibold tracking-tight flex gap-2 items-center'
        }
      >
        <img src={IconCoffee} width={36} alt={'Коффе'} />
        <span>Кофе-Магия</span>
      </Link>
      {!isLogin && (
        <Link to={'/login'} className={'text-2xl font-semibold tracking-tight'}>
          <Button className={'flex gap-1 items-center'}>
            <img src={IconLogin} width={20} alt={'авторизация'} />
            <span>Авторизация</span>
          </Button>
        </Link>
      )}
    </header>
  );
};
