import { render, screen } from '@testing-library/react';
import ShowSavedEvents from './ShowSavedEvents';

describe('ShowSavedEvents', () => {
    it('renders the correct information for each event', () => {
        const events = [
            {
                _id: '1',
                name: 'my-deployment',
                namespace: 'default',
                createdAt: '2022-01-01T00:00:00.000Z',
                message: 'Scaled deployment to 5 replicas',
                reason: 'SuccessfulRescale',
                replicaSize: 5,
                oldReplicaSize: 3,
                scalingType: 'scaleOut',
                metricType: 'cpu',
                __v: 0,
            },
            {
                _id: '2',
                name: 'other-deployment',
                namespace: 'default',
                createdAt: '2022-01-02T00:00:00.000Z',
                message: 'Scaled deployment to 3 replicas',
                reason: 'SuccessfulRescale',
                replicaSize: 3,
                oldReplicaSize: 5,
                scalingType: 'scaleIn',
                metricType: 'cpu',
                __v: 0,
            },
        ];

        render(<ShowSavedEvents events={events} />);

        // Verify that the correct information is displayed for each event
        expect(screen.getByText('2022-1-1 1:00:0')).toBeInTheDocument();
        expect(screen.getByText('default/my-deployment')).toBeInTheDocument();
        expect(screen.getByText('scaleOut')).toBeInTheDocument();
        expect(screen.getAllByText('cpu')[0]).toBeInTheDocument();
        expect(screen.getAllByText('SuccessfulRescale')[0]).toBeInTheDocument();

        expect(screen.getByText('2022-1-2 1:00:0')).toBeInTheDocument();
        expect(screen.getByText('default/other-deployment')).toBeInTheDocument();
        expect(screen.getByText('scaleIn')).toBeInTheDocument();
        expect(screen.getAllByText('cpu')[1]).toBeInTheDocument();
        expect(screen.getAllByText('SuccessfulRescale')[1]).toBeInTheDocument();
    });
});
