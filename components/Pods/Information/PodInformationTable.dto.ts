export interface PodInformationTableProps {
    containerID: string;
    image: string;
    lastState: any;
    name: string;
    ready: boolean;
    restartCount: number;
    started: boolean;
    status: {
        running: {
            startedAt: string;
        }
    }
}