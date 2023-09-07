import { create } from 'zustand';

interface AuthState {
  access_token: string | null;
}

type useAuthState = AuthState & {
  set: <T extends keyof AuthState>(key: T, value: AuthState[T]) => void;
};

export const useAuth = create<useAuthState>((set) => ({
  access_token: null,
  set: (key, value) => set({ [key]: value }),
}));

export const useIsAuth = () => useAuth((select) => !!select.access_token);
