import { useMantineTheme } from "@mantine/core";
import { ChartOptions } from "chart.js";
import { useStyles } from "./TimelineScalingDecisionsWithMetric.styles";

export function getOptions(theme: ReturnType<typeof useMantineTheme>) {
    const { classes, cx } = useStyles();
    const options: ChartOptions<'line'> = {
        responsive: true,
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
                    callback: function(val, index) {
                        if (typeof val !== 'number') return val;
                        const date = new Date(this.getLabelForValue(val));
                        return formatDate(date.toISOString());
                    }
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

function formatDate(dateString: string) {
    const date = new Date(dateString);
    let day = date.getUTCDate().toString().padStart(2, '0');
    let month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    let year = date.getUTCFullYear().toString().slice(-2);

    let hour = date.getUTCHours().toString().padStart(2, '0');
    let minute = date.getUTCMinutes().toString().padStart(2, '0');
    let second = date.getUTCSeconds().toString().padStart(2, '0');

    let formattedDate = `${day}.${month}.${year} ${hour}:${minute}:${second}`;
    return formattedDate;
}