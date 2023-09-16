import { FC } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Item } from '@/types/api.type.ts';
import { useBasket } from '@/store/basket';
import { Api } from '@/lib/api';

export const ShopItem: FC<{ item: Item }> = ({ item }) => {
  const { addItem, removeItem } = useBasket();

  const onClick = async () => {
    if (item.deletable) {
      removeItem(item);
      await Api.instance.basketRemoveItem(item.id);
    } else {
      addItem(item);
      await Api.instance.basketAddItem(item.id);
    }
  };

  return (
    <Card className={'cursor-pointer hover:-translate-y-1'} onClick={onClick}>
      <div className={'flex items-center justify-center h-28 border-b p-4'}>
        <img src={item.image} alt={item.name} loading={'lazy'} width={100} />
      </div>
      <CardHeader>
        <CardTitle
          className={
            'flex items-center justify-between text-xl font-semibold tracking-tight'
          }
        >
          <span>{item.name}</span>
          <div className={'flex items-center gap-2'}>
            <span className={'text-primary'}>
              {item.price.toLocaleString('ru', { maximumFractionDigits: 2 })}
            </span>
            <span> ₽ </span>
          </div>
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};
