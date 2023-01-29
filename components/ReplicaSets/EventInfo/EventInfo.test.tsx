import EventInfo from './EventInfo';
import { render, screen } from '@testing-library/react';

describe('EventInfo component', () => {
    it('should render the correct event name and type', () => {
        // Arrange
        const scalingEventName = 'Scale Up';
        const scalingEventType = 'Test Event Type';

        // Act
        render(<EventInfo scalingEventName={scalingEventName} scalingEventType={scalingEventType} />);

        // Assert
        const eventNameText = screen.getByText(scalingEventName);
        expect(eventNameText).toBeInTheDocument();

        const eventTypeText = screen.getByText(scalingEventType);
        expect(eventTypeText).toBeInTheDocument();
    });
});
