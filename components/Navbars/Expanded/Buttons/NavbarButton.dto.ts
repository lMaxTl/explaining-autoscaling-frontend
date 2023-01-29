import {TablerIcon} from '@tabler/icons';

export interface NavbarButtonProps {
    icon: TablerIcon;
    label: string;
    active?: boolean;
    onClick?(): void;
}
