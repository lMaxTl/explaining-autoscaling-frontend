import { ChartData } from "chart.js";
import { ReplicaSetsProps } from "../../components/ReplicaSets/ReplicaSet.dto";
import { TimelineScalingDecisionsProps } from "../../components/Timelines/ScalingDecisions/TimelineScalingDecisions.dto";
import { Node, Edge } from 'react-flow-renderer';
import { PodInformationTableProps } from "../../components/Pods/Information/PodInformationTable.dto";

interface ReplicaInformationProps {
    currentReplicas: number;
    currentMetricValue: number;
    desiredMetricValue: number;
}

interface DependencyGraphDataProps {
    nodes: Node[];
    edges: Edge[];
}


export interface DetailsPageProps {
    replicaSets: ReplicaSetsProps;
    timelineData: TimelineScalingDecisionsProps[];
    metricName: string;
    metricData: ChartData<'line'>;
    metricQuery: string;
    replicaInformation: ReplicaInformationProps;
    //podInformationData: PodInformationTableProps[][];
    dependencyGraphData: DependencyGraphDataProps;
}