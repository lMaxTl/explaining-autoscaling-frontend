import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme => ({
    activeScalingDecision: {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        borderRadius: 5,
        color: theme.white,
    }
})));