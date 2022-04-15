import { useLocalStorage } from '@mantine/hooks';
import { ReactNode, useEffect } from 'react';
import axios from '../../../lib/axios';
import useMe, { UserContext } from '../../../store/useMe';

interface AuthProviderProps {
  children: ReactNode;
}

const FetchMe = async (token: string): Promise<UserContext> => {
  const response = await axios.get('/security/me', {
    headers: { Authorization: 'Bearer ' + token },
  });
  return response.data;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [token, _] = useLocalStorage({ key: 'access_token' });
  const { login } = useMe();

  useEffect(() => {
    const wrapper = async () => {
      if (!token) return null;
      const user = await FetchMe(token);
      login(token, user);
    };
    wrapper();
  }, [token]);

  return <>{children}</>;
}
