import { FC, useEffect, useState } from 'react';
import { useUser } from '@/store/user.ts';
import { Item } from '@/types/api.type.ts';
import { Api } from '@/lib/api.ts';
import { ItemGrid } from '@/components/ItemGrid';

const BasketPage: FC = () => {
  const user = useUser((select) => select.current!);
  const [basket, setBasket] = useState<Item[]>([]);

  useEffect(() => {
    Api.instance.basket().then(setBasket);
  }, []);

  return (
    <section>
      <h1 className={'text-xl font-semibold tracking-tight'}>
        Ваша корзина, {user.email}
      </h1>
      <hr className={'mt-4'} />
      <ItemGrid items={basket} />
    </section>
  );
};

export default BasketPage;
