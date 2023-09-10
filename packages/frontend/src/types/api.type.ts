export const enum Role {
  Admin = 'admin',
  Default = 'default',
}

export interface User {
  email: string;
  password?: string;
  role: Role[];
}

export interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}
