import { FC } from 'react';

import Style from './style.module.css';

export const Spinner: FC = () => {
  return (
    <div className={Style['lds-grid']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
