import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
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

    const theme = useTheme();
    const textColor = {
        textColor: theme.palette.text.main,
    };

    const renderChart = () => {
        if (data === undefined) {
            return null;
        } else {
            return (
                <ResponsiveLine
                    data={data}
                    theme={textColor}
                    margin={{ top: 50, right: 50, bottom: 150, left: 50 }}
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
                        legendPosition: 'middle',
                        legendOffset: -40,
                    }}
                    axisBottom={{
                        format: '%b %d %y',
                        tickValues: 'every 6 months',
                        legend: 'time',
                        legendOffset: 30,
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
                            anchor: 'bottom',
                            direction: 'column',
                            justify: false,
                            translateX: 0,
                            translateY: 130,
                            itemsSpacing: 2,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 20,
                            itemTextColor: theme.palette.text.main,
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
