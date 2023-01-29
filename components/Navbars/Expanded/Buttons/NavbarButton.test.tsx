import { render, fireEvent, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { NavbarButton } from './NavbarButton';
import { IconExclamationMark } from '@tabler/icons';

describe('NavbarButton', () => {
    it('renders the label and icon', () => {
        const { getByText, getByTestId } = render(
            <NavbarButton icon={IconExclamationMark} label="Button" />
        );
        expect(getByText('Button')).toBeInTheDocument();
        const icon = getByTestId('navbarbutton-icon');
        expect(icon).toHaveClass('icon-tabler-exclamation-mark');
    });

    it('calls the "onClick" prop when clicked', () => {
        const onClick = jest.fn();
        const { getByText } = render(
            <NavbarButton icon={IconExclamationMark} label="Button" onClick={onClick} />
        );
        fireEvent.click(getByText('Button'));
        expect(onClick).toHaveBeenCalled();
    });
});
