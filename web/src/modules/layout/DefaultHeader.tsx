import { ActionIcon, Group, Header, Menu, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import Link from 'next/link';
import { ShoppingCart, User } from 'tabler-icons-react';

export default function DefaultHeader() {
  return (
    <Header
      height={60}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Group spacing="sm" pl="md">
        <Title>Downtown</Title>
      </Group>
      <Group spacing="sm" pr="md">
        <Link href="/checkout" passHref>
          <ActionIcon size="xl" variant="filled" component="a">
            <ShoppingCart />
          </ActionIcon>
        </Link>
        <Menu
          control={
            <ActionIcon size="xl" variant="filled">
              <User />
            </ActionIcon>
          }
        >
          <Menu.Item component={NextLink} href="/user/register">
            Register
          </Menu.Item>
          <Menu.Item component={NextLink} href="/user/login">
            Login
          </Menu.Item>
        </Menu>
      </Group>
    </Header>
  );
}
