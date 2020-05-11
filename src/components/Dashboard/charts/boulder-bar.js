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
            //const result = await Firebase.getCurrentUserAscents();
            //let gradeArr = [];
            //let gradeRefArr = [];
            //// Starts at 1 as the first row of the CSV(result) is column titles
            //for (let i = 1; i < result.length; i++) {
            //    let ascent = result[i].file;
            //    let gradeValue = ascent[9];
            //    let tickType = ascent[3];

            //    // Remove the 'V' from grading for sorting simplicity
            //    // Skip over undefined cases
            //    if (gradeValue != undefined) {
            //        if (
            //            gradeValue.includes('V') === false ||
            //            ascent[0] === ''
            //        ) {
            //            continue;
            //        } else {
            //            gradeValue = gradeValue.replace('V', '');
            //        }
            //    } else {
            //        continue;
            //    }
            //    if (gradeRefArr.includes(gradeValue) === false) {
            //        //GradeRefArr is a referance array to check if there are any ascents recorded for that grade type, if not; create grade object in gradeArr..
            //        gradeRefArr.push(gradeValue);
            //        gradeArr.push(
            //            new Object({
            //                Grade: gradeValue,
            //                Onsight: 0,
            //                Flash: 0,
            //                Send: 0,
            //                Tick: 0,
            //                Repeat: 0,
            //                Unsuccessful: 0,
            //            }),
            //        );
            //        Ascents.incrementTickType(gradeArr, tickType, gradeValue);
            //    } else if (gradeRefArr.includes(gradeValue)) {
            //        Ascents.incrementTickType(gradeArr, tickType, gradeValue);
            //    }
            //}
            //// Order the grades from lowest to highests
            //gradeArr.sort(function (a, b) {
            //    return a.Grade - b.Grade;
            //});

            //// Put back the V from the grade that was previously removed
            //for (let i = 0; i < gradeArr.length; i++) {
            //    let theV = 'V';
            //    gradeArr[i].Grade = theV += gradeArr[i].Grade;
            //}
            //setData(gradeArr);
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
