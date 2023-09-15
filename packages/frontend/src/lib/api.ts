import { useAuth } from '@/store/auth.ts';
import { ShopItem, User, UserPassword } from '@/types/api.type.ts';

export const logout = () => useAuth.setState({ access_token: null });

export class Api {
  readonly baseUrl = 'http://localhost:3000/';

  access_token?: string;

  static instance = new Api();

  me() {
    return this.request('auth/me', { method: 'GET' });
  }

  basket() {
    return this.request('basket', { method: 'GET' });
  }

  users() {
    return this.request<User[]>('auth/users', { method: 'GET' });
  }

  login(email: string, password: string) {
    return this.request('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
  register(email: string, password: string) {
    return this.request('auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  createItem(body: {
    name: string;
    description: string;
    price: number;
    image: string;
  }) {
    return this.request('shop', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  getShopItems() {
    return this.request<ShopItem[]>('shop', { method: 'GET' });
  }

  decrypt(userId: number) {
    return this.request<UserPassword>(`auth/decrypt/${userId}`, {
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
