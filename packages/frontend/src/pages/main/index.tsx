import { FC } from 'react';
import { ShopItem } from '@/components/Item';

import Style from './style.module.css';
import { cn } from '@/lib/utils.ts';
import { Item } from '@/types/api.type.ts';

const images = [
  '/coffee/chai latte.png',
  '/coffee/espresso.png',
  '/coffee/mocha.png',
  '/coffee/turkish coffee.png',
];

const items = Array.from({ length: 100 }).map<Item>((_, id) => ({
  image: images[~~(Math.random() * images.length)],
  name: 'Чай',
  description: 'горячий чай',
  price: Math.random() * 1_000,
  id,
}));

const MainPage: FC = () => {
  return (
    <section className={cn('grid gap-4', Style['shop-grid'])}>
      {items.map((item) => (
        <ShopItem key={item.id} item={item} />
      ))}
    </section>
  );
};

export default MainPage;
