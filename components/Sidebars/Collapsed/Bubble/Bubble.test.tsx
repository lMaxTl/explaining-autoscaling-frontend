import { Bubble } from './Bubble';
import { render, screen } from '@testing-library/react';

describe('Bubble component', () => {
    it('should render the component with a description and active state', () => {
        // Arrange
        const description = 'This is a test description';
        const active = true;

        // Act
        render(<Bubble description={description} active={active} />);

        // Assert
        const bubble = screen.getByTestId('bubble');
        expect(bubble).toBeInTheDocument();
        expect(bubble).toHaveAttribute('data-tip', description);
    });
});
