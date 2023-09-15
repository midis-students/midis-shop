import { ChangeEvent, FC, useEffect, useState } from 'react';
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
import { Api, ApiError } from '@/lib/api.ts';

export const EditItemPopout: FC<{ data: { id: number } }> = ({ data }) => {
  const isEdit = !!data.id;
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (reader.result) setPreview(reader.result.toString());
    };
  };

  useEffect(() => {
    if (isEdit) {
      Api.instance.getShopItem(data.id).then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setPreview(data.image);
      });
    }
  }, [data.id, isEdit]);

  const onSave = async () => {
    if (!preview) return;
    try {
      await Api.instance.saveItem(
        {
          name,
          description,
          price,
          image: preview,
          id: data.id,
        },
        isEdit ? 'PATCH' : 'POST'
      );
      navigate(-1);
    } catch (e) {
      console.warn(e);
      if (e instanceof ApiError) {
        setError(Array.isArray(e.message) ? e.message[0] : e.message);
      }
    }
  };

  const onDelete = async () => {
    if (!isEdit) return;
    await Api.instance.deleteItem(data.id);
    navigate(-1);
  };

  return (
    <Dialog open={true} onOpenChange={(value) => !value && navigate(-1)}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Редактирование' : 'Добавление'} товара
          </DialogTitle>
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
        {error && (
          <div className={'p-2 min-h-12'}>
            <span
              className={'text-sm font-semibold tracking-tight text-red-500'}
            >
              {error}
            </span>
          </div>
        )}
        <DialogFooter>
          {isEdit && (
            <Button className={'bg-red-500'} onClick={onDelete}>
              Удалить
            </Button>
          )}
          <Button onClick={onSave}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
