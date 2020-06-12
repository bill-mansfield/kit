import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import Charts from '../../../models/Charts.js';
import { useTheme } from '@material-ui/core/styles';

export default function BoulderBar() {
    const [data, setData] = useState([
        { Grade: 'V1', Onsight: 3, Flash: 8, Send: 15 },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setData(await Charts.getBarData('Boulder'));
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
                    keys={[
                        'Onsight',
                        'Flash',
                        'Send',
                        'Tick',
                        'Repeat',
                        'Unsuccessful',
                    ]}
                    indexBy="Grade"
                    margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                    padding={0.3}
                    theme={textColor}
                    colors={{ scheme: 'red_yellow_green' }}
                    layout="horizontal"
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [['brighter', 1.6]],
                    }}
                    axisLeft={{
                        legend: 'Grade',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'right',
                            direction: 'column',
                            justify: false,
                            translateX: 0,
                            translateY: 70,
                            itemsSpacing: 1,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 10,
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
