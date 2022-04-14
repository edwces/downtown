import { AppShell } from '@mantine/core';
import { ReactNode } from 'react';
import DefaultHeader from './DefaultHeader';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppShell
      fixed
      navbarOffsetBreakpoint="md"
      header={<DefaultHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
