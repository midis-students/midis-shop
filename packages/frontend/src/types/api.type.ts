export interface User {
  email: string;
  password?: string;
  role: 'admin' | 'default';
}

export interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}
