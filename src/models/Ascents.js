import * as Constants from '../utils/Constants';
import ClimbingGrade from 'climbing-grade';
import Firebase from '../services/Firebase';

class Ascents {
    // Uploader methods
    validateAscentData(parsedResults) {
        for (let i = 0; i < parsedResults.data.length; i++) {
            let ascent = parsedResults.data[i];
            if (ascent[1] === undefined) {
                console.log('write skipped');
                continue;
            } else if (ascent[0] === 'Ascent Label') {
                console.log('write skipped');
                continue;
            } else {
                this.addAscent(ascent);
                console.log('Ascent written');
            }
        }
    }

    addAscent(ascent) {
        // Create ascent object to add to database
        let ascentObj = {};
        ascentObj.name = ascent[0];
        ascentObj.ascentId = ascent[1];
        ascentObj.ascentLink = ascent[2];
        ascentObj.ascentType = ascent[3];
        ascentObj.ascentGrade = ascent[4];
        ascentObj.numberOfAscents = ascent[5];
        ascentObj.routeStars = ascent[6];
        ascentObj.routeHeight = this.sanitiseHeight(ascent[7]);
        ascentObj.routeName = ascent[8];
        ascentObj.routeGrade = ascent[9];
        ascentObj.routeId = ascent[10];
        ascentObj.routeLink = ascent[11];
        ascentObj.country = ascent[12];
        ascentObj.countryLink = ascent[13];
        ascentObj.cragName = ascent[14];
        ascentObj.cragLink = ascent[15];
        ascentObj.cragPath = ascent[16];
        ascentObj.climbedWith = ascent[17];
        ascentObj.comment = ascent[18];
        ascentObj.quality = ascent[19];
        ascentObj.ascentDate = ascent[20];
        ascentObj.logDate = ascent[21];
        ascentObj.shot = ascent[22];
        ascentObj.tripName = ascent[23];
        ascentObj.tripId = ascent[24];
        ascentObj.tripLink = ascent[25];

        Firebase.writeAscents(ascentObj);
    }

    sanitiseHeight(height) {
        if (height === undefined || height === '') {
            return 0;
        } else {
            return (height = parseInt(height.slice(0, -1)));
        }
    }
}

export default new Ascents();
