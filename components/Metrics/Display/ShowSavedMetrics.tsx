import { ScrollArea, Table } from "@mantine/core";
import PromQlCodeBlock from "../../Syntaxhighlighter/PromQlCodeBlock";
import { ShowSavedMetricsProps } from "./ShowSavedMetrics.dto";


export default function ShowSavedMetrics({metrics}: {metrics: ShowSavedMetricsProps[]}) {

    return (
        <Table>
            <thead>
                <tr>
                    <th>Metric Name</th>
                    <th>Targeted Deployment</th>
                    <th>Metric Query</th>
                    <th>Target Value</th>
                    <th>Type</th>
                    <th>Min Replicas</th>
                    <th>Max Replicas</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                {metrics.map((row, index) => (
                    <tr key={index}>
                        <td>{row.metricName}</td>
                        <td>{row.targetedDeployment}</td>

                        <td style={{ maxWidth: "240px" }} >
                            <ScrollArea>
                                <PromQlCodeBlock code={row.metricQuery} />
                            </ScrollArea>
                        </td>
                        
                        <td>{row.targetValue}</td>
                        <td>{row.type}</td>
                        <td>{row.minReplicas}</td>
                        <td>{row.maxReplicas}</td>
                        <td>{row.createdAt}</td>
                    </tr>
                ))}

            </tbody>
        </Table>
    );
}