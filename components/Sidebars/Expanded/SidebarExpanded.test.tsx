import SidebarExpanded from './SidebarExpanded';
import { render, screen } from '@testing-library/react';

describe('SidebarExpanded component', () => {
    it('should render the component with the correct number of bubbles', () => {
        // Act
        render(<SidebarExpanded />);

        // Assert
        const bubbles = screen.getAllByTestId('bubble');
        expect(bubbles).toHaveLength(4);
    });
});