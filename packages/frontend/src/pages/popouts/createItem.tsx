import { ChangeEvent, FC, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';

export const CreateItemPopout: FC = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (reader.result) setPreview(reader.result.toString());
    };
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
                width={150}
                alt={'preview '}
              />
            )}
          </div>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Название</Label>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Описание</Label>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Цена</Label>
              <Input type={'number'} min={0} />
            </div>
          </div>{' '}
        </div>
      </DialogContent>
    </Dialog>
  );
};
