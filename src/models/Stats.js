import * as Constants from '../utils/Constants';
import Firebase from '../services/Firebase';

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
}

export default new Stats();
