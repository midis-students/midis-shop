import { FC } from 'react';
import { Item } from '@/types/api.type.ts';
import { cn } from '@/lib/utils.ts';
import Style from './style.module.css';
import { ShopItem } from '@/components/Item';

type ItemGridProps = {
  items: Item[];
};

export const ItemGrid: FC<ItemGridProps> = ({ items }) => {
  return (
    <section className={cn('grid gap-4', Style['shop-grid'])}>
      {items.map((item) => (
        <ShopItem key={item.id} item={item} />
      ))}
    </section>
  );
};
