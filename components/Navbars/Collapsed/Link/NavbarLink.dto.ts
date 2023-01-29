import { TablerIcon } from '@tabler/icons';

export interface NavbarLinkProps {
    icon: TablerIcon;
    label: string;
    active?: boolean;
    onClick?(): void;
}
