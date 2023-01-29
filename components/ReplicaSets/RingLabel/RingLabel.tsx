import { Grid, Text } from "@mantine/core";
import { useStyles } from "./RingLabel.styles";
import { RingLabelProps } from "./RingLabel.dto";

export default function RingLabel({ podAmountCount, replicaSetName }: RingLabelProps) {
    const { classes, cx } = useStyles();

    return (
        <Grid justify="center" align="center" className={cx(classes.centerTextInRing)}>
            <Grid.Col span={12}>
                <Text size="xs" align="center">
                    {replicaSetName}
                </Text>
            </Grid.Col>
            <Grid.Col span={12}>
                <Text data-testid="ring-label-pod-amount-count" className={cx(classes.podAmountCount)}>
                    {podAmountCount}
                </Text>
            </Grid.Col>
            <Grid.Col span={12}>
                <Text>
                    Pods
                </Text>
            </Grid.Col>
        </Grid>
    );
}