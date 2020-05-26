import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import Charts from '../../../models/Charts.js';
import { useTheme } from '@material-ui/core/styles';

export default function RouteBar() {
    const [data, setData] = useState([
        { Grade: '16', Onsight: 3, Flash: 8, Redpoint: 15 },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setData(await Charts.getBarData('Route'));
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
                <ResponsiveBar
                    data={data}
                    keys={['Onsight', 'Flash', 'Redpoint', 'Unsuccessful']}
                    indexBy="Grade"
                    margin={{ top: 50, right: 50, bottom: 150, left: 60 }}
                    padding={0.3}
                    theme={textColor}
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
                            anchor: 'bottom',
                            direction: 'column',
                            justify: false,
                            translateX: 0,
                            translateY: 130,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            itemTextColor: theme.palette.text.main,
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
