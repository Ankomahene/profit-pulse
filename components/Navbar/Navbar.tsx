import { Button, Group } from '@mantine/core';
import {
  IconCoin,
  IconDashboard,
  IconLogout,
  IconSwitchHorizontal,
  IconUserCog,
} from '@tabler/icons-react';
import Link from 'next/link';
import classes from './Navbar.module.css';
import { usePathname } from 'next/navigation';

const data = [
  { link: '/', label: 'Dashboard', icon: IconDashboard },
  { link: '/transactions', label: 'Transactions', icon: IconCoin },
  { link: '/manage-users', label: 'Manage Users', icon: IconUserCog },
];

export function Navbar() {
  const pathname = usePathname();

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === pathname || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          FMT Design & Print
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <Link
          href="/profile"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Profile</span>
        </Link>

        <Button
          variant="transparent"
          leftSection={<IconLogout className={classes.linkIcon} stroke={1.5} />}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
