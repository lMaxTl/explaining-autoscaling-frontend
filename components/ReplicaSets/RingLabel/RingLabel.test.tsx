import RingLabel from './RingLabel';
import { render, screen } from '@testing-library/react';

describe('RingLabel component', () => {
    it('should render the correct replica set name and pod amount count', () => {
        // Arrange
        const replicaSetName = 'rs-1';
        const podAmountCount = 4;

        // Act
        render(<RingLabel replicaSetName={replicaSetName} podAmountCount={podAmountCount} />);

        // Assert
        const replicaSetNameText = screen.getByText(replicaSetName);
        expect(replicaSetNameText).toBeInTheDocument();

        const podAmountCountText = screen.getByText(podAmountCount);
        expect(podAmountCountText).toBeInTheDocument();
    });
});
