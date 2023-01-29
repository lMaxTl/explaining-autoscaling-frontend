import { render } from '@testing-library/react';
import React from 'react';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { IconSun, IconMoonStars } from '@tabler/icons';

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

describe('ColorSchemeToggle', () => {
    it('renders the correct icon based on the current color scheme', () => {
        const { getByTestId } = render(<ColorSchemeToggle />);
        const icon = getByTestId('color-scheme-toggle-icon');
        expect(icon).toBeVisible();
        const expectedIcon = 'svg';
        expect(icon).toContainHTML(expectedIcon);
        expect(icon).toHaveClass('icon-tabler-moon-stars');
    });
});
