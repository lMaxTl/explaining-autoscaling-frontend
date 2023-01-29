import { Anchor, Breadcrumbs, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import { useRouter } from "next/router";
import { useStyles } from "./DynamicUrlTitle.styles";
import Link from "next/link";


export default function DynamicUrlTitle() {
    const { classes, cx } = useStyles();
    
    const router = useRouter();
    const eventName = router.asPath.split("/").pop();

    const items = [
        { title: 'Events', href: '/events' },
        { title: eventName, href: router.asPath },
    ].map((item, index) => (
        <Anchor component={Link} href={item.href} key={index} className={cx(classes.linkStyle)}>
            {item.title}
        </Anchor>
    ));


    return (
        <Title order={1}>
            <Breadcrumbs separator={<IconChevronRight className={cx(classes.distanceToTop)} />}>{items}</Breadcrumbs>
        </Title>
    );

}