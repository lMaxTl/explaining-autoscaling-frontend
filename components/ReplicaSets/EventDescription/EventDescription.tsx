import {  Text } from "@mantine/core";
import { EventDescriptionProps } from "./EventDescription.dto";

export default function EventDescription({oldReplicas, newReplicas, maxReplicas, minReplicas, scalingType}: EventDescriptionProps) {

    return (
        <>
            {scalingType == 'scaleIn' ?
                (<Text>The ReplicaSet was scaled in from {oldReplicas} to {newReplicas} Pods. In general, this ReplicaSet has a maximum of {maxReplicas} Pods and at least {minReplicas} active Pod.</Text>)
                :
                (<Text>The ReplicaSet was scaled out from {oldReplicas} to {newReplicas} Pods. In general, this ReplicaSet has a maximum of {maxReplicas} Pods and at least {minReplicas} active Pod.</Text>)
            }
        </>
    );
}