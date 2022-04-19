import { ActionIcon, Group, Header, Menu, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingCart, User } from 'tabler-icons-react';
import useMe from '../../store/useMe';

export default function DefaultHeader() {
  const { logout } = useMe();
  const router = useRouter();
  const [token, setToken] = useLocalStorage({ key: 'access_token' });

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
          <Menu.Item
            onClick={() => {
              setToken('');
              logout();
              router.push('/');
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Group>
    </Header>
  );
}
