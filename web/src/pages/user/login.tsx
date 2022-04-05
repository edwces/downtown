import { Box, Button, Center, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { NextPage } from 'next';
import Head from 'next/head';
import { useMutation } from 'react-query';
import axios from '../../lib/axios';
import { LoginDTO } from '../../types';

const Login: NextPage = () => {
  // form with mantine
  // send mutation on submit
  const form = useForm<LoginDTO>({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation<any, unknown, LoginDTO>((userCredentials) =>
    axios
      .post('/security/login', userCredentials)
      .then((response) => response.data)
  );

  const onSubmit = (values: LoginDTO) => {
    console.log(values);
    mutation.mutate(values);
  };

  return (
    <Box>
      <Head>
        <title>Login with your account</title>
        <meta name="Login" content="Generated with next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            required
            label="Email"
            id="email"
            {...form.getInputProps('email')}
          ></TextInput>
          <PasswordInput
            required
            label="Password"
            id="password"
            {...form.getInputProps('password')}
          ></PasswordInput>
          <Button type="submit">Submit</Button>
        </form>
      </Center>
    </Box>
  );
};

export default Login;
