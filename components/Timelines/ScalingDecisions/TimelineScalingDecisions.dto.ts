interface ConditionProps {
    message: string;
    reason: string;
    lastTransitionTime: string;
    status: string;
    type: string;
}
export interface TimelineScalingDecisionsProps {
    _id: string;
    namespace: string;
    createdAt: string;
    __v: number;
    name?: string;
    reason?: string;
    message?: string;
    scalingType?: string;
    replicaSize?: number;
    metricType?: string;
    
    uid?: string;
    deploymentName?: string;
    conditions?: ConditionProps[];
}

