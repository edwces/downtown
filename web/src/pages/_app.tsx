import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from 'react-query';
import reactQueryClient from '../lib/react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
