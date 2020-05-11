import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import Firebase from '../../../services/Firebase';
import Ascents from '../../../models/Ascents';
import Charts from '../../../models/Charts.js';

export default function BoulderBar() {
    const [data, setData] = useState([
        { grade: 'V1', Onsight: 3, Flash: 8, Send: 15 },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setData(await Charts.getBarData('Boulder'));
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
                <ResponsiveBar
                    data={data}
                    keys={[
                        'Onsight',
                        'Flash',
                        'Send',
                        'Tick',
                        'Repeat',
                        'Unsuccessful',
                    ]}
                    indexBy="Grade"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    theme={theme}
                    colors={{ scheme: 'nivo' }}
                    layout="horizontal"
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 4,
                            padding: 1,
                            stagger: true,
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#eed312',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10,
                        },
                    ]}
                    borderColor={{
                        from: 'color',
                        modifiers: [['brighter', 1.6]],
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Ticks',
                        legendPosition: 'middle',
                        legendOffset: 32,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Grade',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [['brighter', 1.6]],
                    }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            itemTextColor: '#fff',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            );
        }
    };

    return renderChart();
}
