import { FC } from 'react';
import { ShopItem } from '@/components/Item';

import Style from './style.module.css';
import { cn } from '@/lib/utils.ts';

const items = Array.from({ length: 100 });

const MainPage: FC = () => {
  return (
    <section className={cn('grid gap-4', Style['shop-grid'])}>
      {items.map((_, i) => (
        <ShopItem key={i} />
      ))}
    </section>
  );
};

export default MainPage;
