import { useMediaQuery } from "@mantine/hooks";
import SidebarCollapsed from "./Collapsed/SidebarCollapsed";
import SidebarExpanded from "./Expanded/SidebarExpanded";


export default function Sidebar() {
    const largeScreen = useMediaQuery('(min-width: 1400px)');
    const mediumScreen = useMediaQuery('(min-width: 1135px)');
    return (
        <>
            {largeScreen ? (<SidebarExpanded />) : (mediumScreen && <SidebarCollapsed />)}
        </>
    );
}