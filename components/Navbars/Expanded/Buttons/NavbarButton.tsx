import { Button } from '@mantine/core';
import { NavbarButtonProps } from './NavbarButton.dto';
import { useStyles } from './NavbarButton.styles';

export function NavbarButton({ icon: Icon, label, active, onClick }: NavbarButtonProps) {
    const { classes, cx } = useStyles();

    return (
        <Button onClick={onClick} leftIcon={<Icon data-testid="navbarbutton-icon" />} variant="outline" className={cx(classes.button, { [classes.active]: active })}>{label}</Button>
    );
}
