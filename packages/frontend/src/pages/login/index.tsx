import { FC, useEffect } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx';
import { LoginBlock } from '@/pages/login/login.tsx';
import { RegisterBlock } from '@/pages/login/register.tsx';
import { useIsAuth } from '@/store/auth.ts';
import { useNavigate } from 'react-router-dom';

const LoginPage: FC = () => {
  const isAuth = useIsAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  return (
    <Tabs defaultValue={'register'} className="w-[400px] ml-auto mr-auto">
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
