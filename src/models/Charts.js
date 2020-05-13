import Utils from '../utils/Utils.js';
import * as dayjs from 'dayjs';

class Charts {
    async getBarData(style) {
        //Determine if route data or bouldering data is requested
        let ascents = await Utils.getAscentsByStyle(style);
        let gradeArr = [];
        let gradeRefArr = [];

        for (const ascent of ascents) {
            let gradeObj = {};

            //Create grade object to store record of how many ascents of each
            //tick type
            if (style === 'Route') {
                gradeObj.Grade = ascent.ascentGrade;
            } else {
                gradeObj.Grade = parseInt(ascent.ascentGrade.slice(1));
            }
            gradeObj.Onsight = 0;
            gradeObj.Flash = 0;
            gradeObj.Redpoint = 0;
            gradeObj.Tick = 0;
            gradeObj.Send = 0;
            gradeObj.Repeat = 0;
            gradeObj.Unsuccessful = 0;

            //Check to see if a record already exists in the reference array
            //for this grade if it does not exist add the new record to the
            //reference array and grade array
            if (gradeRefArr.includes(gradeObj.Grade) === false) {
                gradeRefArr.push(gradeObj.Grade);
                gradeArr.push(gradeObj);
            }

            //Increment tick type counter for each ascent
            gradeArr = Utils.incrementTickType(
                gradeArr,
                ascent.ascentType,
                gradeObj.Grade,
            );
        }
        Utils.cleanGradeArr(style, gradeArr);
        return gradeArr;
    }

    async getLineData(style) {
        //Allow ascents to be for routes or boulders by specifying 'Route' in
        //function call for routes or 'Boulder' for boulders
        let ascents = await Utils.getAscentsByStyle(style);
        let tickTypeArr = [];
        let highestOnsights = [];
        let highestFlashes = [];
        let highestRedPoints = [];
        let tickTypeRefArr = [];

        //Go through ascents create reference array to remove duplicates
        //If ascent type is OS,FL or RP record it in tickTypeObj
        for (const ascent of ascents) {
            if (Utils.notableTickType(ascent.ascentType)) {
                if (tickTypeRefArr.includes(ascent.ascentType) === false) {
                    tickTypeRefArr.push(ascent.ascentType);
                    let tickTypeObj = {};
                    tickTypeObj.id = ascent.ascentType;
                    tickTypeArr.push(tickTypeObj);
                }
            }

            //Log ascents for each grade and ascent type store in tickTypeArr
            Utils.logAscentfForTickType(
                ascent.ascentType,
                ascent.ascentDate,
                ascent.ascentGrade,
                tickTypeArr,
                highestOnsights,
                highestFlashes,
                highestRedPoints,
            );
        }
        return tickTypeArr;
    }

    async getVolumeData(style) {
        //Get ascents by style (boulder or route)
        let ascents = await Utils.getAscentsByStyle(style);
        let ascentDateArr = [];
        let ascentArr = [];
        let ascentFinalArr = [];

        for (const ascent of ascents) {
            ascentDateArr.push(ascent.ascentDate);
        }
        ascentDateArr.sort((a, b) => {
            return new Date(a) - new Date(b);
        });

        //The following code is spaghetti
        //It takes all the ascents and records amount of acents in each month
        //By counting duplicate date records.
        //It then caluclates the amount of months from the eariest ascent until
        //now utilising dayJS date package this allows the volume chart to
        //display climbing data for not only months when ascents were recorded
        //but also empty months when no ascents were recorded

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
        ascentDateArr = ascentDateArr.concat(fullMonthArr);

        ascentDateArr.sort((a, b) => {
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
        return lastArr;
    }
}

export default new Charts();
