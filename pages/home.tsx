import { Container, Title, Space, SimpleGrid } from '@mantine/core';
import { UiCard } from '../components/Cards/UiCard/UiCard';
import { TimelineScalingDecisions } from '../components/Timelines/ScalingDecisions/TimelineScalingDecisions';
import { InferGetServerSidePropsType } from "next";
import { TabbableCard } from '../components/Cards/TabbableCard/TabbableCard';
import { collectTimelineData } from '../helpers/DataCollection/Timelines/collectTimelineData';
import { collectClusterMetricData } from '../helpers/DataCollection/ClusterMetrics/collectClusterMetricData';
import { DependencyGraph } from '../components/DependencyGraph/Graph/DependencyGraph';
import retrieveCustomPodData from '../components/DependencyGraph/Graph/DependencyGraph.custom.data';



export default function HomePage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Container my="md">
                <Title order={1}>
                    Dashboard
                </Title>

                <Space h="md" />

                <SimpleGrid cols={1} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>

                    <UiCard title="Timeline">
                        <TimelineScalingDecisions data={data.timelineData} />
                    </UiCard>

                    <UiCard title="Cluster Metrics">
                        <TabbableCard cpuMetricData={data.chartData.cpuChartData} ramMetricData={data.chartData.ramChartData} podCountMetricData={data.chartData.podCountChartData} />
                    </UiCard>

                    <UiCard title="Service Dependency Graph">
                        <DependencyGraph graphProps={data.dependencyGraphData} />
                    </UiCard>

                </SimpleGrid>

            </Container>
        </>
    );
}


export const getServerSideProps = async () => {
    const numberOfEvents = 5;
    const timelineData = await collectTimelineData(numberOfEvents);
    const chartData = await collectClusterMetricData();
    const dependencyGraphData = await retrieveCustomPodData(new Date().toISOString());

    const data = {
        timelineData: timelineData,
        chartData: chartData,
        dependencyGraphData: dependencyGraphData,

    }
    return {
        props: {
            data,
        },
    }
}