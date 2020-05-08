import * as Constants from '../utils/Constants';
import Firebase from '../services/Firebase';
import Utils from '../utils/Utils';

class Stats {
    // Total Metres climbed method
    async getTotalMetersClimbed() {
        const result = await Firebase.getCurrentUserAscents();
        let totalHeight = 0;

        for (let i = 0; i < result.length; i++) {
            let height = result[i].routeHeight;
            totalHeight += height;
        }
        return totalHeight;
    }

    async getSuccessfulAscents() {
        const result = await Firebase.getCurrentUserAscents();
        let successfulAscents = 0;
        for (let i = 0; i < result.length; i++) {
            if (Utils.successfulTickType(result[i].ascentType)) {
                successfulAscents++;
            }
        }
        return successfulAscents;
    }

    async getHardestRouteAscent() {
        const result = await Firebase.getRouteAscents();
        let gradeArr = [];

        for (let i = 0; i < result.length; i++) {
            let tickType = result[i].ascentType;
            let gradeValue = result[i].ascentGrade;

            if (Utils.successfulTickType(tickType)) {
                gradeArr.push(gradeValue);
            }
        }
        return Math.max(...gradeArr);
    }

    async getHardestBoulderAscent() {
        const result = await Firebase.getBoulderAscents();
        let gradeArr = [];

        for (let i = 0; i < result.length; i++) {
            let tickType = result[i].ascentType;
            let gradeValue = result[i].ascentGrade;

            if (Utils.successfulTickType(tickType)) {
                gradeValue = gradeValue.slice(1);
                gradeArr.push(parseInt(gradeValue));
            }
        }
        let hardestBoulderAscent = Math.max(...gradeArr);
        return 'V' + hardestBoulderAscent;
    }

    async getFavouriteAreas() {
        const ascents = await Firebase.getCurrentUserAscents();
        let areas = [];

        for (const ascent of ascents) {
            let cragName = ascent.cragName;

            if (areas.includes(cragName) === false) {
                if (cragName != undefined) {
                    areas.push(cragName);
                }
            }
        }
        return areas;
    }

    async getHardestTickType(tickType) {
        let tickTypeAscents = await Firebase.getAllAscentsOfTickType(tickType);

        let gradeArr = tickTypeAscents.map(function (ascent) {
            return ascent.ascentGrade;
        });
        return Math.max(...gradeArr);
    }
}

export default new Stats();
