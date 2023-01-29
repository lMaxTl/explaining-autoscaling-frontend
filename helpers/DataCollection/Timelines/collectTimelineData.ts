import { requestBackend } from "../../helper";
import { filterEventsAndConditions } from "./FilterEventsAndConditions";

export async function collectTimelineData(numberOfEvents: number) {
    const sortWithDescendingTime = JSON.stringify({
        "sort": [{
            "field": "createdAt",
            "order": "desc",
        }]
    });
    const limitEvents = JSON.stringify({
        "pagination": {
            "current": "0",
            "pageSize": numberOfEvents
        }
    });

    const events = await requestBackend({ path: "/events", sortingOperator: sortWithDescendingTime, paginationOperator: limitEvents });
    const scalingConditions = await requestBackend({ path: "/scaling-conditions", sortingOperator: sortWithDescendingTime, paginationOperator: limitEvents });



    const data = filterEventsAndConditions(events, scalingConditions, numberOfEvents)
    return data;
}

export async function collectTimelineDataFor(namespace:string, deploymentName:string, eventId:string ,numberOfEvents:number) {
    const currentEvent = await requestBackend({ path: `/events/${eventId}` });
    const eventTimestamp = currentEvent.createdAt;


    const sortWithDescendingTime = JSON.stringify({
        "sort": [{
            "field": "createdAt",
            "order": "desc",
        }]
    });
    const limitEvents = JSON.stringify({
        "pagination": {
            "current": "0",
            "pageSize": numberOfEvents
        }
    });
    const filterEvents = JSON.stringify({
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
                'field': 'createdAt',
                'operator': 'lte',
                'value': eventTimestamp
            }
        ]
    });
    const events = await requestBackend({ path: "/events", sortingOperator: sortWithDescendingTime, paginationOperator: limitEvents, filterOperator: filterEvents });
    
    const filterConditions = JSON.stringify({
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
    const scalingConditions = await requestBackend({ path: "/scaling-conditions", sortingOperator: sortWithDescendingTime, paginationOperator: limitEvents, filterOperator: filterConditions });
    

    const timelineData = filterEventsAndConditions(events, scalingConditions, numberOfEvents)
    return { eventTimestamp, timelineData };
}