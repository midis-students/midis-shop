import { Pages } from '@/pages';
import { useAuth } from '@/store/auth.ts';
import { useUser } from '@/store/user.ts';
import { useEffect } from 'react';
import { Api } from '@/lib/api.ts';

function App() {
  const access_token = useAuth((select) => select.access_token);
  const user = useUser();

  useEffect(() => {
    if (access_token) {
      Api.instance.access_token = access_token;
      Api.instance.me().then(user.set);
    }
  }, [access_token, user.set]);

  return <Pages />;
}

export default App;
