import { FC, useEffect, useState } from 'react';

import { Item } from '@/types/api.type.ts';
import { ItemGrid } from '@/components/ItemGrid';
import { Api } from '@/lib/api.ts';

const MainPage: FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    Api.instance.getShopItems().then(setItems);
  }, []);

  return <ItemGrid items={items} />;
};

export default MainPage;
