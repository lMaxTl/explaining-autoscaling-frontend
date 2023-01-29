import { useMantineTheme } from "@mantine/core";

export function getOptions(theme: ReturnType<typeof useMantineTheme>) {
    let chartOptions = {
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
    return chartOptions;
}






