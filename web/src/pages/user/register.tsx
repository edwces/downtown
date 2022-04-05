import { Box, Button, Center, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { NextPage } from 'next';
import Head from 'next/head';
import { useMutation } from 'react-query';
import axios from '../../lib/axios';
import { RegisterDTO } from '../../types';

const Register: NextPage = () => {
  // form with mantine
  // send mutation on submit
  const form = useForm<RegisterDTO>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const mutation = useMutation<any, unknown, RegisterDTO>((userCredentials) =>
    axios
      .post('/security/register', userCredentials)
      .then((response) => response.data)
  );

  const onSubmit = (values: RegisterDTO) => {
    console.log(values);
    mutation.mutate(values);
  };

  return (
    <Box>
      <Head>
        <title>Register your account</title>
        <meta name="Register" content="Generated with next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            required
            label="Username"
            id="username"
            {...form.getInputProps('name')}
          ></TextInput>
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

export default Register;
