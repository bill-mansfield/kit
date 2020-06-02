import Firebase from '../services/Firebase';
import Utils from '../utils/Utils';

class Ascents {
    // Uploader methods
    validateAscentData(parsedResults) {
        for (let i = 0; i < parsedResults.data.length; i++) {
            let ascent = parsedResults.data[i];
            if (ascent[1] === undefined) {
                continue;
            } else if (ascent[0] === 'Ascent Label') {
                continue;
            } else {
                this.addAscent(ascent);
            }
        }
    }

    addAscent(ascent) {
        // Create ascent object to add to database
        let ascentObj = {};
        ascentObj.name = ascent[0];
        ascentObj.ascentId = ascent[1];
        ascentObj.ascentLink = ascent[2];
        ascentObj.ascentType = this.sanitiseAscentType(ascent[3]);
        ascentObj.ascentGrade = this.saveGradesInAus(ascent[4]);
        ascentObj.isBoulder = this.isBoulder(ascent[4]);
        ascentObj.numberOfAscents = ascent[5];
        ascentObj.routeStars = ascent[6];
        ascentObj.routeHeight = this.sanitiseHeight(ascent[7]);
        ascentObj.routeName = ascent[8];
        ascentObj.routeGrade = this.saveGradesInAus(ascent[9]);
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
        ascentObj.ascentDate = this.sanitiseDate(ascent[20]);
        ascentObj.logDate = ascent[21];
        ascentObj.shot = ascent[22];
        ascentObj.tripName = ascent[23];
        ascentObj.tripId = ascent[24];
        ascentObj.tripLink = ascent[25];
        Firebase.writeAscents(ascentObj);
    }

    addNewAscent(ascent) {
        let ascentObj = {};
        ascentObj.name = ascent.climbName;
        ascentObj.ascentType = ascent.ascentType;
        ascentObj.ascentGrade = this.saveGradesInAus(ascent.grade);
        ascentObj.routeGrade = this.saveGradesInAus(ascent.grade);
        ascentObj.isBoulder = this.isBoulder(ascent.grade);
        ascentObj.routeHeight = this.sanitiseHeight(ascent.height);
        ascentObj.ascentDate = ascent.when;
        ascentObj.cragName = ascent.cragName;
        Firebase.writeAscents(ascentObj);
    }

    editAscent(ascent) {
        // TODO: uniquely identify ascent object to be able to update some
        // fields from ascent table
    }

    sanitiseDate(ascentDate) {
        if (ascentDate !== undefined && ascentDate !== 'Log Date') {
            return ascentDate.slice(0, 7);
        }
    }

    sanitiseAscentType(ascentType) {
        if (ascentType === 'Pink point') {
            return 'Red point';
        } else {
            return ascentType;
        }
    }

    sanitiseHeight(height) {
        if (height === undefined || height === '') {
            return 0;
        } else if (height.includes('m')) {
            return (height = parseInt(height.slice(0, -1)));
        } else {
            return parseInt(height);
        }
    }

    isBoulder(grade) {
        if (grade !== undefined && grade.includes('V')) {
            return true;
        } else {
            return false;
        }
    }

    saveGradesInAus(grade) {
        if (grade.includes('V')) {
            return grade;
        } else if (grade === undefined) {
            return 0;
        } else {
            let convertedGrade = Utils.convertGradeToAus(grade);
            if (convertedGrade.includes('/')) {
                convertedGrade = Utils.roundDownSplitGrades(grade);
            }
            convertedGrade = parseInt(convertedGrade);
            return convertedGrade;
        }
    }
}

export default new Ascents();
