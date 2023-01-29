import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartData,
} from 'chart.js';
import { useMantineTheme } from "@mantine/core";
import { getOptions } from "./MetricLineChart.options";

export function MetricLineChart({ data }: { data: ChartData<'line'> }) {
    ChartJS.register(CategoryScale);
    ChartJS.register(LinearScale);
    ChartJS.register(PointElement);
    ChartJS.register(LineElement);


    const theme = useMantineTheme();

    return (
        <Line data={data} options={getOptions(theme)} />
    );
}