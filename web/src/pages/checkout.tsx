import { Box, Button, Title } from '@mantine/core';
import Head from 'next/head';
import { NextPage } from 'next/types';
import { useMemo } from 'react';
import axios from '../lib/axios';
import AppLayout from '../modules/layout/AppLayout';
import AuthorizedCheckout from '../modules/product/components/AuthorizedCheckout';
import UnauthorizedCheckout from '../modules/product/components/UnauthorizedCheckout';
import useMe from '../store/useMe';

const Checkout: NextPage = () => {
  // get all products from user cart
  const { status } = useMe();

  const checkoutItems = useMemo(() => {
    if (status === 'signIn') return <AuthorizedCheckout />;
    if (status === 'signOut') return <UnauthorizedCheckout />;
    return <div>Loading</div>;
  }, [status]);

  return (
    <Box>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <Title sx={{ marginBottom: 20 }}>Checkout</Title>
        {checkoutItems}
      </AppLayout>
    </Box>
  );
};

export default Checkout;
