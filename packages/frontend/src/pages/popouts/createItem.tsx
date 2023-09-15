import { ChangeEvent, FC, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Api } from '@/lib/api.ts';

export const CreateItemPopout: FC = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (reader.result) setPreview(reader.result.toString());
    };
  };

  const onSave = async () => {
    if (!preview) return;
    try {
      await Api.instance.createItem({
        name,
        description,
        price,
        image: preview,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(value) => !value && navigate(-1)}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Добавление товара</DialogTitle>
        </DialogHeader>
        <div className={'flex gap-4'}>
          <div className={'py-4'}>
            <Label>Картинка</Label>
            <Input type="file" onChange={onFileUpload} accept="image/*" />
            {preview && (
              <img
                className={'py-4'}
                src={preview}
                width={200}
                alt={'preview '}
              />
            )}
          </div>
          <div className="grid gap-4 py-4" style={{ width: '50%' }}>
            <div className="flex flex-col gap-2">
              <Label>Название</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Описание</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Цена</Label>
              <Input
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
                type={'number'}
                min={0}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSave}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
