import { createStyles } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    active: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
    button: {
        color: theme.colorScheme === 'dark' ? theme.colors.gray[4]: theme.colors.gray[7],
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        width: 150,
        border: 0,
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,


        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? 
                                theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background : 
                                theme.colors.blue[3],
        },
    },
}));