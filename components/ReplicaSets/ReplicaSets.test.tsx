import { screen, render } from '@testing-library/react';
import ReplicaSet from './ReplicaSet';

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));


describe('ReplicaSet', () => {
    it('renders the correct number of pods for the old and new replica sets', () => {
        const oldReplicaSet = {
            name: 'old-replica-set',
            namespace: 'test',
            deploymentName: 'test-deployment',
            metricType: 'cpu',
            replicas: 3,
            minReplicas: 1,
            maxReplicas: 5
        };
        const newReplicaSet = {
            name: 'new-replica-set',
            namespace: 'test',
            deploymentName: 'test-deployment',
            metricType: 'cpu',
            replicas: 5,
            minReplicas: 1,
            maxReplicas: 5
        };
        const scalingType = 'cpu';
        render(<ReplicaSet oldReplicaSet={oldReplicaSet} newReplicaSet={newReplicaSet} scalingType={scalingType} />);
        const replicaSetPods = screen.getAllByTestId('ring-label-pod-amount-count');
        expect(replicaSetPods).toHaveLength(2);
        expect(replicaSetPods[0]).toHaveTextContent('3');
        expect(replicaSetPods[1]).toHaveTextContent('5');
    });
});
