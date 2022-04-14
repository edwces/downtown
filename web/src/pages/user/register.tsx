import { Box, Center } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import RegisterForm from '../../modules/user/components/RegisterForm';
import useRegisterMutation from '../../modules/user/hooks/useRegisterMutation';

const Register: NextPage = () => {
  // form with mantine
  // send mutation on submit

  const { mutate } = useRegisterMutation();

  return (
    <Box>
      <Head>
        <title>Register your account</title>
        <meta name="Register" content="Generated with next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <RegisterForm handleSubmit={(values) => mutate(values)} />
      </Center>
    </Box>
  );
};

export default Register;
