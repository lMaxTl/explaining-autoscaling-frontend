import { Table } from "@mantine/core";
import { EventProps } from "./EventElement.dto";
import RowItem from "./Item/RowItem";

export default function ShowSavedEvents({ events }: { events: EventProps[] }) {
    return (
        <Table>
            <thead>
                <tr key="header">
                    <th>Timestamp</th>
                    <th>Deployment</th>
                    <th>Scaling type</th>
                    <th>Metric</th>
                    <th>Replica size</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {events.map((element: any, index: number) => (
                    <RowItem index={index} element={element} />
                ))}
            </tbody>
        </Table>
    );
}