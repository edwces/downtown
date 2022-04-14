import axios from '../../../lib/axios';
import { useMutation } from 'react-query';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

const postUser = async (credentials: RegisterDTO): Promise<void> => {
  await axios.post('/security/register', credentials);
};

const useRegisterMutation = () => {
  return useMutation((values: RegisterDTO) => postUser(values));
};

export default useRegisterMutation;
