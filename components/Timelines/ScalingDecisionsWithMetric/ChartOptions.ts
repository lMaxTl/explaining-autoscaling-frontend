import { useMantineTheme } from "@mantine/core";
import { ChartOptions } from "chart.js";
import { useStyles } from "./TimelineScalingDecisionsWithMetric.styles";


export function getOptions(theme: ReturnType<typeof useMantineTheme>) {
    const { classes, cx } = useStyles();
    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
           
        },
        elements: {
            line: {
                tension: 0,
                borderWidth: 2,
                borderColor: theme.colors.dark[5],
                fill: "start",
                backgroundColor: theme.black,
            },
            point: {
                radius: 0,
                hitRadius: 0
            },
        },
        scales: {
            x: {
                grid: {
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
                },
                ticks: {
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.dark[8],
                },
            },
            y: {
                grid: {
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
                },
                ticks: {
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.dark[8],
                },
            },
        }

    };

    return options;
}