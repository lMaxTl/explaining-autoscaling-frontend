import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DynamicUrlTitle from './DynamicUrlTitle';

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({ asPath: '/events/fake-event-name' }),
}));

test('DynamicUrlTitle renders correctly', () => {
    const { getByText } = render(<DynamicUrlTitle />);

    expect(getByText('Events')).toBeInTheDocument();
    expect(getByText('fake-event-name')).toBeInTheDocument();
});
