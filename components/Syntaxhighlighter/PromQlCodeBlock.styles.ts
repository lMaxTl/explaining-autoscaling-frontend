import { createStyles } from "@mantine/core";


export const useStyles = createStyles((theme) => ({
    removeBackground: {
        backgroundColor: "transparent !important",
    },
    styleText: {
        color: theme.colors.gray[4] + " !important",
        textShadow: "0 1px transparent !important",
        lineHeight: "0.7 !important",
    }
}));