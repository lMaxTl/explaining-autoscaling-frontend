import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    distanceToTop: {
        marginTop: 8,
    },
    linkHoverEffect: {
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            cursor: 'pointer',
        }
    },
    scaleInColor: {
        color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.yellow[9],
    },
    scaleOutColor: {
        color: theme.colorScheme === 'dark' ? theme.colors.green[4] : theme.colors.green[9],
    },
}));