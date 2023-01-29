import { requestBackend } from "../../helper";

export async function collectPodData(namespace: string, deploymentName: string, eventTimestamp: string) {
    const podData = await requestBackend({ path: '/deployment-information/' + namespace + '/' + deploymentName + '/' + eventTimestamp});

    const currentReplicas = podData.replicas;
    const availableReplicas = podData.availableReplicas;
    const conditions = podData.conditions;
    let status = "Unknown";
    for (let condition of conditions) {
        if (condition.reason == "NewReplicaSetAvailable") {
            status = condition.status;
        }
    }

    return {
        replicas: currentReplicas,
        availableReplicas: availableReplicas,
        status: status,
    };

}