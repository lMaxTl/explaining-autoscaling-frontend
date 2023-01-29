import { fireEvent, render, screen } from '@testing-library/react';
import { ChartData } from 'chart.js';
import { TabbableCard } from './TabbableCard';


const labels = ['2020-10-01T00:00:00Z', '2020-10-02T00:00:00Z', '2020-10-03T00:00:00Z'];
const fakeCpuMetricData: ChartData<'line'> = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [0.5,0.4,0.3],
            borderColor: 'rgb(255, 99, 132)',
        },
    ],
};

const fakeRamMetricData: ChartData<'line'> = {
    labels,
    datasets: [
        {
            label: 'Dataset 2',
            data: [0.6,0.7,0.8],
            borderColor: 'rgb(255, 99, 132)',
        },
    ],
};

const fakePodCountMetricData: ChartData<'line'> = {
    labels,
    datasets: [
        {
            label: 'Dataset 3',
            data: [2,3,4],
            borderColor: 'rgb(255, 99, 132)',
        },
    ],
};

const props = {
    title: 'Fake Title',
    cpuMetricData: fakeCpuMetricData,
    ramMetricData: fakeRamMetricData,
    podCountMetricData: fakePodCountMetricData,
};

test('TabbableCard renders correctly', () => {
    const { getByText } = render(<TabbableCard {...props} />);

    expect(getByText('CPU Usage')).toBeInTheDocument();
    expect(getByText('RAM Usage')).toBeInTheDocument();
    expect(getByText('Pod Count')).toBeInTheDocument();
});

test('TabbableCard tabs work correctly', () => {
    const { getByText, getByTestId } = render(<TabbableCard {...props} />);

    fireEvent.click(getByText('RAM Usage'));
    expect(getByTestId('ram-tab')).toHaveClass('active');

    fireEvent.click(getByText('Pod Count'));
    expect(getByTestId('pod-count-tab')).toHaveClass('active');
});