import { useAuth } from '@/store/auth.ts';
import { Basket, Item, User, UserPassword } from '@/types/api.type.ts';
import { useBasket } from '@/store/basket.ts';

export const logout = () => {
  useAuth.setState({ access_token: null });
  useBasket.setState({ items: [] });
};

export class Api {
  readonly baseUrl = 'http://localhost:3000/';

  access_token?: string;

  static instance = new Api();

  me() {
    return this.request<User>('auth/me', { method: 'GET' });
  }

  basket(): Promise<Array<Basket>> {
    return this.request('basket', { method: 'GET' });
  }

  basketAddItem(id: number) {
    return this.request('basket/' + id, { method: 'POST' });
  }

  basketRemoveItem(id: number) {
    return this.request('basket/' + id, { method: 'DELETE' });
  }

  users() {
    return this.request<User[]>('auth/users', { method: 'GET' });
  }

  login(email: string, password: string) {
    return this.request<{ access_token: string }>('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
  register(email: string, password: string) {
    return this.request<{ access_token: string }>('auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  saveItem(
    {
      id,
      ...body
    }: {
      id?: number;
      name: string;
      description: string;
      price: number;
      image: string;
    },
    method = 'POST'
  ) {
    return this.request(`shop/${id ?? ''}`, {
      method,
      body: JSON.stringify(body),
    });
  }

  getShopItems() {
    return this.request<Item[]>('shop', { method: 'GET' });
  }

  getShopItem(id: number) {
    return this.request<Item>(`shop/${id}`, { method: 'GET' });
  }
  deleteItem(id: number) {
    return this.request<Item>(`shop/${id}`, { method: 'DELETE' });
  }

  decrypt(email: string) {
    return this.request<UserPassword>(`auth/decrypt/${email}`, {
      method: 'GET',
    });
  }

  async request<T>(method: string, config: RequestInit): Promise<T> {
    const url = new URL(method, this.baseUrl);

    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.access_token) {
      Object.assign(headers, {
        Authorization: 'Bearer ' + this.access_token,
      });
    }

    const response = await fetch(url, {
      ...config,
      headers,
    });

    const json = await response.json();

    if ('error' in json) {
      throw new ApiError(json);
    }

    return json;
  }
}

export class ApiError {
  readonly error!: string;
  readonly message!: string | string[];
  readonly statusCode!: number;

  constructor(props: Partial<ApiError>) {
    Object.assign(this, props);
  }
}
