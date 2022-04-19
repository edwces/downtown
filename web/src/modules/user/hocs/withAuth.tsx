import { useLocalStorage } from '@mantine/hooks';
import { ComponentType } from 'react';

export default function withAuth<P>(Component: ComponentType<P>) {
  return function WrappedComponent(props: P) {
    const [token, _] = useLocalStorage({
      key: 'access_token',
    });

    if (!token) return <div>Login</div>;
    return <Component {...props} />;
  };
}
