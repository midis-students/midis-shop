export interface User {
  email: string;
  password?: string;
  role: 'admin' | 'default';
}
