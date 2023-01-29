import React from 'react';
import { render, screen } from '@testing-library/react';
import ShowSavedMetrics from './ShowSavedMetrics';

describe('ShowSavedMetrics', () => {
    it('should render the table with the given metrics', () => {
        
        const metrics = [
            {
                metricName: 'cpu_utilization',
                targetedDeployment: 'deployment1',
                metricQuery: 'avg(rate(container_cpu_usage_seconds_total{namespace="namespace1"}[1m]))',
                targetValue: '70',
                type: 'Utilization',
                minReplicas: '1',
                maxReplicas: '5',
                createdAt: '2022-12-29T12:34:56Z',
            },
            {
                metricName: 'memory_utilization',
                targetedDeployment: 'deployment2',
                metricQuery: 'avg(container_memory_working_set_bytes{namespace="namespace2"}) / avg(container_spec_memory_limit_bytes{namespace="namespace2"})',
                targetValue: '80',
                type: 'Utilization',
                minReplicas: '2',
                maxReplicas: '10',
                createdAt: '2022-12-29T12:34:56Z',
            },
        ];

        render(<ShowSavedMetrics metrics={metrics} />);

        expect(screen.getByText('cpu_utilization')).toBeInTheDocument();
        expect(screen.getByText('deployment1')).toBeInTheDocument();
        expect(screen.getByText('avg(rate(container_cpu_usage_seconds_total{namespace="namespace1"}[1m]))')).toBeInTheDocument();
        expect(screen.getByText('70')).toBeInTheDocument();
        expect(screen.getByText('Utilization')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('2022-12-29T12:34:56Z')).toBeInTheDocument();

        expect(screen.getByText('memory_utilization')).toBeInTheDocument();
        expect(screen.getByText('deployment2')).toBeInTheDocument();
        expect(screen.getByText('avg(container_memory_working_set_bytes{namespace="namespace2"}) / avg(container_spec_memory_limit_bytes{namespace="namespace2"})')).toBeInTheDocument();
        expect(screen.getByText('80')).toBeInTheDocument();
        expect(screen.getByText('Utilization')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('2022-12-29T12:34:56Z')).toBeInTheDocument();
    });
});
