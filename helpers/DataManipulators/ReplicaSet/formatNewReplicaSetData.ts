import { ReplicaSetProps } from "../../../components/ReplicaSets/ReplicaSet.dto";
import { getMaxReplicaColor, getMinReplicaColor, getOldReplicaColor, getNewReplicaColor } from "../../../components/ReplicaSets/ReplicaSet.colors";
import { insertBreakColors } from "./helper";

export function formatNewReplicaSetData(newReplicaSet: ReplicaSetProps, oldReplicaCount: number) {
    if (oldReplicaCount > newReplicaSet.replicas) {
        return formatScaleIn(newReplicaSet, oldReplicaCount);
    } else if (oldReplicaCount < newReplicaSet.replicas) {
        return formatScaleOut(newReplicaSet, oldReplicaCount);
    } else {
        console.log('[!] No change in replica count ???');
        return formatScaleIn(newReplicaSet, oldReplicaCount);
    }

}

function formatScaleOut(newReplicaSet: ReplicaSetProps, oldReplicaCount: number) {
    let replicaSetSection: any = [];

    let value = (100 / newReplicaSet.maxReplicas) - 0.3;
    for (let i = 0; i < newReplicaSet.maxReplicas; i++) {
        if (i < newReplicaSet.minReplicas) {
            replicaSetSection.push({
                value: value,
                color: getMinReplicaColor()
            });
        }
        else if (i < oldReplicaCount && i >= newReplicaSet.minReplicas) {
            replicaSetSection.push({
                value: value,
                color: getOldReplicaColor()
            });
        }
        else if (i < newReplicaSet.replicas && i >= oldReplicaCount && i >= newReplicaSet.minReplicas) {
            replicaSetSection.push({
                value: value,
                color: getNewReplicaColor()
            });
        }
        else {
            replicaSetSection.push({
                value: value,
                color: getMaxReplicaColor()
            });
        }
    }
    insertBreakColors(replicaSetSection);
    return replicaSetSection;
}

function formatScaleIn(newReplicaSet: ReplicaSetProps, oldReplicaCount: number) {
    let replicaSetSection: any = [];

    let value = (100 / newReplicaSet.maxReplicas) - 0.3;
    for (let i = 0; i < newReplicaSet.maxReplicas; i++) {
        if (i < newReplicaSet.minReplicas) {
            replicaSetSection.push({
                value: value,
                color: getMinReplicaColor()
            });
        }
        else if (i < newReplicaSet.replicas && i >= newReplicaSet.minReplicas) {
            replicaSetSection.push({
                value: value,
                color: getNewReplicaColor()
            });
        } else {
            replicaSetSection.push({
                value: value,
                color: getMaxReplicaColor()
            });
        }
    }
    insertBreakColors(replicaSetSection);
    return replicaSetSection;
}

