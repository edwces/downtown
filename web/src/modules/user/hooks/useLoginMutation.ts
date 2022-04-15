import { useLocalStorage } from '@mantine/hooks';
import { useMutation } from 'react-query';
import axios from '../../../lib/axios';
import useMe, { UserContext } from '../../../store/useMe';

export interface LoginDTO {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: UserContext;
}

const postLogin = async (credentials: LoginDTO): Promise<LoginResponse> => {
  const response = await axios.post('/security/login', credentials);
  return response.data;
};

const useLoginMutation = () => {
  const [_, setKey] = useLocalStorage({ key: 'access_token' });
  const { login } = useMe();
  return useMutation((values: LoginDTO) => postLogin(values), {
    onSuccess: (data) => {
      setKey(data.token);
      login(data.token, data.user);
    },
  });
};

export default useLoginMutation;
