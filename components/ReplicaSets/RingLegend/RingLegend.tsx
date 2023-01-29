import { ColorSwatch, Group, Text, useMantineTheme } from "@mantine/core";
import { getMaxReplicaColor, getMinReplicaColor, getOldReplicaColor, getNewReplicaColor } from "../ReplicaSet.colors";

export default function RingLegend() {
    const theme = useMantineTheme();

    return (
        <>
            <Group>
                <ColorSwatch color={getMinReplicaColor()} />
                <Text> min replicas </Text>
            </Group>

            <Group>
                <ColorSwatch color={getOldReplicaColor()} />
                <Text> old replicas </Text>
            </Group>

            <Group>
                <ColorSwatch color={getNewReplicaColor()} />
                <Text> new replicas </Text>
            </Group>

            <Group>
                <ColorSwatch color={getMaxReplicaColor()} />
                <Text> max replicas </Text>
            </Group>
        </>
    );
}