import { Global } from '@mantine/core';

export function GlobalStyles() {
    return (
        <Global
            styles={
                (theme) => ({
                    main: {
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                })
            }
            
        />
    );
}