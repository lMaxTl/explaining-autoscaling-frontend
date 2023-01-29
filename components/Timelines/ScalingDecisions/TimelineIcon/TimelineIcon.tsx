import { ThemeIcon } from "@mantine/core";
import { IconArrowsMaximize, IconArrowsMinimize, IconHexagonOff } from "@tabler/icons";
import { TimelineScalingDecisionsProps } from "../TimelineScalingDecisions.dto";

export default function TimelineIcon({ data }: { data: TimelineScalingDecisionsProps }) {
    return (
        <div>
            {data.name ? (
                <div className="scaling-event-icon" data-testid="scaling-event-icon">
                    {data.scalingType === "scaleIn" ? (
                        <ThemeIcon color="yellow" data-testid="yellow-icon">
                            <IconArrowsMinimize size={16} data-testid="arrows-minimize-icon"/>
                        </ThemeIcon>
                    ) : (
                        <ThemeIcon color="green">
                            <IconArrowsMaximize size={16} />
                        </ThemeIcon>
                    )}
                </div>
            ) : (
                <div className="scaling-condition-icon" data-testid="scaling-condition-icon">
                    <ThemeIcon color="red" data-testid="red-icon">
                        <IconHexagonOff size={16} data-testid="hexagon-off-icon" />
                    </ThemeIcon>
                </div>
            )}
        </div>
    );
}