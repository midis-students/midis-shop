import { FC, useEffect, useState } from 'react';
import { User } from '@/types/api.type.ts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';
import { Api } from '@/lib/api.ts';
import { useNavigate } from 'react-router-dom';

export const UsersBlock: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    Api.instance.users().then(setUsers);
  }, []);

  const onClick = (id: number) => {
    navigate('', { state: { popout: 'user', data: { id } } });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Пароль</TableHead>
          <TableHead>Роли</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} onClick={() => onClick(user.id)}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <span
                className={
                  'rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
                }
              >
                {user.password}
              </span>
            </TableCell>
            <TableCell>{user.roles.join()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
