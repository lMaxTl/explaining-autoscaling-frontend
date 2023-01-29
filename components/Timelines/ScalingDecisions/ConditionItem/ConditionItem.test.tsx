import React from 'react';
import { getAllByText, MatcherFunction, render, SelectorMatcherOptions } from '@testing-library/react';
import ConditionItem from './ConditionItem';

jest.mock('../../../../helpers/helper', () => ({
    formatDate: jest.fn().mockReturnValue('fake-formatted-date'),
}));

const props = {
    data: {
        _id: 'fake-id',
        namespace: 'fake-namespace',
        deploymentName: 'fake-deployment-name',
        createdAt: 'fake-created-at',
        __v: 0,
        conditions: [
            {
                message: 'fake-message',
                reason: 'fake-reason',
                lastTransitionTime: 'fake-last-transition-time',
                status: 'fake-status',
                type: 'fake-type',
            },
        ],
    },
};
test('ConditionItem renders correctly', () => {
    const { getByText } = render(<ConditionItem {...props} />);

    expect(getByText('fake-type was changed to fake-status')).toBeInTheDocument();
    expect(getByText('fake-namespace/fake-deployment-name')).toBeInTheDocument();
    expect(getByText('fake-formatted-date')).toBeInTheDocument();
});

test('ConditionItem handles multiple conditions correctly', () => {
    const multipleConditionsProps = {
        ...props,
        data: {
            ...props.data,
            conditions: [
                {
                    message: 'fake-message-1',
                    reason: 'fake-reason-1',
                    lastTransitionTime: 'fake-last-transition-time-1',
                    status: 'fake-status-1',
                    type: 'fake-type-1',
                },
                {
                    message: 'fake-message-2',
                    reason: 'fake-reason-2',
                    lastTransitionTime: 'fake-last-transition-time-2',
                    status: 'fake-status-2',
                    type: 'fake-type-2',
                },
                {
                    message: 'fake-message-3',
                    reason: 'fake-reason-3',
                    lastTransitionTime: 'fake-last-transition-time-3',
                    status: 'fake-status-3',
                    type: 'fake-type-3',
                },
            ],
        },
    };

    const { getByText } = render(<ConditionItem {...multipleConditionsProps} />);
    const expectedText = "The conditions fake-type-1, fake-type-2, fake-type-3 were changed to fake-status-1, fake-status-2, fake-status-3 ";

    let textContent = getByText((content) => {
        return content.includes('The conditions') && content.includes('were changed to');
    }).textContent

    // remove whitespace
    textContent = textContent!.replace(/\s/g, '');

    // check if text content matches the expected text
    expect(textContent).toEqual(expectedText.replace(/\s/g, ''));


    
});
