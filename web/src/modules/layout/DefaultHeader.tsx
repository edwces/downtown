import { ActionIcon, Group, Header, Title } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart } from 'tabler-icons-react';

export default function DefaultHeader() {
  return (
    <Header
      height={60}
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      })}
    >
      <Group spacing="sm" pl="md">
        <Title>Downtown</Title>
      </Group>
      <Group spacing="sm" pr="md">
        <Link href="/checkout" passHref>
          <ActionIcon size="xl" variant="filled">
            <ShoppingCart />
          </ActionIcon>
        </Link>
      </Group>
    </Header>
  );
}
