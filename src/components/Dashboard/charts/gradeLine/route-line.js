import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import firebase from '../../../../services/firebase';
import Ascents from '../../../Ascents/Ascents';
import * as Constants from '../../../Ascents/Constants';

export default function RouteLine() {
    const [data, setData] = useState([
        {
            id: 'Onsight',
            data: [
                { x: '2018-01-01', y: 5 },
                { x: '2018-01-02', y: 5 },
                { x: '2018-01-03', y: 6 },
                { x: '2018-01-04', y: 7 },
                { x: '2018-01-05', y: 7 },
                { x: '2018-01-06', y: 8 },
                { x: '2018-01-07', y: 9 },
                { x: '2018-01-08', y: 9 },
            ],
        },
        {
            id: 'Flash',
            data: [
                { x: '2018-01-01', y: 6 },
                { x: '2018-01-02', y: 6 },
                { x: '2018-01-03', y: 6 },
                { x: '2018-01-04', y: 7 },
                { x: '2018-01-05', y: 7 },
                { x: '2018-01-06', y: 7 },
                { x: '2018-01-07', y: 8 },
                { x: '2018-01-08', y: 10 },
            ],
        },
        {
            id: 'Redpoint',
            data: [
                { x: '2018-01-01', y: 7 },
                { x: '2018-01-02', y: 8 },
                { x: '2018-01-03', y: 8 },
                { x: '2018-01-04', y: 9 },
                { x: '2018-01-05', y: 9 },
                { x: '2018-01-06', y: 9 },
                { x: '2018-01-07', y: 12 },
                { x: '2018-01-08', y: 13 },
            ],
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await firebase.getCurrentUserAscents();
            let tickTypeArr = [];
            let tickTypeRefArr = [];
            let highestOnsights = [];
            let highestFlashes = [];
            let highestRedPoints = [];
            // Starts at 1 as the first row of the CSV(result) is column titles
            for (let i = 1; i < result.length; i++) {
                let ascent = result[i].file;
                let gradeValue = ascent[9];
                let tickType = ascent[3];
                let ascentDate = ascent[21];
                let gradeAndTime = {};

                if (
                    gradeValue != undefined &&
                    Constants.TRASH_GRADE_IDENTIFYER.some((el) =>
                        gradeValue.includes(el),
                    )
                ) {
                    continue;
                }

                // Remove boulder ascents/undefined/empty string cases
                if (
                    (gradeValue != undefined && gradeValue.includes('V')) ||
                    ascent[0] === ''
                ) {
                    continue;
                }

                gradeValue = Ascents.convertGradeToAus(gradeValue);

                // Remove half and half grades where the conversion returns a split e.g 5.11c = 21/22
                if (gradeValue.includes('/')) {
                    gradeValue = Ascents.roundDownSplitGrades(gradeValue);
                }

                if (tickType === 'Pink point') {
                    tickType = 'Red point';
                }

                if (tickTypeRefArr.includes(tickType) === false) {
                    if (Ascents.notableTickType(tickType)) {
                        tickTypeRefArr.push(tickType);
                        let tickTypeObj = {};
                        tickTypeObj.id = tickType;
                        tickTypeArr.push(tickTypeObj);
                        // console.log(tickTypeArr);
                    }
                }

                // TODO: Fix date format issue, format and sort dat before adding it to object

                if (tickType === 'Onsight') {
                    gradeAndTime.x = new Date(ascentDate);
                    gradeAndTime.y = gradeValue;

                    highestOnsights.push(gradeAndTime);
                    highestOnsights.sort(function (a, b) {
                        return a.y - b.y;
                    });
                    for (let i = 0; i < highestOnsights.length; i++) {
                        let dateObject = highestOnsights[i].x;
                        dateObject = dateObject.toISOString().slice(0, 10);
                    }
                    for (let i = 0; i < tickTypeArr.length; i++) {
                        if (tickTypeArr[i].id === 'Onsight') {
                            tickTypeArr[i].data = highestOnsights;
                        }
                    }
                }
                if (tickType === 'Flash') {
                    gradeAndTime.x = new Date(ascentDate);
                    gradeAndTime.y = gradeValue;

                    highestFlashes.push(gradeAndTime);
                    highestFlashes.sort(function (a, b) {
                        return a.y - b.y;
                    });
                    for (let i = 0; i < highestFlashes.length; i++) {
                        let dateObject = highestFlashes[i].x;
                        dateObject = dateObject.toISOString().slice(0, 10);
                    }
                    for (let i = 0; i < tickTypeArr.length; i++) {
                        if (tickTypeArr[i].id === 'Flash') {
                            tickTypeArr[i].data = highestFlashes;
                        }
                    }
                }
                if (tickType === 'Red point') {
                    gradeAndTime.x = new Date(ascentDate);
                    gradeAndTime.y = gradeValue;

                    highestRedPoints.push(gradeAndTime);
                    highestRedPoints.sort(function (a, b) {
                        return a.y - b.y;
                    });
                    for (let i = 0; i < highestRedPoints.length; i++) {
                        let dateObject = highestRedPoints[i].x;
                        dateObject = dateObject.toISOString().slice(0, 10);
                    }
                    for (let i = 0; i < tickTypeArr.length; i++) {
                        if (tickTypeArr[i].id === 'Red point') {
                            tickTypeArr[i].data = highestRedPoints;
                        }
                    }
                }
            }
            console.log(tickTypeArr[1].data[0].x);
            setData(tickTypeArr);
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
                    // data={[
                    //     {
                    //         id: 'Onsight',
                    //         data: [
                    //             { x: '2018-01-01', y: 5 },
                    //             { x: '2018-01-02', y: 5 },
                    //             { x: '2018-01-03', y: 6 },
                    //             { x: '2018-01-04', y: 7 },
                    //             { x: '2018-01-05', y: 7 },
                    //             { x: '2018-01-06', y: 8 },
                    //             { x: '2018-01-07', y: 9 },
                    //             { x: '2018-01-08', y: 9 },
                    //         ],
                    //     },
                    //     {
                    //         id: 'Flash',
                    //         data: [
                    //             { x: '2018-01-01', y: 6 },
                    //             { x: '2018-01-02', y: 6 },
                    //             { x: '2018-01-03', y: 6 },
                    //             { x: '2018-01-04', y: 7 },
                    //             { x: '2018-01-05', y: 7 },
                    //             { x: '2018-01-06', y: 7 },
                    //             { x: '2018-01-07', y: 8 },
                    //             { x: '2018-01-08', y: 10 },
                    //         ],
                    //     },
                    //     {
                    //         id: 'Redpoint',
                    //         data: [
                    //             { x: '2018-01-01', y: 7 },
                    //             { x: '2018-01-02', y: 8 },
                    //             { x: '2018-01-03', y: 8 },
                    //             { x: '2018-01-04', y: 9 },
                    //             { x: '2018-01-05', y: 9 },
                    //             { x: '2018-01-06', y: 9 },
                    //             { x: '2018-01-07', y: 12 },
                    //             { x: '2018-01-08', y: 13 },
                    //         ],
                    //     },
                    // ]}
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
                    }}
                    axisLeft={{
                        legend: 'linear scale',
                        legendOffset: 12,
                    }}
                    axisBottom={{
                        format: '%b %d',
                        tickValues: 'every 2 days',
                        legend: 'time scale',
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
