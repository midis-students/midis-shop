import { FC } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';

export const ShopItem: FC = () => {
  return (
    <Card>
      <img src={'/coffee.jpg'} alt={'кофе'} loading={'lazy'} />
      <CardHeader>
        <CardTitle>Кофее!</CardTitle>
        <CardDescription>Кофее с сердечкой</CardDescription>
      </CardHeader>
    </Card>
  );
};
