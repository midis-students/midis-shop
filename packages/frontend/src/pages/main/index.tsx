import { FC } from 'react';

import { Item } from '@/types/api.type.ts';
import { ItemGrid } from '@/components/ItemGrid';

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
  return <ItemGrid items={items} />;
};

export default MainPage;
