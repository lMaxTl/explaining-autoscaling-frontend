import { createStyles } from "@mantine/core";


export const useStyles = createStyles((theme) => ({
    borderBottomForTable: {
        borderBottom: '1px solid' + theme.colors.dark[4],
    },
    distanceToTop: {
        marginTop: 8,
    },
}));