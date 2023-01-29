interface ConditionProps {
    message: string;
    reason: string;
    lastTransitionTime: string;
    status: string;
    type: string;
}

export interface ScalingConditionProps {
    _id: string;
    uid: string;
    deploymentName: string;
    namespace: string;
    createdAt: string;
    __v: number;
    conditions: ConditionProps[];
}