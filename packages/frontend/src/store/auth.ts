import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  access_token: string | null;
}

type useAuthState = AuthState & {
  set: <T extends keyof AuthState>(key: T, value: AuthState[T]) => void;
};

export const useAuth = create<useAuthState>()(
  persist(
    (set) => ({
      access_token: null,
      set: (key, value) => set({ [key]: value }),
    }),
    {
      name: 'auth',
    }
  )
);

export const useIsAuth = () => useAuth((select) => !!select.access_token);
