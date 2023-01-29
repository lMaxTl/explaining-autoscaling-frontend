import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    horizontalContent: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: 240,
        alignItems: 'center'
    },
    verticalButtons: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'flexStart',
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        borderRadius: theme.radius.md,
        border: 0,
        marginTop: 20,
        minWidth: 100,
        minHeight: 50,

        '&[data-active]': {
            backgroundColor: theme.colors.blue[7],
            borderColor: theme.colors.blue[7],
            color: theme.white,
        },
    },
    distanceToButtons: {
        marginLeft: 20,
        width: '100%',
        overflow: 'hidden',
    }
}));