import * as Constants from './Constants';
import ClimbingGrade from 'climbing-grade';

class Ascents {
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

        gradeAndTime.x = ascentDate.slice(0, 10);
        gradeAndTime.y = gradeValue;

        switch (tickType) {
            case 'Onsight':
                highestOnsights.push(gradeAndTime);
                highestOnsights.sort(function (a, b) {
                    return new Date(a.x) - new Date(b.x);
                });
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
                for (let i = 0; i < tickTypeArr.length; i++) {
                    if (tickTypeArr[i].id === 'Red point') {
                        tickTypeArr[i].data = highestRedPoints;
                    }
                }
                break;
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
                }
            }
        }
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
        const successfulTickTypes = [
            'Red point',
            'Pink point',
            'Onsight',
            'Flash',
            'Tick',
            'Deep water solo',
            'Ground up red point',
            'Top rope',
        ];

        if (successfulTickTypes.includes(ascentType)) {
            return true;
        } else {
            return false;
        }
    }

    isOnsight(ascentType) {
        const onsightTickType = 'Onsight';

        if (ascentType === onsightTickType) {
            return true;
        } else {
            return false;
        }
    }

    isFlash(ascentType) {
        const flashTickType = 'Flash';

        if (ascentType === flashTickType) {
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

export default new Ascents();
