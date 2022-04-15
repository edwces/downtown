import { Box, Title } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import AppLayout from '../modules/layout/AppLayout';
import ProductFilters from '../modules/product/components/ProductFilters';
import ProductGrid from '../modules/product/components/ProductGrid';
import useProducts from '../modules/product/hooks/useProducts';
import useFilters from '../store/useFilters';

// TODO: Move useFilters and useProducts to Product container
// TODO: This will decrease performence when selecting filter
const Home: NextPage = () => {
  const { filters } = useFilters();
  const { isLoading, data } = useProducts(filters);

  return (
    <Box>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <Title sx={{ marginBottom: 20 }}>Products</Title>
        <ProductFilters />
        {isLoading ? undefined : <ProductGrid data={data} />}
      </AppLayout>
    </Box>
  );
};

export default Home;
