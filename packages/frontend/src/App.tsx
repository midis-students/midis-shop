import { Pages } from '@/pages';
import { useAuth } from '@/store/auth.ts';
import { useUser } from '@/store/user.ts';
import { useEffect, useState } from 'react';
import { Api } from '@/lib/api.ts';
import { Spinner } from '@/components/Spinner';
import { useBasket } from '@/store/basket.ts';

function App() {
  const access_token = useAuth((select) => select.access_token);
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const setBasket = useBasket((select) => select.set);

  useEffect(() => {
    if (access_token) {
      setLoading(true);
      Api.instance.access_token = access_token;
      Api.instance
        .me()
        .then(user.set)
        .finally(() => setLoading(false));
      Api.instance.basket().then(setBasket);
    }
  }, [access_token, setBasket, user.set]);

  if (loading) {
    return (
      <div className={'flex-1 flex items-center justify-center'}>
        <Spinner />
      </div>
    );
  }

  return <Pages />;
}

export default App;
