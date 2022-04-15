import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from 'react-query';
import reactQueryClient from '../lib/react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/global.css';
import useMe from '../store/useMe';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect } from 'react';
import axios from '../lib/axios';

function MyApp({ Component, pageProps }: AppProps) {
  const [token, _] = useLocalStorage({ key: 'access_token' });
  const { login } = useMe();

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) return null;
      const response = await axios.get('/security/me', {
        headers: { Authorization: 'Bearer ' + token },
      });
      login(token, response.data);
    };
    fetchMe();
  }, [token]);

  return (
    <QueryClientProvider client={reactQueryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ fontFamily: 'Inter, sans-serif', colorScheme: 'dark' }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
