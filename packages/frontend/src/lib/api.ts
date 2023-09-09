import { useAuth } from '@/store/auth.ts';

export const makeAuth = () => useAuth.setState({ access_token: 'bruh' });
export const logout = () => useAuth.setState({ access_token: null });

export class Api {
  readonly baseUrl = 'http://localhost:3000/';

  access_token?: string;

  static instance = new Api();

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

  async request(method: string, config: RequestInit) {
    const url = new URL(method, this.baseUrl);

    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.access_token) {
      Object.assign(headers, {
        Authorization: 'Bearer ' + this.access_token,
      });
    }

    return fetch(url, {
      ...config,
      headers,
    }).then((res) => res.json());
  }
}
