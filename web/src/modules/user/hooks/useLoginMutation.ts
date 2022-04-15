import { useMutation } from 'react-query';
import axios from '../../../lib/axios';
import { UserContext } from '../../../store/useMe';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserContext;
}

const postLogin = async (credentials: LoginDTO): Promise<LoginResponse> => {
  const response = await axios.post('/security/login', credentials);
  return response.data;
};

const useLoginMutation = () => {
  return useMutation((values: LoginDTO) => postLogin(values));
};

export default useLoginMutation;
