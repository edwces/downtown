import { Button, Center, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { NextPage } from 'next';
import Head from 'next/head';
import { useMutation } from 'react-query';
import axios from '../lib/axios';
import { UserDTO } from '../modules/user/types/userDTO';

const Register: NextPage = () => {
  // form with mantine
  // send mutation on submit
  const form = useForm<UserDTO>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const mutation = useMutation<any, unknown, UserDTO>((userCredentials) =>
    axios
      .post('/security/register', userCredentials)
      .then((response) => response.data)
  );

  const onSubmit = (values: UserDTO) => {
    console.log(values);
    mutation.mutate(values);
  };

  return (
    <div>
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
    </div>
  );
};

export default Register;
