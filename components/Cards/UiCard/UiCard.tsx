import { Title, Paper, Space, Group } from '@mantine/core';
import React from 'react';
import { CardDescription } from './CardDescription';

export function UiCard({ children, title, id, description }: { children: React.ReactNode, title?: string, id?: string, description?: string }) {
    return (
        <Paper radius="md" shadow="xs" p="md" id={id}>
            {title &&
                <Group>
                    <Title order={3}>{title}</Title>
                    {description && <CardDescription description={description} />}
                </Group>
            }
            {title && <Space h={20} />}
            {children}
        </Paper>
    );
}
