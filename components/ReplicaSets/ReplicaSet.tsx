import { Grid, RingProgress, Space, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { formatNewReplicaSetData } from "../../helpers/DataManipulators/ReplicaSet/formatNewReplicaSetData";
import { formatOldReplicaSetData } from "../../helpers/DataManipulators/ReplicaSet/formatOldReplicaSetData";
import EventDescription from "./EventDescription/EventDescription";
import EventInfo from "./EventInfo/EventInfo";
import { ReplicaSetsProps } from "./ReplicaSet.dto";
import RingLabel from "./RingLabel/RingLabel";
import RingLegend from "./RingLegend/RingLegend";

export default function ReplicaSet({oldReplicaSet, newReplicaSet, scalingType}: ReplicaSetsProps) {

    let oldReplicaSetSection: any = [];
    if(oldReplicaSet.name !== 'No old Replica Set') {
        oldReplicaSetSection = formatOldReplicaSetData(oldReplicaSet);
    }
    let newReplicaSetSection = formatNewReplicaSetData(newReplicaSet, oldReplicaSet.replicas);
    
    const router = useRouter();
    const eventName = router.asPath.split("/").pop();
    const truncatedEventName = eventName!.split("-").slice(0, -1).join("-");

    return (
        <>
            <Grid justify="center" align="center" gutter="xs" columns={24}>
                <Grid.Col span="content">
                    <RingProgress
                        size={260}
                        label={
                            <RingLabel podAmountCount={oldReplicaSet.replicas} replicaSetName={oldReplicaSet.name} />
                        }
                        sections={oldReplicaSetSection}
                    />
                </Grid.Col>
                <Grid.Col span="content">
                    <EventInfo scalingEventName={truncatedEventName!} scalingEventType={scalingType}/>
                </Grid.Col>
                <Grid.Col span="content">
                    <RingProgress
                        size={260}
                        label={
                            <RingLabel podAmountCount={newReplicaSet.replicas} replicaSetName={newReplicaSet.name} />
                        }
                        sections={newReplicaSetSection}
                    />
                </Grid.Col>
            </Grid>

            <Stack spacing="xs">
                <RingLegend />
            </Stack>

            <Space h="xl" />
        
            <EventDescription oldReplicas={oldReplicaSet.replicas} newReplicas={newReplicaSet.replicas} maxReplicas={newReplicaSet.maxReplicas} minReplicas={newReplicaSet.minReplicas} scalingType={scalingType}/>
        </>
    )
}