import { render } from '@testing-library/react';
import { DependencyGraph } from './DependencyGraph';

describe('DependencyGraph', () => {
    it('should render the graph with the correct nodes and edges', () => {
        const graphProps = {
            nodes: [
                {
                    id: 'node-1',
                    name: 'Node 1',
                    status: 'True',
                    currentReplicas: 1,
                    availableReplicas: 1,
                    disableLeft: true,
                    disableRight: false,
                },
                {
                    id: 'node-2',
                    name: 'Node 2',
                    status: 'False',
                    currentReplicas: 1,
                    availableReplicas: 1,
                    disableLeft: false,
                    disableRight: false,
                },
                {
                    id: 'node-3',
                    name: 'Node 3',
                    status: 'Unknown',
                    currentReplicas: 1,
                    availableReplicas: 1,
                    disableLeft: false,
                    disableRight: true,
                },
            ],
            edges: [
                {
                    source: 'node-1',
                    target: 'node-2',
                },
                {
                    source: 'node-2',
                    target: 'node-3',
                },
            ],
        };
        const { getByText } = render(<DependencyGraph graphProps={graphProps} />);
        const node1 = getByText('Node 1');
        const node2 = getByText('Node 2');
        const node3 = getByText('Node 3');
        expect(node1).toBeInTheDocument();
        expect(node2).toBeInTheDocument();
        expect(node3).toBeInTheDocument();
    });
});
