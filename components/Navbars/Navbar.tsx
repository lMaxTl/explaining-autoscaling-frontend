import {
    IconLayoutDashboard,
    IconDeviceDesktopAnalytics,
    IconBrandSafari
} from '@tabler/icons';
import { useMediaQuery } from '@mantine/hooks';
import { NavbarExpanded } from './Expanded/NavbarExpanded';
import { NavbarCollapsed } from './Collapsed/NavbarCollapsed';


const routes = [
    { icon: IconLayoutDashboard, label: 'Dashboard', href: '/home' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics', href: '/events' },
    { icon: IconBrandSafari, label: 'Metrics', href: '/metrics' },
];

export function NavbarMinimal() {
    const largeScreen = useMediaQuery('(min-width: 1500px)');

    return (
        <>
            {largeScreen ? (<NavbarExpanded routes={routes} />) : (<NavbarCollapsed routes={routes} />)}
        </>
    );
}