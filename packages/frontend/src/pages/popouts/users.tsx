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
import { useDebounce } from '@/hooks/useDebounce.ts';

export const UserPopout: FC<{ data: { email: string } }> = ({ data }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(data.email);
  const defaultText = data.email ? 'Loading...' : '';
  const [password, setPassword] = useState(defaultText);
  const [decrtypedPassword, setDecryptedPassword] = useState(defaultText);
  const debounceEmail = useDebounce<string>(email, 500);

  useEffect(() => {
    if (debounceEmail) {
      Api.instance.decrypt(debounceEmail).then(({ encrypted, decrypted }) => {
        setPassword(encrypted);
        setDecryptedPassword(decrypted);
      });
    }
  }, [debounceEmail]);

  return (
    <Dialog open={true} onOpenChange={(value) => !value && navigate(-1)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Расшифровка</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              type={'email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
