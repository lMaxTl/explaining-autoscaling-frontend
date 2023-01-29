import { Tabs, ScrollArea } from '@mantine/core';
import { IconCpu2, IconMessageCircle, IconSettings } from '@tabler/icons';
import { UiCard } from '../UiCard/UiCard';
import { MetricLineChart } from '../../Charts/MetricLineChart/MetricLineChart';
import useStyles from './TabbableCard.styles';
import { TabbableCardProps } from './TabbableCard.dto';




export function TabbableCard({ title, cpuMetricData, ramMetricData, podCountMetricData }: TabbableCardProps) {
    const { classes, cx } = useStyles();
    return (
        <Tabs variant="pills" defaultValue="cpu" classNames={{ root: classes.horizontalContent, tabsList: classes.verticalButtons, panel: classes.distanceToButtons }}>
            <Tabs.List>
                <Tabs.Tab value="cpu" icon={<IconCpu2 size={14} />}>CPU Usage</Tabs.Tab>
                <Tabs.Tab value="ram" icon={<IconMessageCircle size={14} />}>RAM Usage</Tabs.Tab>
                <Tabs.Tab value="podCount" icon={<IconSettings size={14} />}>Pod Count</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="cpu" pt="xs">
                <ScrollArea offsetScrollbars>
                    <MetricLineChart data={cpuMetricData} />
                </ScrollArea>
            </Tabs.Panel>

            <Tabs.Panel value="ram" pt="xs">
                <ScrollArea offsetScrollbars>
                    <MetricLineChart data={ramMetricData} />
                </ScrollArea>
            </Tabs.Panel>

            <Tabs.Panel value="podCount" pt="xs">
                <ScrollArea offsetScrollbars>
                    <MetricLineChart data={podCountMetricData} />
                </ScrollArea>
            </Tabs.Panel>
        </Tabs>
    );
}