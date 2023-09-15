import { FC, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { Label } from '@/components/ui/label.tsx';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input.tsx';
import { Api } from '@/lib/api.ts';

export const UserPopout: FC<{ data: { id: number } }> = ({ data }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('Loading...');
  const [decrtypedPassword, setDecryptedPassword] = useState('Loading...');

  useEffect(() => {
    Api.instance.decrypt(data.id).then(({ encrypted, decrypted }) => {
      setPassword(encrypted);
      setDecryptedPassword(decrypted);
    });
  }, [data.id]);

  return (
    <Dialog open={true} onOpenChange={(value) => !value && navigate(-1)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Расшифровка</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>Пароль</Label>
            <Input readOnly value={password} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Расшифрованный пароль</Label>
            <Input readOnly value={decrtypedPassword} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
