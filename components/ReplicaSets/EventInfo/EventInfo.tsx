import { Grid, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import { EventInfoProps } from "./EventInfo.dto";
import { useStyles } from "./EventInfo.styles";

export default function EventInfo({scalingEventName, scalingEventType}: EventInfoProps) {
    const { classes, cx } = useStyles();

    return (
        <Grid align="center" className={cx(classes.centerTextInRing)}>
            <Grid.Col span={12}>
                <Text>
                    {scalingEventName}
                </Text>
            </Grid.Col>
            <Grid.Col span={12}>
                <IconChevronRight />
            </Grid.Col>
            <Grid.Col span={12}>
                <Text>
                    {scalingEventType}
                </Text>
            </Grid.Col>
        </Grid>
    );
}