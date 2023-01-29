interface SizeElement {
    old: number;
    new: number;
}

export interface EventProps {
    _id: string;
    name: string;
    namespace: string;
    createdAt: string;
    message: string;
    reason: string;
    replicaSize: number;
    oldReplicaSize: number;
    scalingType: string;
    metricType: string;
    __v: number;
}
