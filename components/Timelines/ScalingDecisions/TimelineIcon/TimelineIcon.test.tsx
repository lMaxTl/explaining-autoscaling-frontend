import React from 'react';
import { render } from '@testing-library/react';
import TimelineIcon from './TimelineIcon';
import { IconArrowsMaximize, IconArrowsMinimize, IconHexagonOff } from "@tabler/icons";

const scalingProps = {
    data: {
        _id: 'fake-id',
        namespace: 'fake-namespace',
        name: 'fake-name',
        createdAt: 'fake-created-at',
        __v: 0,
        scalingType: 'scaleIn',
        replicaSize: 2,
        metricType: 'fake-metric-type',
    },
};

const conditionProps = {
    data: {
        _id: 'fake-id',
        namespace: 'fake-namespace',
        deploymentName: 'fake-deployment-name',
        createdAt: 'fake-created-at',
        __v: 0,
        conditions: [
            {
                message: 'fake-message',
                reason: 'fake-reason',
                lastTransitionTime: 'fake-last-transition-time',
                status: 'fake-status',
                type: 'fake-type',
            },
        ],
    },
};

test('TimelineIcon renders correctly for scaling events', () => {
    const { getByTestId } = render(<TimelineIcon {...scalingProps} />);

    expect(getByTestId('scaling-event-icon')).toContainElement(
        getByTestId('yellow-icon'),
    );
    expect(getByTestId('yellow-icon')).toContainElement(
        getByTestId('arrows-minimize-icon'),
    );
});

test('TimelineIcon renders correctly for scaling conditions', () => {
    const { getByTestId } = render(<TimelineIcon {...conditionProps} />);

    expect(getByTestId('scaling-condition-icon')).toContainElement(
        getByTestId('red-icon'),
    );
    expect(getByTestId('red-icon')).toContainElement(
        getByTestId('hexagon-off-icon'),
    );
});
