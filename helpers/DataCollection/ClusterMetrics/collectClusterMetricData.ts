import { ChartData } from "chart.js";
import { formatDate, requestBackend } from "../../helper";
import { ClusterMetricProps } from "../../Types/ClusterMetric.dto";

export async function collectClusterMetricData() {
    const sortWithDescendingTime = JSON.stringify({
        "sort": [{
            "field": "createdAt",
            "order": "desc",
        }]
    });
    const limitEvents = JSON.stringify({
        "pagination": {
            "current": "0",
            "pageSize": "100"
        }
    });


    const clusterMetrics = await requestBackend({ path: "/cluster-metrics", sortingOperator: sortWithDescendingTime, paginationOperator: limitEvents });
    

    const timeLabels: string[] = [];
    const cpuUsage: number[] = [];
    const memoryUsage: number[] = [];
    const podCount: number[] = [];

    clusterMetrics.forEach((metric: ClusterMetricProps) => {
        timeLabels.push(formatDate(metric.createdAt))
        cpuUsage.push(Number(metric.cpu))
        memoryUsage.push(Number(metric.memory))
        podCount.push(Number(metric.podCount))
    });
    timeLabels.reverse();
    cpuUsage.reverse();
    memoryUsage.reverse();
    podCount.reverse();

    const cpuChartData: ChartData<'line'> = {
        labels: timeLabels,
        datasets: [{
            label: 'CPU Usage',
            data: cpuUsage,
            borderColor: 'rgb(255, 99, 132)',
        }]
    };

    const ramChartData: ChartData<'line'> = {
        labels: timeLabels,
        datasets: [{
            label: 'Memory Usage',
            data: memoryUsage,
            borderColor: 'rgb(255, 99, 132)',
        }]
    };

    const podCountChartData: ChartData<'line'> = {
        labels: timeLabels,
        datasets: [{
            label: 'Total Pod Count',
            data: podCount,
            borderColor: 'rgb(255, 99, 132)',
        }]
    };
    
    const data = {
        cpuChartData: cpuChartData,
        ramChartData: ramChartData,
        podCountChartData: podCountChartData
    };
    return data;
    
}
