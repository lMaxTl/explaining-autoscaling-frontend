import { Center, Grid, Table, ThemeIcon } from "@mantine/core";
import { IconCheck, IconExclamationMark } from "@tabler/icons";
import { formatDate } from "../../../helpers/helper";
import { PodInformationTableProps } from "./PodInformationTable.dto";
import { useStyles } from "./PodInformationTable.styles";
import ReactTooltip from 'react-tooltip';

export default function PodInformationTable({ data }: { data: PodInformationTableProps[][] }) {
    const { classes, cx } = useStyles();
    return (
        <Table className={cx(classes.borderBottomForTable)}>
            <thead>
                <tr>
                <th>Pods</th>
                <th>Container ID</th>
                <th>Container Status</th>
                <th>Image</th>
                <th>Restart Count</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                <tr key={row[0].name}>
                    <td rowSpan={row.length}>{data[index][0].name}</td>
                    {row.map((container) => (
                    <>
                        <td key={container.containerID} data-tip={container.containerID}>
                        {container.containerID?.substring(0, 12)}...{container.containerID?.substring(container.containerID.length - 12, container.containerID.length)}
                        <ReactTooltip />
                        </td>
                        <td>
                        {container.status?.running ? (
                            <Grid align="center">
                            <Grid.Col span={2}>
                                <ThemeIcon radius="xl" color="green">
                                <IconCheck />
                                </ThemeIcon>
                            </Grid.Col>
                            <Grid.Col span={9}>
                                <Center>Started at {formatDate(container.status.running.startedAt)}</Center>
                            </Grid.Col>
                            </Grid>
                        ) : (
                            <Grid align="center">
                            <Grid.Col span={2}>
                                <ThemeIcon radius="xl" color="red">
                                <IconExclamationMark />
                                </ThemeIcon>
                            </Grid.Col>
                            <Grid.Col span={9}>
                                <Center>Stopped</Center>
                            </Grid.Col>
                            </Grid>
                        )}
                        </td>
                        <td data-testid="container-image-name">{container.image}</td>
                        <td>{container.restartCount}</td>
                    </>
                    ))}
                </tr>
                ))}
            </tbody>
            </Table>

    );
}
