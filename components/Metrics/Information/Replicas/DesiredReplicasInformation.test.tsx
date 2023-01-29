import React from 'react';
import { render } from '@testing-library/react';
import QueryInformation from './DesiredReplicasInformation';

describe('QueryInformation', () => {
    it('should render the correct equation and result', () => {
        const { getByText } = render(
            <QueryInformation currentReplicas={3} currentMetricValue={10} desiredMetricValue={15} />
        );

        expect(getByText('desiredReplicas = ceil[currentReplicas * (currentMetricValue/desiredMetricValue)]')).toBeInTheDocument();
        expect(getByText('= ceil[3 * (10/15)]')).toBeInTheDocument();
        expect(getByText('= 2')).toBeInTheDocument();
    });
    it('should round up to the nearest whole number', () => {
        const { getByText } = render(
            <QueryInformation currentReplicas={3} currentMetricValue={10} desiredMetricValue={14} />
        );

        expect(getByText('= 3')).toBeInTheDocument();
    });

});
