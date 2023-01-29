import { TimelineScalingDecisions } from './TimelineScalingDecisions';
import { render, screen } from '@testing-library/react';

jest.mock('../../../helpers/helper', () => ({
    extractReason: jest.fn().mockReturnValue('fake-extracted-reason'),
    formatDate: jest.fn().mockReturnValue('fake-formatted-date'),
}));



describe('TimelineScalingDecisions component', () => {
    it('should render the component with scaling decision data', () => {
        // Arrange
        const data = [
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
        render(<TimelineScalingDecisions data={data} />);

        // Assert
        const scalingItem = screen.getByTestId('scaling-item');
        expect(scalingItem).toBeInTheDocument();
        expect(scalingItem).toHaveTextContent('Test Scaling Decision');
    });

    it('should render the component with condition data', () => {
        // Arrange
        const data = [
            {
                _id: '1',
                namespace: 'test-namespace',
                createdAt: '2022-01-01T00:00:00.000Z',
                __v: 0,
                message: 'Test condition message',
                reason: 'Test condition reason',
                lastTransitionTime: '2022-01-01T00:00:00.000Z',
                status: 'True',
                type: 'TestType',
                uid: 'test-uid',
                deploymentName: 'test-deployment',
                conditions: [
                    {
                        message: 'fake-message-2 reason: fake-reason-2, status: fake-status-2, type: fake-type-2, lastTransitionTime: fake-last-transition-time-2',
                        reason: 'fake-reason-2',
                        lastTransitionTime: 'fake-last-transition-time-2',
                        status: 'fake-status-2',
                        type: 'fake-type-2',
                    },
                ],
            }
        ];

        // Act
        render(<TimelineScalingDecisions data={data} />);

        // Assert
        const conditionItem = screen.getByTestId('condition-item');
        expect(conditionItem).toBeInTheDocument();
        expect(conditionItem).toHaveTextContent('The condition fake-type-2 was changed to fake-status-2test-namespace/test-deploymentfake-formatted-date');
    });
});
