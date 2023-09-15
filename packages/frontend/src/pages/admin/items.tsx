import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { usePopout } from '@/hooks/usePopout.ts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';
import { Item } from '@/types/api.type';
import { Api } from '@/lib/api.ts';
import { useLocation } from 'react-router-dom';

export const ItemsBlock: FC = () => {
  const showPopout = usePopout('createItem');
  const location = useLocation();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    Api.instance.getShopItems().then(setItems);
  }, [location.state === null]);

  const onClick = (id: number) => {
    showPopout({ id });
  };

  return (
    <>
      <Button onClick={() => showPopout()}>Добавить</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Картинка</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Цена</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => onClick(item.id)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <img src={item.image} alt={item.name} width={75} />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.price} ₽</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
