export const enum Role {
  Admin = 'admin',
  Default = 'user',
}

export interface User {
  email: string;
  password?: string;
  roles: Role[];
}

export interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}
