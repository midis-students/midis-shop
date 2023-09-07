import { FC } from 'react';
import { ShopItem } from '@/components/Item';

const items = Array.from({ length: 10 });

const MainPage: FC = () => {
  return (
    <section className={'grid grid-cols-6 gap-4'}>
      {items.map((_, i) => (
        <ShopItem key={i} />
      ))}
    </section>
  );
};

export default MainPage;
