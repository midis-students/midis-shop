import { FC } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { usePopout } from '@/hooks/usePopout.ts';

export const ItemsBlock: FC = () => {
  const showPopout = usePopout('createItem');

  return (
    <>
      <Button onClick={() => showPopout()}>Добавить</Button>
    </>
  );
};
