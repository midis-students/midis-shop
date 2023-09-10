import { FC, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Api, ApiError } from '@/lib/api.ts';
import { useAuth } from '@/store/auth.ts';

export const LoginBlock: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSigning = async () => {
    try {
      const { access_token } = await Api.instance.login(email, password);
      useAuth.setState({ access_token });
    } catch (e) {
      if (e instanceof ApiError) {
        setError(Array.isArray(e.message) ? e.message[0] : e.message);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Вход в существующий аккаунт</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Почта</Label>
          <Input
            id="email"
            type={'email'}
            placeholder="example@mail.ru"
            value={email}
            onChange={(e) => {
              return setEmail(e.target.value);
            }}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            type={'password'}
            placeholder="**********"
            value={password}
            onChange={(e) => {
              return setPassword(e.target.value);
            }}
          />
        </div>
        {error && (
          <div className={'p-2 min-h-12'}>
            <span
              className={'text-xl font-semibold tracking-tight text-red-500'}
            >
              {error}
            </span>
          </div>
        )}
        <Button className={'w-full'} onClick={onSigning}>
          Войти
        </Button>
      </CardContent>
    </Card>
  );
};
