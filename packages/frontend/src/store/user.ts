import { create } from 'zustand';
import { User } from '@/types/api.type.ts';

type UserState = {
  current: User | null;
  set: (user: User) => void;
};

export const useUser = create<UserState>((set) => ({
  current: null,
  set: (current) => set({ current }),
}));
