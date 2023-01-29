export interface ReplicaSetProps {
    name: string;
    namespace: string;
    deploymentName: string;
    metricType: string;
    replicas: number;
    minReplicas: number;
    maxReplicas: number;
}


export interface ReplicaSetsProps {
    oldReplicaSet: ReplicaSetProps;
    newReplicaSet: ReplicaSetProps;
    scalingType: string;
}
