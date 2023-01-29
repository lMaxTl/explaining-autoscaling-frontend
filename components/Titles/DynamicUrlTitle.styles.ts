import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    distanceToTop: {
        marginTop: 8,
    },
    linkStyle: {
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    }
}));