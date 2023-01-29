import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    sidebarPosition: {
        position: "fixed",
        right: 0,
        marginTop: 76,
    },
    verticalLine: {
        marginTop: 40,
        marginBottom: -13,
        height: 100,
        '&::after': {
            content: "''",
            borderLeft: "3px solid " + theme.colors.gray[5],
            marginLeft: 23,
            height: "100%",
            display: "inline-block",
        }
    },

}));