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
    const [lowestGrade, setLowestGrade] = useState(12);

    useEffect(() => {
        const fetchData = async () => {
            const result = await firebase.getCurrentUserAscents();
            let tickTypeRefArr = [];
            let tickTypeArr = [];
            let highestOnsights = [];
            let highestFlashes = [];
            let highestRedPoints = [];
            // Starts at 1 as the first row of the CSV(result) is column titles
            for (let i = 1; i < result.length; i++) {
                let ascent = result[i].file;
                let gradeValue = ascent[9];
                let tickType = ascent[3];
                let ascentDate = ascent[21];

                if (gradeValue != undefined) {
                    // Remove boulder ascents/trash grades/empty string cases
                    if (
                        Constants.TRASH_GRADE_IDENTIFYER.some((el) =>
                            gradeValue.includes(el),
                        ) ||
                        gradeValue.includes('V') ||
                        ascent[0] === ''
                    ) {
                        continue;
                    }
                }

                tickType = Ascents.turnPinkPointsRed(tickType);
                gradeValue = Ascents.convertGradeToAus(gradeValue);

                if (tickTypeRefArr.includes(tickType) === false) {
                    if (Ascents.notableTickType(tickType)) {
                        tickTypeRefArr.push(tickType);
                        let tickTypeObj = {};
                        tickTypeObj.id = tickType;
                        tickTypeArr.push(tickTypeObj);
                    }
                }

                Ascents.logAscentfForTickType(
                    tickType,
                    ascentDate,
                    gradeValue,
                    tickTypeArr,
                    highestOnsights,
                    highestFlashes,
                    highestRedPoints,
                );
            }
            Ascents.getLowestGrade(tickTypeArr);
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
                        min: { lowestGrade },
                    }}
                    axisLeft={{
                        legend: 'linear scale',
                        legendOffset: 12,
                    }}
                    axisBottom={{
                        format: '%b %d %y',
                        tickValues: 'every 6 months',
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
