import { useLocalStorage } from '@mantine/hooks';
import { useMutation } from 'react-query';
import axios from '../../../lib/axios';
import useMe from '../../../store/useMe';

export interface LoginDTO {
  email: string;
  password: string;
}

const postLogin = async (credentials: LoginDTO): Promise<string> => {
  const response = await axios.post('/security/login', credentials);
  return response.data;
};

const useLoginMutation = () => {
  const [_, setKey] = useLocalStorage({ key: 'access_token' });
  const { login } = useMe();
  return useMutation((values: LoginDTO) => postLogin(values), {
    onSuccess: (data) => {
      setKey(data);
      login(data);
    },
  });
};

export default useLoginMutation;
