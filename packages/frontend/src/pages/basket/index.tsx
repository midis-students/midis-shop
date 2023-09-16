import { FC, useEffect } from 'react';
import { useUser } from '@/store/user.ts';
import { Api } from '@/lib/api.ts';
import { ItemGrid } from '@/components/ItemGrid';
import { useBasket } from '@/store/basket';

const BasketPage: FC = () => {
  const user = useUser((select) => select.current!);
  const { items, set } = useBasket();

  useEffect(() => {
    Api.instance.basket().then(set);
  }, []);

  return (
    <section>
      <h1 className={'text-xl font-semibold tracking-tight'}>
        Ваша корзина, {user.email}
      </h1>
      <hr className={'mt-4'} />
      <ItemGrid
        items={items.map(({ item }) => ({ deletable: true, ...item }))}
      />
    </section>
  );
};

export default BasketPage;
