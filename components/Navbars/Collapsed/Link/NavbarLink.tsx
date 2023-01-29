import { Tooltip, UnstyledButton } from '@mantine/core';
import { NavbarLinkProps } from './NavbarLink.dto';
import { useStyles } from './NavbarLink.styles';

export function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();

    return (
        <Tooltip label={label} position="right" transitionDuration={0}>
            <UnstyledButton data-testid="button" onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
                <Icon stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}