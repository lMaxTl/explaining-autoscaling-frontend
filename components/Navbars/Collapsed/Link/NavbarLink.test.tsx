import { render, fireEvent, getByTestId } from '@testing-library/react';
import React from 'react';
import { NavbarLink } from './NavbarLink';

describe('NavbarLink', () => {
    it('should render the icon', () => {
        const label = 'Link label';
        const Icon = () => <div data-testid="icon" />;
        const { getByTestId } = render(
            <NavbarLink label={label} icon={Icon} />
        );

        expect(getByTestId('icon')).toBeInTheDocument();
    });

    it('should call the onClick prop when the link is clicked', () => {
        const label = 'Link label';
        const Icon = () => <div data-testid="icon" />;
        const onClick = jest.fn();
        const { getByText, getByTestId } = render(
            <NavbarLink label={label} icon={Icon} onClick={onClick} />
        );
        const button = getByTestId('button');
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalled();
    });
});
