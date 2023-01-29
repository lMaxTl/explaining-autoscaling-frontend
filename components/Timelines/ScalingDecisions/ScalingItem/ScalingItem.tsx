import { TimelineScalingDecisionsProps } from "../TimelineScalingDecisions.dto";
import { Text } from "@mantine/core";
import { extractReason, formatDate } from "../../../../helpers/helper";

export default function ScalingItem({ data }: { data: TimelineScalingDecisionsProps }) {
    return (
        <div data-testid="scaling-item" className="scaling-event">
            <Text>
                The component {data.name} was scaled {data.scalingType === "scaleIn" ? "in" : "out"} to a replica size of {data.replicaSize} because {extractReason(data.message!, data.metricType!)}.
            </Text>
            <Text size="xs">
                {data.namespace}/{data.name} - {data.metricType}
            </Text>
            <Text size="xs" mt={4}>
                {formatDate(data.createdAt)}
            </Text>
        </div>
    )
}