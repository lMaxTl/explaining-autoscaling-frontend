import { EventProps } from "../../../components/Events/EventElement.dto";
import { requestBackend } from "../../helper";

export async function collectEventData(numberOfEvents: number) {
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

    let eventData: EventProps[] = [];
    for(let event of events) {
        const oldReplicaId = event.oldReplicaSetId;
        
        const oldReplicaSize = await collectOldReplicaSize(oldReplicaId);
        let eventWithReplicaSize = {
            ...event,
            oldReplicaSize: oldReplicaSize
        }
        eventData = eventData.concat(eventWithReplicaSize);
    }


 
    return eventData;
}

async function collectOldReplicaSize(oldReplicaId: number) {
    let oldReplicaSize = 0;
    if (oldReplicaId != null) {
        const oldReplicaSetData = await requestBackend({ path: '/events/' + oldReplicaId });
        oldReplicaSize = oldReplicaSetData.replicaSize;
    }
    return oldReplicaSize;
}