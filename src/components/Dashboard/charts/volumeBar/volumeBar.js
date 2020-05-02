import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import firebase from '../../../../services/firebase';
import Ascents from '../../../Ascents/Ascents';
import * as Constants from '../../../Ascents/Constants';

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
            const result = await firebase.getCurrentUserAscents();
            // Starts at 1 as the first row of the CSV(result) is column titles
            let ascentDateArr = [];
            let ascentArr = [];
            let ascentFinalArr = [];
            for (let i = 1; i < result.length; i++) {
                let ascent = result[i].file;
                let ascentDate = ascent[21];
                let counts = {};

                if (ascentDate != undefined && ascentDate != 'Log Date') {
                    ascentDateArr.push(ascentDate.slice(0, 7));
                }
                ascentDateArr.sort(function (a, b) {
                    return new Date(a) - new Date(b);
                });
                ascentDateArr.forEach(function (x) {
                    counts[x] = (counts[x] || 0) + 1;
                });

                ascentArr = Object.entries(counts);
            }
            for (let i = 0; i < ascentArr.length; i++) {
                let ascentObj = {};
                ascentObj.x = ascentArr[i][0] + '-01';
                ascentObj.y = ascentArr[i][1];
                ascentFinalArr.push(ascentObj);
            }
            // Nest data in required nivo format
            let finalObj = {};
            let lastArr = [];
            finalObj.id = 'Number of ascents';
            finalObj.data = ascentFinalArr;
            lastArr.push(finalObj);
            console.log(lastArr);
            if (lastArr.length != 0) {
                setData(lastArr);
            }
        };
        fetchData();
    }, []);

    const theme = {
        textColor: '#fff',
    };

    const renderChart = () => {
        if (data.length === 0) {
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
                    axisLeft={{
                        legend: 'Number of ascents',
                        legendOffset: 12,
                    }}
                    axisBottom={{
                        format: '%b %d %y',
                        tickValues: 'every 3 months',
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
                    enableArea={true}
                    areaBaselineValue={1}
                    enablePoints={false}
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
