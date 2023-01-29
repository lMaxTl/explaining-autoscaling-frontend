import { Timeline, TimelineItem } from "@mantine/core";
import ConditionItem from "./ConditionItem/ConditionItem";
import ScalingItem from "./ScalingItem/ScalingItem";
import TimelineIcon from "./TimelineIcon/TimelineIcon";
import { TimelineScalingDecisionsProps } from "./TimelineScalingDecisions.dto";

export function TimelineScalingDecisions({ data }: { data: TimelineScalingDecisionsProps[] }) {
    return (
        <Timeline data-testid="timeline" bulletSize={24} lineWidth={2}>
            {data?.map((item, index) => (
                <TimelineItem
                    key={index}
                    bullet={<TimelineIcon data={item} />}
                >
                    {item.name ? (
                        <ScalingItem data={item} />
                    ) : (
                        <ConditionItem data={item} />
                    )}
                </TimelineItem>
            ))}
        </Timeline>
    );


}