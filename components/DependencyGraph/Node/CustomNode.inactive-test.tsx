import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CustomNode } from './CustomNode';

describe('CustomNode', () => {
    it('should render the component with correct data', () => {
        const data = {
            name: 'My Deployment',
            status: 'True',
            currentReplicas: 3,
            availableReplicas: 5,
            disableLeft: false,
            disableRight: false,
        };

        render(<CustomNode data={data} />);

        expect(screen.getByText('My Deployment')).toBeInTheDocument();
        expect(screen.getByText('3/5')).toBeInTheDocument();
        expect(screen.getByTestId('target-handle')).toBeInTheDocument();
        expect(screen.getByTestId('source-handle')).toBeInTheDocument();
    });

    it('should render the component with correct data and disable the handles', () => {
        const data = {
            name: 'My Deployment',
            status: 'True',
            currentReplicas: 3,
            availableReplicas: 5,
            disableLeft: true,
            disableRight: true,
        };

        render(<CustomNode data={data} />);

        expect(screen.getByText('My Deployment')).toBeInTheDocument();
    });
});

