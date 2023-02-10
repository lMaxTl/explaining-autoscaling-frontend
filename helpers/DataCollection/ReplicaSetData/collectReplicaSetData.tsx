import { requestBackend } from "../../helper";

export async function collectReplicaSetData(eventId: string, serviceName: string) {
    const replicaSetData = await requestBackend({ path: '/events/' + eventId });
    const name = replicaSetData.name;
    const replicas = replicaSetData.replicaSize;
    

    const hpaConfigs = await requestBackend({ path: '/hpa' });
    const hpaNewConfig = await hpaConfigs.find((hpaConfig: any) => hpaConfig.deploymentName === serviceName);
    const minReplicas = hpaNewConfig.minReplicas;
    const maxReplicas = hpaNewConfig.maxReplicas;

    const replicaSetName = name[0].toUpperCase() + name.substring(1) + " Replica Set";
    const newData = {
        name: replicaSetName,
        deploymentName: hpaNewConfig.deploymentName,
        namespace: hpaNewConfig.namespace,
        metricType: replicaSetData.metricType,
        replicas: replicas,
        minReplicas: minReplicas,
        maxReplicas: maxReplicas
    }

    const oldReplicaId = replicaSetData.oldReplicaSetId;
    let replicaSetNameOld = "No old Replica Set";
    let replicasOld = 0;
    let metricTypeOld = "unknown";
    if (oldReplicaId != null) {
        const oldReplicaSetData = await requestBackend({ path: '/events/' + oldReplicaId });
        const nameOld = oldReplicaSetData.name;
        replicaSetNameOld = nameOld[0].toUpperCase() + nameOld.substring(1) + " Replica Set";
        replicasOld = oldReplicaSetData.replicaSize;
        metricTypeOld = oldReplicaSetData.metricType;
    }
    
    const oldData = {
        name: replicaSetNameOld,
        deploymentName: hpaNewConfig.deploymentName,
        namespace: hpaNewConfig.namespace,
        metricType: metricTypeOld,
        replicas: replicasOld,
        minReplicas: minReplicas,
        maxReplicas: maxReplicas
    }


    return { oldReplicaSet: oldData, newReplicaSet: newData, scalingType: replicaSetData.scalingType };


}
