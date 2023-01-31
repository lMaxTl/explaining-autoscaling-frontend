import { ChartData } from "chart.js";
import console from "console";
import {extractMetricName, formatDate, requestBackend } from "../../helper";

const colors = ['#36a2eb', '#ff6384', '#4bc0c0', '#ff9f40']

export async function collectMetricData(namespace:string, deploymentName:string, metricName:string, from: Date, to: Date) {
    //add 10min to the to date, because the metric data is not available for the exact time
    to.setMinutes(to.getMinutes() + 10);
    //remove 10min from the from date, because the metric data is not available for the exact time
    from.setMinutes(from.getMinutes() - 10);
    
    //remove 1 hour from both timestamps to handle the automatic conversion from UTC to local time
    from.setHours(from.getHours() - 1);
    to.setHours(to.getHours() - 1);


    let datasets = [];
    let timeLabelsResult : string[] = [];
    if(metricName === "scaleIn") {
        const {allMetricNames, allMetricQueries} = await retrieveAllMetricQueries(namespace, deploymentName)
        let index = 0;
        for(const metricQuery of allMetricQueries) {
            const metricData = await getMetricData(metricQuery, from, to);
            let { timeLabels, values } = extractChartData(metricData);
            timeLabelsResult = timeLabels;
            datasets.push({
                label: allMetricNames[index],
                data: values,
                borderColor: colors[index],
            });
            index++;
        }
    }
    else {
        const {metricQuery, targetValue} = await retrieveMetricQuery(namespace, deploymentName, metricName);
        const data = await getMetricData(metricQuery, from, to);
        let { timeLabels, values } = extractChartData(data);
        timeLabelsResult = timeLabels;
        datasets.push({
            label: metricName,
            data: values,
            borderColor: colors[0],
        });
    }
    const chartData: ChartData<'line'> = {
        labels: timeLabelsResult,
        datasets: datasets
    };
    return chartData;
}

function extractChartData(data: any[]) {
    let timeLabels = [];
    let values = [];
    for (let entry of data) {
        timeLabels.push(formatDate(entry[0]));
        values.push(entry[1]);
    }
    return { timeLabels, values };
}

async function getLatestScaleOutEvent(namespace: string, deploymentName: string) {
    const filter= JSON.stringify({
        'filters': [
            {
                'field': 'name',
                'operator': 'eq',
                'value': deploymentName
            },
            {
                'field': 'namespace',
                'operator': 'eq',
                'value': namespace
            },
            {
                'field': 'scalingType',
                'operator': 'ne',
                'value': 'scaleIn'
            }
        ]
    });

    const scalingEvents = await requestBackend({ path: '/events', filterOperator: filter});
    const scalingEvent = scalingEvents[0];

    return scalingEvent;
}



async function retrieveAllMetricQueries(namespace: string, deploymentName: string) {
    const allHpaMetrics = await requestBackend({ path: '/hpa/' + namespace + '/' + deploymentName });
    const allMetricQueries = [];
    const allMetricNames = [];
    for(const hpaMetric of allHpaMetrics.currentMetrics) {
        allMetricQueries.push(hpaMetric.query);
        allMetricNames.push(extractMetricName(hpaMetric.metricName));
    }
    return {allMetricNames, allMetricQueries};
}


export async function retrieveMetricQuery(namespace: string, deploymentName: string, metricName: string) {
    const filter = JSON.stringify({
        'filters': [
            {
                'field': 'deploymentName',
                'operator': 'eq',
                'value': deploymentName
            },
            {
                'field': 'namespace',
                'operator': 'eq',
                'value': namespace
            },
        ]
    });

    const possibleHPAMetrics = await requestBackend({ path: '/hpa', filterOperator: filter });
    
    const possibleHPAMetric = possibleHPAMetrics[0];

    if(metricName === "scaleIn") {
        let lastScaleOutEvent = await getLatestScaleOutEvent(namespace, deploymentName);
        metricName = lastScaleOutEvent?.metricType;
    }

    let metricQuery = "scaleIn";
    let targetValue = 0;
    for (let currentMetric of possibleHPAMetric.currentMetrics) {
        const currentMetricQueryName = extractMetricName(currentMetric.metricName);
        if (currentMetricQueryName === metricName) {
            metricQuery = currentMetric.query;
            targetValue = currentMetric.targetValue;
            break;
        }
    }

    return {metricQuery, targetValue};
}

async function getMetricData(metricQuery: string, from: Date, to: Date) {
    const currentData = await requestBackend({ path: `/prometheus-metrics?metricQuery=${metricQuery}&start=${from}&end=${to}` });

    let data = [];
    for (const entry of currentData) {
        data.push([entry.queriedAt, entry.value]);
    }
    return data;
}

export async function getMetricDataFrom(metricQuery: string, from: Date) {
    const currentData = await requestBackend({ path: `/prometheus-metrics?metricQuery=${metricQuery}&start=${from}` });
    if (currentData.statusCode === 500) {
        return ["?"];
    }
    const result = currentData[1];
    return result;
}





