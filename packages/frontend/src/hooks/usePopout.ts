import { PopoutsKeys } from '@/pages/popouts';
import { useNavigate } from 'react-router-dom';

export const usePopout = (popout: PopoutsKeys) => {
  const navigate = useNavigate();

  return (data: unknown = {}) => {
    navigate('', { state: { popout, data } });
  };
};
