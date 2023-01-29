import { IconExclamationMark } from '@tabler/icons';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavbarExpanded } from './NavbarExpanded';
import { NavbarExpandedProps } from './NavbarExpanded.dto';

const routes: NavbarExpandedProps[] = [
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

describe('NavbarExpanded', () => {
    it('should render the correct buttons and logo', () => {
        const { getByTestId, getByAltText } = render(
            <NavbarExpanded routes={routes} />
        );

        const logo = getByAltText('logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/logo.svg');
        expect(logo).toHaveAttribute('height', '50');
        expect(logo).toHaveAttribute('width', '50');


        expect(screen.getAllByRole('link').length).toBe(routes.length + 1);

        routes.forEach((route, index) => {
            expect(screen.getAllByRole('link')[index + 1]).toBeVisible();
        });
        
    });
});