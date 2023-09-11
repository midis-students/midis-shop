import { create } from 'zustand';
import { Role, User } from '@/types/api.type.ts';

type UserState = {
  current: User | null;
  set: (user: User) => void;
};

export const useUser = create<UserState>((set) => ({
  current: null,
  set: (current) => set({ current }),
}));

export const useIsAdmin = () =>
  useUser((select) => select.current)?.roles?.includes(Role.Admin);
