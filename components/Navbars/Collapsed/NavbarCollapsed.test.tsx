import { IconExclamationMark } from '@tabler/icons';
import { render, screen } from '@testing-library/react';
import { NavbarCollapsed } from './NavbarCollapsed';
import { NavbarCollapsedProps } from './NavbarCollapsed.dto';

const routes : NavbarCollapsedProps[] = [
    {
        icon: IconExclamationMark,
        label: 'Home',
        href: '/'
    },
    {
        icon: IconExclamationMark,
        label: 'About',
        href: '/about'
    }
];

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));

jest.mock('@mantine/core', () => {
    const originalModule = jest.requireActual('@mantine/core');
    return {
        ...originalModule,
        useMantineColorScheme: () => ({
            colorScheme: 'light',
            toggleColorScheme: jest.fn(),
        }),
    };
});

test('renders navbar links correctly', () => {
    render(<NavbarCollapsed routes={routes} />);

    // Assert that the correct number of links are displayed (+ icon link)
    expect(screen.getAllByRole('link').length).toBe(routes.length + 1);

    routes.forEach((route, index) => {
        expect(screen.getAllByRole('link')[index + 1]).toBeVisible();
    });
});
