import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';

export const Footer: FC = () => {
  return (
    <footer
      className={
        'flex items-center mt-auto border-t p-4 gap-4 max-[560px]:flex-col '
      }
    >
      <h4 className={'text-2xl font-semibold tracking-tight'}>П-48</h4>
      <Author
        href={'https://github.com/damirlut'}
        name={'Лутфрахманов Дамир'}
      />
      <Author href={'https://github.com/ikysu'} name={'Сагабутдинов Даниил'} />
      <Author href={'https://github.com/azelisi'} name={'Маркин Егор'} />
    </footer>
  );
};

const Author: FC<{ href: string; name: string }> = ({ href, name }) => {
  return (
    <Link to={href} className={'flex items-center gap-2'}>
      <Avatar>
        <AvatarImage src={href + '.png'} alt={name} />
        <AvatarFallback>
          {name
            .split(' ')
            .map((w) => w[0].toUpperCase())
            .join(' ')}
        </AvatarFallback>
      </Avatar>
      <span className={'text-lg font-semibold tracking-tight'}>{name}</span>
    </Link>
  );
};
