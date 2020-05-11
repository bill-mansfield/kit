import * as Constants from '../utils/Constants';
import Firebase from '../services/Firebase';
import Ascents from '../models/Ascents';
import Utils from '../utils/Utils.js';

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
        if (style !== 'Route') {
            gradeArr = Utils.addTheVee(gradeArr);
        }
        return gradeArr;
    }
}

export default new Charts();
