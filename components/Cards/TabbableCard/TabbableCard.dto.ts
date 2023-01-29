import { ChartData } from 'chart.js';


export interface TabbableCardProps {
    title?: string;
    cpuMetricData: ChartData<'line'>;
    ramMetricData: ChartData<'line'>;
    podCountMetricData: ChartData<'line'>;
}