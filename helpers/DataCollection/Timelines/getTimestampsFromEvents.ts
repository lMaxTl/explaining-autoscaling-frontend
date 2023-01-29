import { TimelineScalingDecisionsProps } from "../../../components/Timelines/ScalingDecisions/TimelineScalingDecisions.dto";

async function getTimestampsFromEvents(timelineData: TimelineScalingDecisionsProps[]) {
    const timestamps = timelineData.map((data) => {
        return new Date (data.createdAt);
    });
    return timestamps;  
}
async function getNewestTimestamp(timestamps: Date[]) {
    const newestTimestamp = timestamps.reduce((a, b) => a > b ? a : b);
    return newestTimestamp;    
}
async function getOldestTimestamp(timestamps: Date[]) {
    const oldestTimestamp = timestamps.reduce((a, b) => a < b ? a : b);
    return oldestTimestamp;    
}
export async function getNewestAndOldestTimestampsFromEvents(timelineData: TimelineScalingDecisionsProps[]) {
    const timestamps = await getTimestampsFromEvents(timelineData);
    const newestTimestamp = await getNewestTimestamp(timestamps);
    const oldestTimestamp = await getOldestTimestamp(timestamps);
    return {newestTimestamp, oldestTimestamp};
}

