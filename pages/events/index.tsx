import { Container, Space, Table, Title } from "@mantine/core";
import { InferGetServerSidePropsType } from "next";
import { UiCard } from "../../components/Cards/UiCard/UiCard";
import ShowSavedEvents from "../../components/Events/ShowSavedEvents";
import { collectEventData } from "../../helpers/DataCollection/EventData/collectEventData";


export default function EventOverviewPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Container my="md">
            <Title order={1}>
                Events
            </Title>

            <Space h="md" />

            <UiCard>
                <ShowSavedEvents events={data} />
            </UiCard>
        </Container>
    );
}

export const getServerSideProps = async () => {
    const numberOfEvents = 100;
    const events = await collectEventData(numberOfEvents);
    return {
        props: {
            data: events
        }
    };
}