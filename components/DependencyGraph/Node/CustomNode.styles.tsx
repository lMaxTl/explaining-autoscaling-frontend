import { createStyles } from "@mantine/core";


export const useStyles = createStyles((theme) => ({
    darkBackground: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        textAlign: "center",
        width: 200,
        border: "1px solid",
        borderColor: theme.colors.gray[7],
    },
    replicaBullet: {
        position: "absolute",
        marginLeft: 170,
        borderRadius: "50%",
        border: "2px solid",
        fontSize: "0.7rem",
        padding: "0.2rem",
    },
    replicaHealthy: {
        borderColor: theme.colors.green[7],
    },
    replicaUnhealthy: {
        borderColor: theme.colors.red[7],
    },
    replicaPending: {
        borderColor: theme.colors.yellow[7],
    },
    rightArrow: {
        "&::after": {
            content: '""',

        },
        "&::before": {
            content: '""',

        }
    }
}));