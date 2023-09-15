import { FC } from 'react';
import IconLogin from '@/assets/login.svg';
import IconLogout from '@/assets/logout.svg';
import IconCoffee from '@/assets/coffee.svg';
import IconBasket from '@/assets/basket.svg';

import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { useIsAuth } from '@/store/auth.ts';
import { logout } from '@/lib/api.ts';
import { useIsAdmin } from '@/store/user.ts';
import { useBasket } from '@/store/basket';

export const Header: FC = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isAuth = useIsAuth();
  const isAdmin = useIsAdmin();
  const items = useBasket((select) => select.items.length);

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
      <div className={'flex gap-2'}>
        {isAuth ? (
          <>
            {isAdmin && (
              <Link to={'/admin'}>
                <Button className={'flex gap-1 items-center accent-red-400'}>
                  <img src={IconBasket} width={20} alt={'авторизация'} />
                  <span>Админка</span>
                </Button>
              </Link>
            )}
            <Link to={'/basket'}>
              <Button className={'flex gap-1 items-center'}>
                <img src={IconBasket} width={20} alt={'авторизация'} />
                <span>Корзина {items ? <span>{items}</span> : ''}</span>
              </Button>
            </Link>
            <Button className={'flex gap-1 items-center'} onClick={logout}>
              <img src={IconLogout} width={20} alt={'авторизация'} />
              <span>Выйти</span>
            </Button>
          </>
        ) : (
          !isLogin && (
            <Link
              to={'/login'}
              className={'text-2xl font-semibold tracking-tight'}
            >
              <Button className={'flex gap-1 items-center'}>
                <img src={IconLogin} width={20} alt={'авторизация'} />
                <span>Авторизация</span>
              </Button>
            </Link>
          )
        )}
      </div>
    </header>
  );
};
