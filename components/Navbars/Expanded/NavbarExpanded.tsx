import { Navbar, Center, Stack, Text, Grid } from '@mantine/core';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ColorSchemeToggle } from '../../ColorSchemeToggle/ColorSchemeToggle';
import { NavbarButton } from './Buttons/NavbarButton';
import { NavbarExpandedProps } from './NavbarExpanded.dto';


export function NavbarExpanded({routes} : {routes: NavbarExpandedProps[]}) {
    const router = useRouter();
    const routeName = router.pathname.split("/")[1];
    const buttons = routes.map((link, index) => (
        <Link key={index} href={link.href} passHref>
            <NavbarButton
                {...link}
                key={link.label}
                active={routeName === link.href.split("/")[1]}
            />
        </Link>
    ));

    return (
        <Navbar width={{ base: 220 }} p="md">
            <Center>
                <Grid gutter="xs" justify="center" align="center">
                    <Grid.Col span={4}>
                        <Link href="/">
                            <Image alt="logo" src={"/logo.svg"} height="50" width="50" />
                        </Link>
                    </Grid.Col>
                    <Grid.Col span={8}>

                        <Text><b>EXPA</b>utoscaling</Text>

                    </Grid.Col>
                </Grid>
            </Center>

            <Navbar.Section grow sx={{ marginTop: '30vh' }}>
                <Stack justify="center" align="center">
                    {buttons}
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