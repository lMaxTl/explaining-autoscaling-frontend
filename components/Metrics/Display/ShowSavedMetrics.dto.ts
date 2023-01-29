export interface ShowSavedMetricsProps {
    metricName: string;
    targetedDeployment: string;
    metricQuery: string;
    targetValue: string;
    type: string;
    minReplicas: string;
    maxReplicas: string;
    createdAt: string;
}
