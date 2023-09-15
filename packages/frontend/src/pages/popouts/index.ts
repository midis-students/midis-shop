import { UserPopout } from '@/pages/popouts/users.tsx';
import { CreateItemPopout } from '@/pages/popouts/createItem.tsx';

export const popouts = {
  user: UserPopout,
  createItem: CreateItemPopout,
};

export type PopoutsKeys = keyof typeof popouts;
