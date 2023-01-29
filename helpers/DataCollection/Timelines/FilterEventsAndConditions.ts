import { EventProps } from "../../Types/Event.dto";
import { ScalingConditionProps } from "../../Types/ScalingCondition.dto";

/**
 * Returns numberOfEvents entries of two lists with the most current timestamps
 * @param eventList
 * @param scalingConditionList
 * @param numberOfEvents
 * @returns
 */
function getMostCurrentTimestamps(eventList: EventProps[], scalingConditionList: ScalingConditionProps[], numberOfEvents: number): any[] {
    Array.prototype.push.apply(eventList, scalingConditionList);
    eventList.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return eventList.slice(0, numberOfEvents);
}

/**
 * Returns the scalingCondition list with a filtered conditions array in which only conditions that are relevant are represented
 * There are three types of conditions: "AbleToScale", "ScalingActive", "ScalingLimited"
 * AbleToScale is relevant if it is false
 * ScalingActive is relevant if it is false
 * ScalingLimited is relevant if it is true
 * 
 * @param scalingConditionList
 * @returns
 */
function keepRelevantConditions(scalingConditionList: ScalingConditionProps[]): ScalingConditionProps[] {
    scalingConditionList.forEach((scalingCondition) => {
        scalingCondition.conditions = scalingCondition.conditions.filter((condition) => {
            return condition.type === "AbleToScale" && condition.status === "False" ||
                condition.type === "ScalingActive" && condition.status === "False" ||
                condition.type === "ScalingLimited" && condition.status === "True";
        });
    });
    return scalingConditionList;
}

/**
 * Removes all entries from the scalingCondition list that have no conditions
 * @param scalingConditionList
 * @returns
 */
function removeEmptyConditionsFromScalingConditions(scalingConditionList: ScalingConditionProps[]): ScalingConditionProps[] {
    return scalingConditionList.filter((scalingCondition) => {
        return scalingCondition.conditions.length > 0;
    });
}

/**
 * Concatinates the eventList and the scalingConditionList and returns a list with the numberOfEvents most recent events that are relevant 
 * Conditions are relevant if their status is false
 * @param eventList
 * @param scalingConditionList
 * @param numberOfEvents
 * @returns
 */
export function filterEventsAndConditions(eventList: EventProps[], scalingConditionList: ScalingConditionProps[], numberOfEvents: number): any[] {
    let filteredScalingConditionList = removeEmptyConditionsFromScalingConditions(keepRelevantConditions(scalingConditionList));
    return getMostCurrentTimestamps(eventList, filteredScalingConditionList, numberOfEvents);
}

