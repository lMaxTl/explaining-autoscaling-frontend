export interface EventProps {
    _id: string;
    createdAt: string;
    name: string;
    namespace: string;
    reason: string;
    message: string;
    scalingType: string;
    replicaSize: number;
    metricType: string;
    oldReplicaSetId?: string;
    __v: number;
}