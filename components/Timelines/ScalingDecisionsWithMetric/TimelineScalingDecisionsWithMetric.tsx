import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartData,
    ChartOptions,
} from 'chart.js';

import { Stack, Space, useMantineTheme } from "@mantine/core";
import { getOptions } from "./ChartOptions";
import { TimelineScalingDecisions } from "../ScalingDecisions/TimelineScalingDecisions";
import { TimelineScalingDecisionsProps } from "../ScalingDecisions/TimelineScalingDecisions.dto";

export default function MetricTimelineDecisions({ chartData, timelineData }: { chartData: ChartData<'line'>, timelineData: TimelineScalingDecisionsProps[] }) {
    ChartJS.register(CategoryScale);
    ChartJS.register(LinearScale);
    ChartJS.register(PointElement);
    ChartJS.register(LineElement);
    
    const theme = useMantineTheme();
    const options: ChartOptions<'line'> = getOptions(theme);

    return (
        <Stack>
            <Line data-testid="chart" data={chartData} options={options} />

            <Space h="xl" />

            <TimelineScalingDecisions data={timelineData} />
        </Stack>
    );
}