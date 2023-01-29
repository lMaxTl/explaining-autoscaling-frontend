import React from 'react';
import { render } from '@testing-library/react';
import RowItem from './RowItem';

describe('RowItem', () => {
    it('should render the component', () => {
        const element = {
            _id: '123',
            name: 'test-deployment',
            namespace: 'test',
            createdAt: '2022-01-01',
            message: 'Test message',
            reason: 'SuccessfulRescale',
            replicaSize: 2,
            oldReplicaSize: 1,
            scalingType: 'scaleOut',
            metricType: 'CPU',
            __v: 0,
        };
        const { container } = render(<RowItem index={0} element={element} />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
