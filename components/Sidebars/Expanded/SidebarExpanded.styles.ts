import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    sidebarPosition: {
        position: "fixed",
        right: 0,
        marginTop: 76,
    },
    verticalLine: {
        marginTop: -10,
        marginBottom: -13,
        height: 100,
        '&::after': {
            content: "''",
            borderLeft: "3px solid " + theme.colors.gray[5],
            marginLeft: 124,
            height: "100%",
            display: "inline-block",
        }
    },
    extraSmallTopMargin: {
        '&::after': {
            marginTop: -24,
            height: "124%",
        },

    }
}));