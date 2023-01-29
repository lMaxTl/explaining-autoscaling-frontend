import { ChartData } from "chart.js";
import {extractMetricName, formatDate, requestBackend } from "../../helper";

export async function collectMetricData(namespace:string, deploymentName:string, metricName:string, from: Date, to: Date) {
    let data = [];
    if(metricName === "scaleIn") {
        const latestEvent = await getLatestScaleOutEvent(namespace, deploymentName);
        if (latestEvent !== undefined) {
            const {metricQuery, targetValue} = await retrieveMetricQuery(latestEvent.namespace, latestEvent.name, latestEvent.metricType);
            data = await getMetricData(metricQuery, from, to);
        }
    }
    else {
        const {metricQuery, targetValue} = await retrieveMetricQuery(namespace, deploymentName, metricName);
        data = await getMetricData(metricQuery, from, to);
    }
    let timeLabels = [];
    let values = [];
    for(let entry of data) {
        timeLabels.push(formatDate(entry[0]));
        values.push(entry[1]);
    }
    const chartData: ChartData<'line'> = {
        labels: timeLabels,
        datasets: [{
            label: 'CPU Usage',
            data: values,
            borderColor: 'rgb(255, 99, 132)',
        }]
    };
    return chartData;
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

    // Calculate the difference between the from date and the to date and for every 90000000 milliseconds (25 hours) request the data
    const difference = to.getTime() - from.getTime();
    const differenceInHours = difference / (1000 * 3600);
    const numberOfRequests = Math.ceil(differenceInHours / 25);

    let data :any[] = [];
    for (let i = 0; i < numberOfRequests; i++) {
        const fromTimestamp = new Date(from.getTime() + (i * 90000000));
        const toTimestamp = new Date(from.getTime() + ((i + 1) * 90000000));
        const currentData = await requestBackend({ path: `/prometheus-metrics?metricQuery=${metricQuery}&start=${fromTimestamp}&end=${toTimestamp}&step=5m` });
   
        // if currentData contains status code 500, then the metric query is not valid
        if (currentData.statusCode === 500) {
            continue;
        }

        data = data.concat(currentData);
    }

    return data;
}

export async function getMetricDataFrom(metricQuery: string, from: Date) {
    const currentData = await requestBackend({ path: `/prometheus-metrics?metricQuery=${metricQuery}&start=${from}` });
    if (currentData.statusCode === 500) {
        return ["?"];
    }
    return currentData.pop()[1];
}





