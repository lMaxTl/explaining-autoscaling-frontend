import { BubbleProps } from "./Bubble.dto";
import { useStyles } from "./Bubble.styles";
import { Text } from "@mantine/core";

export function Bubble({ description, active }: BubbleProps) {

    const { classes, cx } = useStyles({ active });

    return (
        <div data-testid="bubble" className={cx(classes.bubble)}>
            <Text className={cx(classes.wrapText)}>{description}</Text>
        </div>
    );
}