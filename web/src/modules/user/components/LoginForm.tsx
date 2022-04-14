import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormEvent } from 'react';
import { LoginDTO } from '../hooks/useLoginMutation';

interface LoginFormProps {
  onSubmit: (values: LoginDTO, event: FormEvent<Element>) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const form = useForm<LoginDTO>({
    initialValues: { email: '', password: '' },
  });

  return (
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
  );
}
