import PromQlCodeBlock from './PromQlCodeBlock';
import { render, screen } from '@testing-library/react';

describe('PromQlCodeBlock component', () => {
    it('should render the component with syntax highlighting', () => {
        // Arrange
        const code = 'sum(irate(node_cpu_seconds_total{mode="system"}[1m])) by (instance)';

        // Act
        render(<PromQlCodeBlock code={code} />);

        // Assert
        const codeBlock = screen.getByTestId('code-block');
        expect(codeBlock).toBeInTheDocument();
        expect(codeBlock).toHaveClass('language-promql');
    });
});
describe('PromQlCodeBlock component', () => {
    it('should apply syntax highlighting to the correct parts of the code', () => {
        // Arrange
        const code = 'sum(irate(node_cpu_seconds_total{mode="system"}[1m])) by (instance)';

        // Act
        render(<PromQlCodeBlock code={code} />);

        // Assert
        const codeBlock = screen.getByTestId('code-block');
        const keywordElements = codeBlock.querySelectorAll('.token.keyword');
        const functionElements = codeBlock.querySelectorAll('.token.function');

        expect(keywordElements).toHaveLength(2); 
        expect(functionElements).toHaveLength(1); 
    });
});