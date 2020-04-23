import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import data from './data.json';
import FlexRow from '../../../layouts/flex-row';
import Ascents from '../../../Ascents/Ascents';
import GradeTicks from '../../../Ascents/grade-ticks';
import firebase from '../../../../services/firebase';

export default function GradeBar() {

    const [chartData, setChartData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await firebase.getCurrentUserAscents();
            let gradeArr = [];
            let gradeRefArr = [];
            console.log(result);

                for (let i = 0; i < result.length - 1; i++) {
                    let ascent = result[i].file;
                    let gradeValue = ascent[9];
                    let tickType = ascent[3];

                    if (gradeRefArr.includes(gradeValue) === false) {
                        gradeRefArr.push(gradeValue);
                        gradeArr.push(new GradeTicks(gradeValue, tickType));

                    } else if(gradeRefArr.includes(gradeValue)) {
                        for (let i = 0; i < gradeArr.length; i++) {
                            if (gradeArr[i].grade === gradeValue) {
                                gradeArr[i].addAscent(tickType);



    //fuck all this shit use object literal

    let gradetTicks = {};


                            }
                        }
                    }
                    console.log(gradeRefArr)
                }
                console.log(gradeArr);
                console.log(gradeArr[1].getFlashes());
                console.log(gradeArr[1].getOnsights());
                console.log(gradeArr[1].getRedpoints());
                setChartData();
            };
        fetchData();
    }, []);

    let gradeObj = new GradeTicks('16', true, false, false)
    

    return (
        <FlexRow style={{
            height: '50vh',
        }}>
            <ResponsiveBar
                data={data}
                keys={[ 'Onsight', 'Flash', 'Redpoint', ]}
                indexBy="grade"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
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
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                borderColor={{ from: 'color', modifiers: [ [ 'brighter', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Ticks',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Grade',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{from: 'color', modifiers: [ [ 'brighter', 1.6 ] ]}}
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
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </FlexRow>
    )
}