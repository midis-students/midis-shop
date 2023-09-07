import { useAuth } from '@/store/auth.ts';

export const makeAuth = () => useAuth.setState({ access_token: 'bruh' });
export const logout = () => useAuth.setState({ access_token: null });
