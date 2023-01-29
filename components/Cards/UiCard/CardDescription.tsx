import { Button, HoverCard, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";

export function CardDescription({ description }: { description?: string }) {
    return (
        <HoverCard position="bottom" width={320} shadow="md" withArrow>
            <HoverCard.Target>
                <Button variant="subtle" compact><IconInfoCircle /></Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Text size="sm">
                    {description}
                </Text>
            </HoverCard.Dropdown>
        </HoverCard>
    );
}