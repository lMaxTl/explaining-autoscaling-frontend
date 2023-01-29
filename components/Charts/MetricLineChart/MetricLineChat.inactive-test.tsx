import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MetricLineChart } from './MetricLineChart';

afterEach(cleanup);

describe('MetricLineChart', () => {
    it('should render a line chart with the provided data', () => {
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Metric 1',
                    data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
                    backgroundColor: '#FF0000',
                    borderColor: '#FF0000',
                    pointBackgroundColor: '#FF0000',
                    pointHoverBackgroundColor: '#FF0000',
                    pointHoverBorderColor: '#FF0000',
                    pointRadius: 5,
                    pointBorderWidth: 2,
                    pointHoverRadius: 7,
                    fill: false,
                },
                {
                    label: 'Metric 2',
                    data: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240],
                    backgroundColor: '#0000FF',
                    borderColor: '#0000FF',
                    pointBackgroundColor: '#0000FF',
                    pointHoverBackgroundColor: '#0000FF',
                    pointHoverBorderColor: '#0000FF',
                    pointRadius: 5,
                    pointBorderWidth: 2,
                    pointHoverRadius: 7,
                    fill: false,
                },
            ],
        };

        const { getByText } = render(<MetricLineChart data={data} />);

        expect(getByText('Metric 1')).toBeInTheDocument();
        expect(getByText('Metric 2')).toBeInTheDocument();
    });
});
