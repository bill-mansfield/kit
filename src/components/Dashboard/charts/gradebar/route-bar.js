import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import firebase from '../../../../services/firebase';
import Ascents from '../../../Ascents/Ascents';
import * as Constants from '../../../Ascents/Constants';

export default function RouteBar() {

    const [data, setData] = useState([{'grade': '16', 'Onsight': 3, 'Flash': 8, 'Redpoint': 15}]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await firebase.getCurrentUserAscents();
            let gradeArr = [];
            let gradeRefArr = [];
            // Starts at 1 as the first row of the CSV(result) is column titles
                for (let i = 1; i < result.length; i++) {
                    let ascent = result[i].file;
                    let gradeValue = ascent[9];
                    let tickType = ascent[3];

                    // Check for French grades, convert to Aus grades
                    if (gradeValue != undefined
                        && Constants.FRENCH_GRADE_IDENTIFYER.some(el => gradeValue.includes(el))
                        && gradeValue.includes('.') === false) 
                        {
                        gradeValue = Ascents.getAusGrade(gradeValue, 'french')
                    }
                    // Check for YDS grades, convert to Aus grades
                    if (gradeValue != undefined && gradeValue.includes('.')) {
                        gradeValue = Ascents.getAusGrade(gradeValue, 'yds')
                    }

                    // Remove boulder ascents/undefined/empty string cases 
                    if (gradeValue != undefined && gradeValue.includes('V') || ascent[0] === '') {
                        continue;
                    }
                    // Remove half and half grades where the conversion returns a split e.g 5.11c = 21/22
                    if (gradeValue.includes('/')) {
                        let chars = gradeValue.split('');
                        gradeValue = chars[0] + chars[1];
                    }

                    if (gradeRefArr.includes(gradeValue) === false) {
                        //GradeRefArr is a referance array to check if there are any ascents recorded for that grade type, if not; create grade.
                        gradeRefArr.push(gradeValue);
                        gradeArr.push(new Object({'Grade': gradeValue, 'Onsight': 0, 'Flash': 0, 'Redpoint': 0, 'Tick': 0, 'Unsuccessful': 0}));
                        Ascents.incrementTickType(gradeArr, tickType, gradeValue);

                    } else if (gradeRefArr.includes(gradeValue)) {
                        Ascents.incrementTickType(gradeArr, tickType, gradeValue);
                    }
                }
                // Arrange grades in consecutive order
                gradeArr.sort(function(a, b){
                    return a.Grade-b.Grade
                })
                setData(gradeArr);
            };
        fetchData();
    }, []);

    const theme = {
        textColor: '#fff'
      };
      
    
return (
        <ResponsiveBar
            data={data}
            keys={[ 'Onsight', 'Flash', 'Redpoint', 'Unsuccessful' ]}
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
                    itemTextColor: '#fff',
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
    )
}