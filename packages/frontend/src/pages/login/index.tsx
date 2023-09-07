import { FC } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx';
import { LoginBlock } from '@/pages/login/login.tsx';
import { RegisterBlock } from '@/pages/login/register.tsx';

const LoginPage: FC = () => {
  return (
    <Tabs defaultValue={'register'} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={'register'}>Регистрация</TabsTrigger>
        <TabsTrigger value={'login'}>Авторизация</TabsTrigger>
      </TabsList>
      <TabsContent value={'register'}></TabsContent>
      <TabsContent value={'login'}>
        <LoginBlock />
      </TabsContent>
      <TabsContent value={'register'}>
        <RegisterBlock />
      </TabsContent>
    </Tabs>
  );
};

export default LoginPage;
