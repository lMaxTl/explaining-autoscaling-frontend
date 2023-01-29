import { extractMetricName, formatDate, requestBackend } from "../../helper";

export async function collectActiveHPAData() {
    const configurations = await requestBackend({ path: '/hpa' });

    let data = [];
    for(let config of configurations) {
        for (let metric of config.currentMetrics) {
            data.push({
                metricName: extractMetricName(metric.metricName),
                targetedDeployment: config.namespace + "/" + config.deploymentName,
                metricQuery: metric.query,
                targetValue: metric.targetValue,
                type: metric.type,
                minReplicas: config.minReplicas,
                maxReplicas: config.maxReplicas,
                createdAt: formatDate(config.createdAt),
            });
        }
    }

    return data;
}