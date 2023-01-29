import { Node } from 'react-flow-renderer';
import { collectPodData } from '../../../helpers/DataCollection/PodData/collectPodData';

const initialNodes: Node[] = [
    {
        id: '1',
        type: "special",
        position: { x: 0, y: 150 },
        data: { name: 'ui-cs', status: 'pending', currentReplicas: 3, availableReplicas: 5, disableLeft: true },
    },
    {
        id: '2',
        type: "special",
        position: { x: 250, y: 150 },
        data: { name: 'uibackend-cs', status: 'unhealthy', currentReplicas: 0, availableReplicas: 3 },
    },
    {
        id: '3',
        type: "special",
        position: { x: 750, y: 0 },
        data: { name: 'inventory-cs', status: 'pending', currentReplicas: 2, availableReplicas: 1, disableRight: true },
    },
    {
        id: '4',
        type: "special",
        position: { x: 500, y: 300 },
        data: { name: 'cart-cs', status: 'healthy', currentReplicas: 1, availableReplicas: 1, disableRight: true },
    },
    {
        id: '5',
        type: "special",
        position: { x: 500, y: 150 },
        data: { name: 'orchestrator-cs', status: 'healthy', currentReplicas: 1, availableReplicas: 1 },
    },
    {
        id: '6',
        type: "special",
        position: { x: 750, y: 150 },
        data: { name: 'order-cs', status: 'healthy', currentReplicas: 1, availableReplicas: 1, disableRight: true },
    },
    {
        id: '7',
        type: "special",
        position: { x: 750, y: 450 },
        data: { name: 'creditinstitute-cs', status: 'healthy', currentReplicas: 1, availableReplicas: 1, disableRight: true },
    },
    {
        id: '8',
        type: "special",
        position: { x: 750, y: 300 },
        data: { name: 'payment-cs', status: 'healthy', currentReplicas: 1, availableReplicas: 1 },
    },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e2-4', source: '2', target: '4', animated: true },
    { id: 'e2-5', source: '2', target: '5', animated: true },
    { id: 'e5-3', source: '5', target: '3', animated: true },
    { id: 'e5-6', source: '5', target: '6', animated: true },
    { id: 'e5-8', source: '5', target: '8', animated: true },
    { id: 'e8-7', source: '8', target: '7', animated: true },
];

export default async function retrieveCustomPodData(eventTimestamp: string) {
    let nodes: Node[] = [];
    for (let node of initialNodes) {
        const podName = node.data.name.slice(0, -3);
        const podData = await collectPodData('default', podName, eventTimestamp);
        let nodeData = {
            id: node.id,
            type: node.type,
            position: node.position,
            data: {
                name: node.data.name,
                status: podData.status,
                currentReplicas: podData.replicas,
                availableReplicas: podData.availableReplicas,
                disableLeft: node.data.disableLeft !== undefined ? node.data.disableLeft : false,
                disableRight: node.data.disableRight !== undefined ? node.data.disableRight : false,
            }
        }
        nodes.push(nodeData);
    }


    return { nodes: nodes, edges: initialEdges };

}
