import { render, screen } from '@testing-library/react';
import MetricTimelineDecisions from './TimelineScalingDecisionsWithMetric';

describe('MetricTimelineDecisions component', () => {
    it('should render the component with chart data', () => {
        // Arrange
        const chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    label: 'Metric 1',
                    data: [65, 59, 80, 81, 56, 55],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    pointRadius: 0
                }
            ]
        };
        const timelineData = [
            {
                _id: '1',
                namespace: 'test-namespace',
                createdAt: '2022-01-01T00:00:00.000Z',
                __v: 0,
                name: 'Test Scaling Decision',
                scalingType: 'up',
                replicaSize: 2,
                metricType: 'cpu',
                uid: 'test-uid',
                deploymentName: 'test-deployment'
            }
        ];

        // Act
        render(<MetricTimelineDecisions chartData={chartData} timelineData={timelineData} />);

        // Assert
        const chart = screen.getByTestId('chart');
        expect(chart).toBeInTheDocument();
    });

    it('should render the component with timeline data', () => {
        // Arrange
        const chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    label: 'Metric 1',
                    data: [65, 59, 80, 81, 56, 55],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    pointRadius: 0
                }
            ]
        };
        const timelineData = [
            {
                _id: '1',
                namespace: 'test-namespace',
                createdAt: '2022-01-01T00:00:00.000Z',
                __v: 0,
                name: 'Test Scaling Decision',
                scalingType: 'up',
                replicaSize: 2,
                metricType: 'cpu',
                uid: 'test-uid',
                deploymentName: 'test-deployment'
            }
        ];

        // Act
        render(<MetricTimelineDecisions chartData={chartData} timelineData={timelineData} />);

        // Assert
        const timeline = screen.getByTestId('timeline');
        expect(timeline).toBeInTheDocument();
        expect(timeline).toHaveTextContent('Test Scaling Decision');
    });
});