import { useMantineTheme } from "@mantine/core";

export function getMinReplicaColor() {
    const theme = useMantineTheme();
    return theme.colors.yellow[3];
}
export function getOldReplicaColor() {
    const theme = useMantineTheme();
    return theme.colors.yellow[9];
}
export function getNewReplicaColor() {
    const theme = useMantineTheme();
    return theme.colors.green[8];
}
export function getMaxReplicaColor() {
    const theme = useMantineTheme();
    const dark = theme.colorScheme === 'dark';
    return dark ? theme.colors.dark[4] : theme.colors.gray[4];
}
