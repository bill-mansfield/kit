import * as Constants from '../utils/Constants';
import Firebase from '../services/Firebase';
import Utils from '../utils/Utils';

class Stats {
    // Total Metres climbed method
    async getTotalMetersClimbed() {
        const ascents = await Firebase.getAllAscents();
        let heights = [];

        for (const ascent of ascents) {
            heights.push(ascent.routeHeight);
        }

        return heights.reduce((totalHeight, height) => totalHeight + height);
    }

    async getSuccessfulAscents() {
        const ascents = await Firebase.getSuccessfulAscents();
        return ascents.length;
    }

    async getHardestBoulderAscent() {
        const ascents = await Firebase.getSuccessfulBoulderAscents();
        let gradeArr = ascents.map(ascent =>
            parseInt(ascent.ascentGrade.slice(1)),
        );
        return 'V' + Math.max(...gradeArr);
    }

    async getFavouriteAreas() {
        const ascents = await Firebase.getAllAscents();
        let areas = [];

        for (const ascent of ascents) {
            let cragName = ascent.cragName;

            if (areas.includes(cragName) === false) {
                if (cragName !== undefined) {
                    areas.push(cragName);
                }
            }
        }
        return areas;
    }

    async getHardestTickType(tickType) {
        let tickTypeAscents = await Firebase.getAscentsOfTickType(tickType);

        let gradeArr = tickTypeAscents.map(function (ascent) {
            return ascent.ascentGrade;
        });
        return Math.max(...gradeArr);
    }
}

export default new Stats();
