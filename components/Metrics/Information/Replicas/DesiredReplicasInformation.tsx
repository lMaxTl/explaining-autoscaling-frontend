import { Stack, Text } from "@mantine/core";
import { useStyles } from "./DesiredReplicasInformation.styles";
import { QueryInformationProps } from "./DesiredReplicasInformation.dto";

export default function QueryInformation({ currentReplicas, currentMetricValue, desiredMetricValue }: QueryInformationProps) {
    const { classes, cx } = useStyles();

    return (
        <Stack>
            <Text>desiredReplicas = ceil[currentReplicas * (currentMetricValue/desiredMetricValue)]</Text>
            <Text className={cx(classes.marginToFitEqualSign)}>= ceil[{currentReplicas} * ({currentMetricValue}/{desiredMetricValue})]</Text>
            <Text className={cx(classes.marginToFitEqualSign)}>= {Math.ceil(currentReplicas * (currentMetricValue / desiredMetricValue))}</Text>
        </Stack>
    );
}