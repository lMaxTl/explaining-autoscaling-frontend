import SidebarCollapsed  from './SidebarCollapsed';
import { render, screen } from '@testing-library/react';

describe('SidebarCollapsed component', () => {
    it('should render the component with the correct number of bubbles', () => {
        // Act
        render(<SidebarCollapsed />);

        // Assert
        const bubbles = screen.getAllByTestId('bubble');
        expect(bubbles).toHaveLength(4);
    });
});