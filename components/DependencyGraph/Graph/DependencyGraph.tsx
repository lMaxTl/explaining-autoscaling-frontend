import { useMantineTheme } from '@mantine/core';
import { useCallback, useMemo } from 'react';
import ReactFlow, { Edge, Node } from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';
import { CustomNode } from '../Node/CustomNode';

export function DependencyGraph(graphProps: any) {
    const theme = useMantineTheme();
    const nodeTypes = useMemo(() => ({ special: CustomNode }), []);
    const initialNodes = graphProps.graphProps.nodes;
    const initialEdges = graphProps.graphProps.edges;

    const graphStyles = { width: "100%", height: "500px" };

    return (
        <ReactFlow panOnDrag={false} zoomOnScroll={false} zoomOnDoubleClick={false} nodeTypes={nodeTypes} defaultNodes={initialNodes} defaultEdges={initialEdges} fitView style={graphStyles} />
    );
}