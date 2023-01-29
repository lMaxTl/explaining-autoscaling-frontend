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
    }
}));