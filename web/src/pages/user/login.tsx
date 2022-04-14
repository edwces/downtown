import { Box, Center } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import LoginForm from '../../modules/user/components/LoginForm';
import useLoginMutation from '../../modules/user/hooks/useLoginMutation';

const Login: NextPage = () => {
  // form with mantine
  // send mutation on submit
  const { mutate } = useLoginMutation();

  return (
    <Box>
      <Head>
        <title>Login with your account</title>
        <meta name="Login" content="Generated with next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <LoginForm onSubmit={(values) => mutate(values)} />
      </Center>
    </Box>
  );
};

export default Login;
