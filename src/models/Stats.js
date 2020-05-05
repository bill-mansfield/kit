import * as Constants from '../utils/Constants';
import Firebase from '../services/Firebase';
import Utils from '../utils/Utils';

class Stats {
    // Total Metres climbed method
    async getTotalMetersClimbed() {
        const result = await Firebase.getCurrentUserAscents();
        let totalHeight = 0;

        for (let i = 0; i < result.length; i++) {
            let height = result[i].ascent.routeHeight;
            totalHeight += height;
        }
        return totalHeight;
    }

    async getSuccessfulAscents() {
        const result = await Firebase.getRouteAscents();
        let successfulAscents = 0;

        for (let i = 0; i < result.length; i++) {
            if (Utils.successfulTickType(result[i].ascent.ascentType)) {
                successfulAscents++;
            }
        }
        return successfulAscents;
    }

    async getHardestAscent() {
        const result = await Firebase.getRouteAscents();
        let gradeArr = [];

        for (let i = 0; i < result.length; i++) {
            let tickType = result[i].ascent.ascentType;
            let gradeValue = result[i].ascent.ascentGrade;

            if (gradeValue != undefined && gradeValue.includes('V')) {
                continue;
            }
            if (Utils.successfulTickType(tickType)) {
                gradeValue = Utils.convertGradeToAus(gradeValue);
                if (gradeValue != undefined && gradeValue.includes('/')) {
                    gradeValue = Utils.roundDownSplitGrades(gradeValue);
                }
                gradeArr.push(parseInt(gradeValue));
            }
        }
        return Math.max(...gradeArr);
    }
}

export default new Stats();
