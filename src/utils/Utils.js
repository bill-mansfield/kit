import * as Constants from './Constants';
import ClimbingGrade from 'climbing-grade';
import Firebase from '../services/Firebase.js';

class Utils {
    async getAscentsByStyle(style) {
        if (style === 'Route') {
            return await Firebase.getRouteAscents();
        } else {
            return await Firebase.getBoulderAscents();
        }
    }

    turnPinkPointsRed(tickType) {
        if (tickType === 'Pink point') {
            tickType = 'Red point';
            return tickType;
        }
        return tickType;
    }

    logAscentfForTickType(
        tickType,
        ascentDate,
        gradeValue,
        tickTypeArr,
        highestOnsights,
        highestFlashes,
        highestRedPoints,
    ) {
        let gradeAndTime = {};

        if (ascentDate != undefined) {
            gradeAndTime.x = ascentDate.slice(0, 10);
        }
        if (this.isANumber(gradeValue)) {
            gradeAndTime.y = gradeValue;
        }

        switch (tickType) {
            case 'Onsight':
                highestOnsights.push(gradeAndTime);
                highestOnsights.sort(function (a, b) {
                    return new Date(a.x) - new Date(b.x);
                });
                this.discardLesserGrades(highestOnsights);
                for (let i = 0; i < tickTypeArr.length; i++) {
                    if (tickTypeArr[i].id === 'Onsight') {
                        tickTypeArr[i].data = highestOnsights;
                    }
                }
                break;
            case 'Flash':
                highestFlashes.push(gradeAndTime);
                highestFlashes.sort(function (a, b) {
                    return new Date(a.x) - new Date(b.x);
                });
                this.discardLesserGrades(highestFlashes);
                for (let i = 0; i < tickTypeArr.length; i++) {
                    if (tickTypeArr[i].id === 'Flash') {
                        tickTypeArr[i].data = highestFlashes;
                    }
                }
                break;
            case 'Red point':
                highestRedPoints.push(gradeAndTime);
                highestRedPoints.sort(function (a, b) {
                    return new Date(a.x) - new Date(b.x);
                });

                //TODO: Add check only add ascent objects if they are the next highest grade
                // Or remove them if they are not the next highest grade
                this.discardLesserGrades(highestRedPoints);
                for (let i = 0; i < tickTypeArr.length; i++) {
                    if (tickTypeArr[i].id === 'Red point') {
                        tickTypeArr[i].data = highestRedPoints;
                    }
                }
                break;
            default:
                break;
        }
    }

    discardLesserGrades(arr) {
        let highestGradeSoFar = 0;
        for (let i = 0; i < arr.length; i++) {
            let compareGrade = parseInt(arr[i].y);
            if (compareGrade >= highestGradeSoFar) {
                highestGradeSoFar = compareGrade;
            } else {
                arr.splice(i, 1);
            }
        }
    }

    getAusGrade(foreignGrade, system) {
        let grade = new ClimbingGrade(foreignGrade, system);
        grade = grade.format('australian');
        // Remove half and half grades where the conversion returns a split e.g 5.11c = 21/22
        if (grade.includes('/')) {
            let chars = grade.split('');
            grade = chars[0] + chars[1];

            return grade;
        }
        return grade;
    }

    convertGradeToAus(gradeValue) {
        if (
            gradeValue != undefined &&
            Constants.FRENCH_GRADE_IDENTIFYER.some((el) =>
                gradeValue.includes(el),
            ) &&
            gradeValue.includes('.') === false
        ) {
            gradeValue = this.getAusGrade(gradeValue, 'french');
            return gradeValue;
        } else if (gradeValue != undefined && gradeValue.includes('.')) {
            gradeValue = this.getAusGrade(gradeValue, 'yds');
            return gradeValue;
        } else {
            return gradeValue;
        }
    }

    addTheVee(gradeArray) {
        for (const gradeObject of gradeArray) {
            gradeObject.Grade = 'V' + gradeObject.Grade;
        }
        return gradeArray;
    }

    incrementTickType(gradeArray, tickType, gradeValue) {
        for (let i = 0; i < gradeArray.length; i++) {
            if (Constants.UNSUCESSFUL_TICKS_TYPE.includes(tickType)) {
                tickType = 'Unsuccessful';
            }
            if (gradeArray[i].Grade === gradeValue) {
                switch (tickType) {
                    case 'Onsight':
                        gradeArray[i].Onsight++;
                        break;
                    case 'Flash':
                        gradeArray[i].Flash++;
                        break;
                    case 'Red point':
                        gradeArray[i].Redpoint++;
                        break;
                    case 'Pink point':
                        gradeArray[i].Redpoint++;
                        break;
                    case 'Tick':
                        gradeArray[i].Tick++;
                        break;
                    case 'Send':
                        gradeArray[i].Send++;
                        break;
                    case 'Repeat':
                        gradeArray[i].Repeat++;
                        break;
                    case 'Unsuccessful':
                        gradeArray[i].Unsuccessful++;
                        break;
                    default:
                        break;
                }
            }
        }
        return this.sortGradeArrByGrade(gradeArray);
    }

    sortGradeArrByGrade(gradeArray) {
        gradeArray.sort((a, b) => {
            return a.Grade - b.Grade;
        });
        return gradeArray;
    }

    notableTickType(ascentType) {
        const successfulTickTypes = [
            'Red point',
            'Pink point',
            'Onsight',
            'Flash',
        ];

        if (successfulTickTypes.includes(ascentType)) {
            return true;
        } else {
            return false;
        }
    }

    successfulTickType(ascentType) {
        if (Constants.SUCCESSFUL_TICK_TYPE.includes(ascentType)) {
            return true;
        } else {
            return false;
        }
    }

    isOnsight(ascentType) {
        if (ascentType === Constants.ONSIGHT_TICK_TYPE) {
            return true;
        } else {
            return false;
        }
    }

    isFlash(ascentType) {
        if (ascentType === Constants.FLASH_TICK_TYPE) {
            return true;
        } else {
            return false;
        }
    }

    isANumber(ascentGrade) {
        if (ascentGrade === undefined || isNaN(ascentGrade)) {
            return false;
        } else {
            return true;
        }
    }
}

export default new Utils();
