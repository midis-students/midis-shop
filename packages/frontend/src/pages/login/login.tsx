import { FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';

export const LoginBlock: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Вход в существующий аккаунт</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Почта</Label>
          <Input id="email" type={'email'} placeholder="example@mail.ru" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" type={'password'} placeholder="**********" />
        </div>
        <Button className={'w-full'}>Войти</Button>
      </CardContent>
    </Card>
  );
};
