import { Box, Center } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LoginForm from '../../modules/user/components/LoginForm';
import useLoginMutation, {
  LoginResponse,
} from '../../modules/user/hooks/useLoginMutation';
import useMe from '../../store/useMe';

const Login: NextPage = () => {
  // form with mantine
  // send mutation on submit
  const [_, setToken] = useLocalStorage({ key: 'access_token' });
  const { login } = useMe();
  const router = useRouter();
  const { mutate } = useLoginMutation();

  const mutationCallback = (data: LoginResponse) => {
    setToken(data.token);
    login(data.token, data.user);
    router.push('/');
  };

  return (
    <Box>
      <Head>
        <title>Login with your account</title>
        <meta name="Login" content="Generated with next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <LoginForm
          onSubmit={(values) => mutate(values, { onSuccess: mutationCallback })}
        />
      </Center>
    </Box>
  );
};

export default Login;
