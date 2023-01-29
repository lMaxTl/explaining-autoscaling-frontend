import { Paper, SimpleGrid, Text } from "@mantine/core";
import { Handle, Position } from 'react-flow-renderer';
import { useStyles } from "./CustomNode.styles"



export function CustomNode({ data }: any) {
    const { classes, cx } = useStyles();
    return (
        <>
            {!(data.disableLeft) ? (<Handle type="target" position={Position.Left} isConnectable={false} />) : null}

            <Paper className={cx(classes.darkBackground)} p="md">
                <Text>{data.name}</Text>

                {(data.status === "True") ?
                    (<Paper className={cx(classes.replicaBullet, classes.replicaHealthy)}>{data.currentReplicas}/{data.availableReplicas}</Paper>)
                : (data.status === "False") ?
                    (<Paper className={cx(classes.replicaBullet, classes.replicaUnhealthy)}>{data.currentReplicas}/{data.availableReplicas}</Paper>)
                : (data.status === "Unknown") ?
                    (<Paper className={cx(classes.replicaBullet, classes.replicaPending)}>{data.currentReplicas}/{data.availableReplicas}</Paper>)
                : (null)}

            </Paper>

            {!(data.disableRight) ? (<Handle type="source" position={Position.Right} isConnectable={false} />) : null}

        </>
    );
}