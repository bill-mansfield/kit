import React, { useState, useEffect } from 'react';
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
                    axisLeft={null}
                    axisBottom={null}
                    colors={{ scheme: 'nivo' }}
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
                            anchor: 'top-left',
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
                        },
                    ]}
                />
            );
        }
    };

    return renderChart();
}
