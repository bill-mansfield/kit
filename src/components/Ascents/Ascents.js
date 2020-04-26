import * as Constants from './Constants';

class Ascents {
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
        ]

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
