import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { ResponsiveLine } from '@nivo/line';
import Charts from '../../../models/Charts.js';

export default function VolumeBar() {
    const [data, setData] = useState([
        {
            id: 'Number of ascents',
            data: [
                { x: '2018-01-01', y: 1 },
                { x: '2018-01-02', y: 5 },
            ],
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setData(await Charts.getVolumeData('Route'));
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
                    margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                    curve="step"
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
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Number of ascents',
                        legendPosition: 'middle',
                        legendOffset: -30,
                    }}
                    axisBottom={{
                        format: '%b %d %y',
                        tickValues: 'every 6 months',
                        legend: 'time',
                        legendOffset: -12,
                    }}
                    colors={{ scheme: 'red_yellow_green' }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    enableArea={true}
                    areaBaselineValue={0}
                    enablePoints={false}
                    enableGridX={false}
                    enableGridY={false}
                    legends={[
                        {
                            anchor: 'left',
                            direction: 'column',
                            justify: false,
                            translateX: 10,
                            translateY: -50,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 50,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 10,
                            itemTextColor: theme.palette.text.main,
                        },
                    ]}
                />
            );
        }
    };

    return renderChart();
}
