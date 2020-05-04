import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import Firebase from '../../../services/Firebase';
import Ascents from '../../../models/Ascents';
import * as dayjs from 'dayjs';

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
            const result = await Firebase.getCurrentUserAscents();
            // Starts at 1 as the first row of the CSV(result) is column titles
            let ascentDateArr = [];
            let ascentArr = [];
            let ascentFinalArr = [];
            for (let i = 1; i < result.length; i++) {
                let ascent = result[i].file;
                let ascentDate = ascent[21];
                //Get earliest ascent date
                //Add a date to array for every month for each from from the earliest date until now
                //Months with only one ascent may not be recorded...

                if (ascentDate != undefined && ascentDate != 'Log Date') {
                    ascentDateArr.push(ascentDate.slice(0, 7));
                }
            }
            ascentDateArr.sort(function (a, b) {
                return new Date(a) - new Date(b);
            });

            //Get date for every month from earliest til now
            let earliestDate = ascentDateArr[0];
            let todaysDate = dayjs();
            let incrementValue = todaysDate.diff(earliestDate, 'month');
            let fullMonthArr = [];
            for (let i = 1; i < incrementValue; i++) {
                let additionalMonth = dayjs(earliestDate)
                    .add(i, 'month')
                    .format('YYYY-MM');
                fullMonthArr.push(additionalMonth);
            }
            console.log(fullMonthArr);
            ascentDateArr = ascentDateArr.concat(fullMonthArr);

            ascentDateArr.sort(function (a, b) {
                return new Date(a) - new Date(b);
            });

            let counts = {};
            ascentDateArr.forEach(function (x) {
                counts[x] = (counts[x] || 0) + 1;
            });

            ascentArr = Object.entries(counts);

            for (let i = 0; i < ascentArr.length; i++) {
                let ascentObj = {};
                ascentObj.x = ascentArr[i][0] + '-01';
                ascentObj.y = ascentArr[i][1] - 1; // Extra ascent removed as one was added during additon of null ascent months
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
