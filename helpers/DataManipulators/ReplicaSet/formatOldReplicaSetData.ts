import { ReplicaSetProps } from "../../../components/ReplicaSets/ReplicaSet.dto";
import { getMaxReplicaColor, getMinReplicaColor, getOldReplicaColor, getNewReplicaColor } from "../../../components/ReplicaSets/ReplicaSet.colors";
import { insertBreakColors } from "./helper";

export function formatOldReplicaSetData(oldReplicaSet: ReplicaSetProps) {
    let replicaSetSection: any = [];

    let value = (100 / oldReplicaSet.maxReplicas) - 0.3;
    for (let i = 0; i < oldReplicaSet.maxReplicas; i++) {
        if (i < oldReplicaSet.minReplicas) {
            replicaSetSection.push({
                value: value,
                color: getMinReplicaColor()
            });
        }
        else if (i < oldReplicaSet.replicas && i >= oldReplicaSet.minReplicas) {
            replicaSetSection.push({
                value: value,
                color: getOldReplicaColor()
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