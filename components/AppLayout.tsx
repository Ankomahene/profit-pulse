'use client';
import { AppShell, Box, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from './Navbar/Navbar';

interface Props {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Text size="lg" fw="bold">
            Profit Pulse
          </Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Box m="md">{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
