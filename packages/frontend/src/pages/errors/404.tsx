import { FC } from 'react';

export const NotFound: FC = () => {
  return (
    <section className={'flex items-center justify-center flex-col'}>
      <img src={'https://http.cat/images/404.jpg'} alt={'cat not found'} />
    </section>
  );
};
