import { Container, Space } from "@mantine/core";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { UiCard } from "../../components/Cards/UiCard/UiCard";
import { DependencyGraph } from "../../components/DependencyGraph/Graph/DependencyGraph";
import retrieveCustomPodData from "../../components/DependencyGraph/Graph/DependencyGraph.custom.data";
import QueryInformation from "../../components/Metrics/Information/Query/QueryInformation";
import DesiredReplicasInformation from "../../components/Metrics/Information/Replicas/DesiredReplicasInformation";
import PodInformationTable from "../../components/Pods/Information/PodInformationTable";
import ReplicaSet from "../../components/ReplicaSets/ReplicaSet";
import { ReplicaSetsProps } from "../../components/ReplicaSets/ReplicaSet.dto";
import Sidebar from "../../components/Sidebars/Sidebar";
import MetricTimelineDecisions from "../../components/Timelines/ScalingDecisionsWithMetric/TimelineScalingDecisionsWithMetric";
import DynamicUrlTitle from "../../components/Titles/DynamicUrlTitle";
import { collectMetricData, retrieveMetricQuery } from "../../helpers/DataCollection/MetricData/collectMetricData";
import { collectPodDataForDeployment } from "../../helpers/DataCollection/PodData/collectPodDataForDeployment";
import { collectReplicaSetData } from "../../helpers/DataCollection/ReplicaSetData/collectReplicaSetData";
import { collectTimelineDataFor } from "../../helpers/DataCollection/Timelines/collectTimelineData";
import { getNewestAndOldestTimestampsFromEvents } from "../../helpers/DataCollection/Timelines/getTimestampsFromEvents";
import { parseIfLastCharacterIsM } from "../../helpers/helper";
import { DetailsPageProps } from "../../helpers/Types/DetailsPageProps.dto";

export default function DetailsPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
 
    return (
        <Container my="md">
            <Sidebar />

            <DynamicUrlTitle/>
            
            <Space h="md" />

            <UiCard title={"Replica Sets"} id="replicaSet" description="The ReplicaSet component consists of three parts, on the left side the replica set is displayed before the scaling event, in the middle it shows what kind of scaling happened, and on the right, the replica set is displayed after the scaling event. The elements each consist of two parts. In the center, the active pods are plotted and on the outside, there is a progress ring that visualizes the maximum, minimum number of pods, as well as the current and newly added pods.">
                <ReplicaSet oldReplicaSet={data.replicaSets.oldReplicaSet} newReplicaSet={data.replicaSets.newReplicaSet} scalingType={data.replicaSets.scalingType} />
            </UiCard>

            <Space h="md" />
            
            <UiCard title={"Metric: " + data.metricName.toUpperCase()} id="metricTimeline">
                <MetricTimelineDecisions chartData={data.metricData} timelineData={data.timelineData}  />
            </UiCard>

            <Space h="md" />
            
            <UiCard title={"Query"} id="query">
                <QueryInformation queryInfo={data.metricQuery}  />
            </UiCard>

            <Space h="md" />

            <UiCard title={"Desired Replicas"} description="Calculates the desired replica value, which Kubernetes uses to define how many replicas are needed. It scales out if the current metric value is larger than the desired metric value, and scales in if it is smaller.This only works if a previous scale-out event was found.">
                <DesiredReplicasInformation currentReplicas={data.replicaInformation.currentReplicas} currentMetricValue={data.replicaInformation.currentMetricValue} desiredMetricValue={data.replicaInformation.desiredMetricValue} />
            </UiCard>

            <Space h="md" />

          {/* <UiCard title={"Pods"}>
                <PodInformationTable data={data.podInformationData} />
    </UiCard>*/}

            <UiCard title={"Possible Affected Deployments"} id="dependencyChart" description="This graph shows the components of the Monitored System. In each card element the name of the deployment is shown, as well as the current pods to the desired pods in the bottom right corner. There are three different states that the element at the bottom right can take. If the element is green, it means that the desired pods have been reached, if the element is yellow, then scaling is currently in progress, if it is red, then an error occurred during scaling.">
                <DependencyGraph graphProps={data.dependencyGraphData} />
            </UiCard>

        </Container>
    )
}

export const getServerSideProps: GetServerSideProps<{ data: DetailsPageProps }> = async (context) => {
    const eventName = context.params!.details!.toString();
    const eventID = eventName!.split("-").pop();
    const serviceName = eventName!.split("-").at(0);



    const replicaSetData = await collectReplicaSetData(eventID!, serviceName!);

    const { namespace, deploymentName, metricName, metricData, timelineData, eventTimestamp } = await collectMetricTimelineData(eventID!, replicaSetData);
    const { metricQuery, targetValue } = await retrieveMetricQuery(namespace, deploymentName, metricName);

    const currentMetricsValue = getCurrentMetricValue(metricData, eventTimestamp);


    let replicaInformation = {
        currentReplicas: replicaSetData.oldReplicaSet.replicas,
        desiredMetricValue: parseIfLastCharacterIsM(targetValue),
        currentMetricValue: currentMetricsValue,
    } 

    //const podInformationData = await collectPodDataForDeployment(namespace, deploymentName, eventTimestamp);

    
    const dependencyGraphData = await retrieveCustomPodData(eventTimestamp);


    const data = {
        replicaSets: replicaSetData,
        metricName: metricName,
        metricData: metricData,
        timelineData: timelineData,
        metricQuery: metricQuery,
        replicaInformation: replicaInformation,
        //podInformationData: podInformationData,
        dependencyGraphData: dependencyGraphData,
    }
    return {
        props: {
            data: data
        }
    };
}

function getCurrentMetricValue(metricData:any, eventTimestamp: any) {
    if(metricData.labels.length === 0) return 0;
    const metricTimestamp = metricData.labels?.reduce((prev: any, curr: any) => {
        const eventDate = new Date(Date.parse(eventTimestamp)).getTime();
        const currDate = new Date(Date.parse(curr)).getTime();
        const prevDate = new Date(Date.parse(prev)).getTime();
        return (Math.abs(currDate - eventDate) < Math.abs(prevDate - eventDate) ? curr : prev);
    });
    const metricsValue = metricData.datasets[0].data[metricData.labels!.indexOf(metricTimestamp)];
    const currentMetricsValue = metricsValue ? parseFloat(Number(metricsValue).toFixed(2)):0;
    return currentMetricsValue;
}

async function collectMetricTimelineData(eventId:string, replicaSetData: ReplicaSetsProps) {
    const namespace = replicaSetData.newReplicaSet.namespace;
    const deploymentName = replicaSetData.newReplicaSet.deploymentName;
    const { eventTimestamp, timelineData} = await collectTimelineDataFor(namespace, deploymentName, eventId, 5);
    const { newestTimestamp, oldestTimestamp } = await getNewestAndOldestTimestampsFromEvents(timelineData);
    const metricName = replicaSetData.newReplicaSet.metricType;
    const metricData = await collectMetricData(namespace, deploymentName, metricName, oldestTimestamp, newestTimestamp);
    return { namespace, deploymentName, metricName, metricData, timelineData, eventTimestamp };
}
