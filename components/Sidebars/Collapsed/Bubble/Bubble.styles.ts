import { createStyles } from "@mantine/core";


interface BubbleStyleProps {
    active?: boolean,
}
export const useStyles = createStyles((theme, { active }: BubbleStyleProps) => ({
    bubble: {
        ...theme.fn.focusStyles(),
        marginRight: 70,
        '&::before': {
            transition: 'all 0.2s ease',
            content: "''",
            display: "inline-block",
            border: "3px solid " + theme.colors.gray[5],
            width: 30,
            height: 30,
            borderRadius: "50%",
            marginRight: 30,
            marginTop: 11,
            position: "absolute",
            right: 0,
            backgroundColor: active ? theme.colors.gray[5] : "transparent",
        },
        '&:hover': {
            '&::before': {
                backgroundColor: theme.colors.gray[5],

            },

        },
    },
   

}));