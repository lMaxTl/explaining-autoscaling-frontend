import  RingLegend  from './RingLegend';
import { render, screen } from '@testing-library/react';

describe('RingLegend component', () => {
    it('should render the correct legend items', () => {
        // Arrange
        const legendItems = ['min replicas', 'old replicas', 'new replicas', 'max replicas'];

        // Act
        render(<RingLegend />);

        // Assert
        legendItems.forEach(legendItem => {
            const legendItemText = screen.getByText(legendItem);
            expect(legendItemText).toBeInTheDocument();
        });
    });
});
