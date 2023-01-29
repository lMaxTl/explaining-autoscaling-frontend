import React from 'react';
import { getAllByTestId, render } from '@testing-library/react';
import PodInformationTable from './PodInformationTable';

const data = [
    [
        {
            containerID: '123456789011',
            image: 'my-image',
            lastState: {},
            name: 'pod-1',
            ready: true,
            restartCount: 0,
            started: true,
            status: {
                running: {
                    startedAt: '2022-01-01T00:00:00.000Z'
                }
            }
        },
        {
            containerID: '098765432111',
            image: 'my-other-image',
            lastState: {},
            name: 'pod-1',
            ready: true,
            restartCount: 0,
            started: true,
            status: {
                running: {
                    startedAt: '2022-01-01T00:00:00.000Z'
                }
            }
        }
    ],
    [
        {
            containerID: 'abcdefghijkl',
            image: 'my-image',
            lastState: {},
            name: 'pod-2',
            ready: true,
            restartCount: 0,
            started: true,
            status: {
                running: {
                    startedAt: '2022-01-01T00:00:00.000Z'
                }
            }
        }
    ]
];

test('renders the PodInformationTable component', () => {
    const { getByText } = render(<PodInformationTable data={data} />);

    // Check if the pod names are rendered correctly
    expect(getByText('pod-1')).toBeInTheDocument();
    expect(getByText('pod-2')).toBeInTheDocument();

    // Check if the container names are rendered correctly
    expect(getByText('123456789011...123456789011')).toBeInTheDocument();
    expect(getByText('098765432111...098765432111')).toBeInTheDocument();
    expect(getByText('abcdefghijkl...abcdefghijkl')).toBeInTheDocument();

    // Check if the container images are rendered correctly
    const image = getAllByTestId(document.body, 'container-image-name');
    expect(image[0]).toHaveTextContent('my-image');
    expect(image[1]).toHaveTextContent('my-other-image');
});

    
