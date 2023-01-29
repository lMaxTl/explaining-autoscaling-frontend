import { Navbar, Center, Stack } from '@mantine/core';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ColorSchemeToggle } from '../../ColorSchemeToggle/ColorSchemeToggle';
import { NavbarLink } from './Link/NavbarLink';
import { NavbarCollapsedProps } from './NavbarCollapsed.dto';

export function NavbarCollapsed({routes} : {routes: NavbarCollapsedProps[]}) {
    const router = useRouter();
    const routeName = router.pathname.split("/")[1];
    const links = routes.map((link, index) => (
        <Link key={index} href={link.href} passHref>
            <NavbarLink
                {...link}
                key={link.label}
                active={routeName === link.href.split("/")[1]}
            />
        </Link>
    ));

    return (
        <Navbar width={{ base: 80 }} p="md">
            <Center>
                <Link href="/">
                    <Image alt="logo" src={"/logo.svg"} height="50" width="50" />
                </Link>
            </Center>
            <Navbar.Section grow sx={{ marginTop: '30vh' }}>
                <Stack justify="center" spacing={0}>
                    {links}
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack justify="center" align="center">
                    <ColorSchemeToggle />
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}