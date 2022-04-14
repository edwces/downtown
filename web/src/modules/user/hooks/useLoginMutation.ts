import { useMutation } from 'react-query';
import axios from '../../../lib/axios';

export interface LoginDTO {
  email: string;
  password: string;
}

const postLogin = async (credentials: LoginDTO): Promise<void> => {
  await axios.post('/security/login', credentials);
};

const useLoginMutation = () => {
  return useMutation((values: LoginDTO) => postLogin(values));
};

export default useLoginMutation;
