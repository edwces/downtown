import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from 'react-query';
import reactQueryClient from '../lib/react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/global.css';
import AuthProvider from '../modules/user/components/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ fontFamily: 'Inter, sans-serif', colorScheme: 'light' }}
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
