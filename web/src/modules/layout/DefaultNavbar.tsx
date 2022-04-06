import { Navbar, Text } from '@mantine/core';

export default function DefaultNavbar() {
  return (
    <Navbar width={{ base: 300 }} hiddenBreakpoint="md" hidden>
      <Text>Navbar is Here</Text>
    </Navbar>
  );
}
