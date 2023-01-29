import { Grid, ThemeIcon, Text } from "@mantine/core";
import { IconArrowRightBar, IconArrowsMaximize, IconArrowsMinimize, IconCheck, IconExclamationMark } from "@tabler/icons";
import Link from "next/link";
import { formatDate } from "../../../helpers/helper";
import { RowItemProps } from "./RowItem.dto";
import { useStyles } from "./RowItem.styles";

export default function RowItem({index, element}: RowItemProps) {
    const { classes, cx } = useStyles();
    const link = `/events/${element.name}-event-${element._id}`;
    return (
        <Link key={index} href={link} legacyBehavior>
            <tr key={element._id} className={cx(classes.linkHoverEffect)}>
                <td>{formatDate(element.createdAt)}</td>
                <td>{element.namespace}/{element.name}</td>
                <td>
                    <Grid align="center">
                        <Grid.Col span={3}>
                            {element.scalingType == 'scaleOut' &&
                                (<IconArrowsMaximize className={cx(classes.distanceToTop)} />)}

                            {element.scalingType == 'scaleIn' &&
                                (<IconArrowsMinimize className={cx(classes.distanceToTop)} />)}
                        </Grid.Col>
                        <Grid.Col span={9}>
                            {element.scalingType == 'scaleOut' &&
                                (<Text c="green"> {element.scalingType} </Text>)}

                            {element.scalingType == 'scaleIn' &&
                                (<Text c="yellow"> {element.scalingType} </Text>)}
                        </Grid.Col>
                    </Grid>
                </td>
                <td>{element.metricType}</td>
                <td>
                    <Grid align="center">
                        <Grid.Col span={1}>{element.oldReplicaSize}</Grid.Col>
                        <Grid.Col span={4}><IconArrowRightBar className={cx(classes.distanceToTop)} /></Grid.Col>
                        <Grid.Col span={1}>{element.replicaSize}</Grid.Col>
                    </Grid>
                </td>
                <td>
                    <Grid align="center">
                        <Grid.Col span={3}>

                            {element.reason == 'SuccessfulRescale' &&
                                (<ThemeIcon radius="xl" color="green" className={cx(classes.distanceToTop)}><IconCheck /></ThemeIcon>)}

                            {element.reason == 'UnableToScale' &&
                                (<ThemeIcon radius="xl" color="red" className={cx(classes.distanceToTop)}><IconExclamationMark /></ThemeIcon>)}
                        </Grid.Col>
                        <Grid.Col span={9}>{element.reason}</Grid.Col>
                    </Grid>
                </td>
            </tr>
        </Link>
    );
}