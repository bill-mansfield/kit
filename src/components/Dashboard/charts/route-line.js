import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import Charts from '../../../models/Charts';

export default function RouteLine() {
    const [data, setData] = useState([
        {
            id: 'Onsight',
            data: [
                { x: '2018-01-01', y: 5 },
                { x: '2018-01-02', y: 5 },
            ],
        },
        {
            id: 'Flash',
            data: [
                { x: '2018-01-01', y: 6 },
                { x: '2018-01-02', y: 6 },
            ],
        },
        {
            id: 'Redpoint',
            data: [
                { x: '2018-01-01', y: 7 },
                { x: '2018-01-02', y: 8 },
            ],
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setData(await Charts.getLineData('Route'));
        };
        fetchData();
    }, []);

    const theme = {
        textColor: '#fff',
    };

    const renderChart = () => {
        if (data === undefined) {
            return null;
        } else {
            return (
                <ResponsiveLine
                    data={data}
                    theme={theme}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{
                        type: 'time',
                        format: '%Y-%m-%d',
                        precision: 'day',
                    }}
                    xFormat="time:%Y-%m-%d"
                    yScale={{
                        type: 'linear',
                        stacked: false,
                        min: 'auto',
                        max: 'auto',
                    }}
                    axisLeft={{
                        legend: 'Grade',
                        legendOffset: 12,
                    }}
                    axisBottom={{
                        format: '%b %d %y',
                        tickValues: 'every 6 months',
                        legend: 'time',
                        legendOffset: -12,
                    }}
                    colors={{ scheme: 'nivo' }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    enableGridX={false}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            itemTextColor: '#fff',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            );
        }
    };

    return renderChart();
}
