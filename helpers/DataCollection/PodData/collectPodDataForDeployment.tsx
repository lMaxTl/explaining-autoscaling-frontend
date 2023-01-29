import { requestBackend } from "../../helper";

export async function collectPodDataForDeployment(namespace:string, deploymentName:string, eventTimestamp:string) {
    const podData = await requestBackend({ path: '/pod-metrics/' + namespace + '/' + deploymentName + '/' + eventTimestamp});
    return podData;
}