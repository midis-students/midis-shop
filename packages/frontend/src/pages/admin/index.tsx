import { FC } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx';
import { UsersBlock } from '@/pages/admin/users.tsx';
import { ItemsBlock } from '@/pages/admin/items.tsx';

const AdminPage: FC = () => {
  return (
    <Tabs defaultValue={'users'}>
      <TabsList>
        <TabsTrigger value={'users'}>Пользователи</TabsTrigger>
        <TabsTrigger value={'items'}>Товары</TabsTrigger>
      </TabsList>
      <TabsContent value={'users'}>
        <UsersBlock />
      </TabsContent>
      <TabsContent value={'items'}>
        <ItemsBlock />
      </TabsContent>
    </Tabs>
  );
};
export default AdminPage;
