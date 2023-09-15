import { UserPopout } from '@/pages/popouts/users.tsx';
import { EditItemPopout } from '@/pages/popouts/createItem.tsx';

export const popouts = {
  user: UserPopout,
  createItem: EditItemPopout,
};

export type PopoutsKeys = keyof typeof popouts;
