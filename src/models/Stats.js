import Firebase from '../services/Firebase';

class Stats {
    // Total Metres climbed method
    async getTotalMetersClimbed() {
        const ascents = await Firebase.getAllAscents();
        let heights = [];

        for (const ascent of ascents) {
            heights.push(ascent.routeHeight);
        }
        if (heights.length !== 0) {
            return heights.reduce(
                (totalHeight, height) => totalHeight + height,
            );
        }
    }

    async getSuccessfulAscents() {
        const ascents = await Firebase.getSuccessfulAscents();
        return ascents.length;
    }

    async getHardestBoulderAscent() {
        const ascents = await Firebase.getSuccessfulBoulderAscents();
        let gradeArr = ascents.map((ascent) =>
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

        let gradeArr = tickTypeAscents.map((ascent) => {
            return ascent.ascentGrade;
        });
        return Math.max(...gradeArr);
    }

    async getHardestBoulderTickType(tickType) {
        const ascents = await Firebase.getBoulderAscentsOfTickType(tickType);
        let gradeArr = ascents.map((ascent) =>
            parseInt(ascent.ascentGrade.slice(1)),
        );
        return 'V' + Math.max(...gradeArr);
    }
}

export default new Stats();
