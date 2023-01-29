export interface EventDescriptionProps {
    oldReplicas: number;
    newReplicas: number;
    maxReplicas: number;
    minReplicas: number;
    scalingType: string;
}