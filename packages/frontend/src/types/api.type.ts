export const enum Role {
  Admin = 'admin',
  Default = 'user',
}

export type Basket = {
  item: Item;
};

export interface User {
  id: number;
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
  deletable?: boolean;
}

export interface UserPassword {
  encrypted: string;
  decrypted: string;
}
