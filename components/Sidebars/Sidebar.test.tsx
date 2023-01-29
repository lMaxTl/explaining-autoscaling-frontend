import  Sidebar from './Sidebar';
import { render, screen } from '@testing-library/react';

describe('Sidebar component', () => {
    it('should render the Collapsed version of the component when the screen is medium size', () => {
        // Arrange
        const mockMatchMedia = jest.fn().mockImplementation((query) => {
            return {
                matches: query === '(min-width: 1400px)' ? false : query === '(min-width: 1135px)' ? true : false,
                addListener: jest.fn(),
                removeListener: jest.fn(),
            };
        });
        window.matchMedia = mockMatchMedia;

        // Act
        render(<Sidebar />);

        // Assert
        const sidebarCollapsed = screen.getByTestId('sidebar-collapsed');
        expect(sidebarCollapsed).toBeInTheDocument();
    });
    it('should render the Expanded version of the component when the screen is large', () => {
        // Arrange
        const mockMatchMedia = jest.fn().mockImplementation((query) => {
            return {
                matches: query === '(min-width: 1400px)' ? true : query === '(min-width: 1135px)' ? false : false,
                addListener: jest.fn(),
                removeListener: jest.fn(),
            };
        });
        window.matchMedia = mockMatchMedia;

        // Act
        render(<Sidebar />);

        // Assert
        const sidebarExpanded = screen.getByTestId('sidebar-expanded');
        expect(sidebarExpanded).toBeInTheDocument();
    });
});
