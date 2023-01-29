import React from 'react';
import { render } from '@testing-library/react';
import ScalingItem from './ScalingItem';

jest.mock('../../../../helpers/helper', () => ({
    extractReason: jest.fn().mockReturnValue('fake-extracted-reason'),
    formatDate: jest.fn().mockReturnValue('fake-formatted-date'),
}));

const props = {
    data: {
        _id: 'fake-id',
        namespace: 'fake-namespace',
        name: 'fake-name',
        scalingType: 'scaleOut',
        replicaSize: 10,
        createdAt: 'fake-created-at',
        __v: 0,
        metricType: 'fake-metric-type',
        message: 'fake-message',
    },
};

test('ScalingItem renders correctly', () => {
    const { getByText } = render(<ScalingItem {...props} />);

    expect(getByText("The component fake-name was scaled out to a replica size of 10 because fake-extracted-reason.")).toBeInTheDocument();
    expect(getByText("fake-namespace/fake-name - fake-metric-type")).toBeInTheDocument();
    expect(getByText("fake-formatted-date")).toBeInTheDocument();
});
