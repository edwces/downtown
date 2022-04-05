import { AppShell, Header, Navbar, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppShell
      fixed
      navbarOffsetBreakpoint="md"
      header={
        <Header height={60}>
          <Text>Application Navbar</Text>
        </Header>
      }
      navbar={
        <Navbar width={{ base: 300 }} hiddenBreakpoint="md" hidden>
          <Text>Application Navbar</Text>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
}
