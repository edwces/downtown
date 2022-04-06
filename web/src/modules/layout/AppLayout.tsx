import { AppShell } from '@mantine/core';
import { ReactNode } from 'react';
import DefaultHeader from './DefaultHeader';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppShell fixed navbarOffsetBreakpoint="md" header={<DefaultHeader />}>
      {children}
    </AppShell>
  );
}
