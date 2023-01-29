import { Container, Title, Space } from "@mantine/core";
import { InferGetServerSidePropsType } from "next";
import { UiCard } from "../components/Cards/UiCard/UiCard";
import ShowSavedMetrics from "../components/Metrics/Display/ShowSavedMetrics";
import { collectActiveHPAData } from "../helpers/DataCollection/HPAData/collectActiveHPAData";

export default function Metrics({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Container my="md">
            <Title order={1}>
                Metrics
            </Title>

            <Space h="md" />

            <UiCard>
                <ShowSavedMetrics metrics={data} />
            </UiCard>
        </Container>
    );
}

export const getServerSideProps = async () => {
    const data = await collectActiveHPAData();
    return {
        props: {
            data,
        },
    };
}
