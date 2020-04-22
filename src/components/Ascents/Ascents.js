class Ascents {
    constructor() {
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
