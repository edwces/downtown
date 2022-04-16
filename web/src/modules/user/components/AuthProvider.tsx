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

// TODO: Revalidate the token when its time run out
export default function AuthProvider({ children }: AuthProviderProps) {
  const [token, _] = useLocalStorage({ key: 'access_token' });
  const { login, logout } = useMe();

  useEffect(() => {
    const wrapper = async () => {
      if (!token) return logout();
      try {
        const user = await FetchMe(token);
        login(token, user);
      } catch {
        logout();
      }
    };
    wrapper();
  }, [token]);

  return <>{children}</>;
}
