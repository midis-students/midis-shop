import { ElementType, Suspense } from 'react';
import { Spinner } from '@/components/Spinner';

export function Loadable(Component: ElementType) {
  return function fn(props: object) {
    return (
      <Suspense
        fallback={
          <div className={'h-full'}>
            <Spinner />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
}
