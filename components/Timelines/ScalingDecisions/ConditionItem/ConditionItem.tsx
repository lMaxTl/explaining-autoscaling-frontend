import { TimelineScalingDecisionsProps } from "../TimelineScalingDecisions.dto";
import { Text } from "@mantine/core";
import { formatDate } from "../../../../helpers/helper";

export default function ConditionItem({ data }: { data: TimelineScalingDecisionsProps }) {
    return (
        <div data-testid="condition-item"  className="scaling-condition">
            {data.conditions!.length > 1 ? (
                <Text>
                    The conditions &nbsp;
                    {data.conditions?.map((condition, index, arr) => (
                        <span key={index}>
                            {condition.type} {index !== arr.length - 1 ? ", " : ""}
                        </span>
                    ))}
                    were changed to &nbsp;
                    {data.conditions?.map((condition, index, arr) => (
                        <span key={index}>
                            {condition.status} {index !== arr.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </Text>
            ) : (
                <Text>
                        The condition {data.conditions?.map((condition, index) => (<span key={index}>{condition.type} was changed to {condition.status}</span>))}
                </Text>
            )}

            <Text size="xs">
                {data.namespace}/{data.deploymentName}
            </Text>
            <Text size="xs" mt={4}>
                {formatDate(data.createdAt)}
            </Text>
        </div>
    )
}