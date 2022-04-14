import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormEvent } from 'react';
import { RegisterDTO } from '../hooks/useRegisterMutation';

interface RegisterFormProps {
  handleSubmit: (values: RegisterDTO, event: FormEvent<Element>) => void;
}

export default function RegisterForm({ handleSubmit }: RegisterFormProps) {
  const form = useForm<RegisterDTO>({
    initialValues: { name: '', email: '', password: '' },
  });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
  );
}
