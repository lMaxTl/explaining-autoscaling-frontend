import { render, screen } from '@testing-library/react';
import { UiCard } from './UiCard';

describe('UiCard component', () => {
    it('has correct title', () => {
        render(<UiCard title="test" children={undefined}/>);
        expect(screen.getByText('test')).toBeInTheDocument();
    });
    it('has correct children', () => {
        render(<UiCard title="title" children={<div data-testid="sample-child">test</div>}/>);
        expect(screen.getByTestId('sample-child')).toBeInTheDocument();
    });
});