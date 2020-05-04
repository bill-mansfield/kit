import * as Constants from './Constants';
import ClimbingGrade from 'climbing-grade';

class Ascents {
    async getCurrentUserAscents() {
        const ascentsRef = firebase.getAscentsRef();

        const response = await ascentsRef.get().then(function (querySnapshot) {
            let ascents = [];
            querySnapshot.forEach(function (doc) {
                ascents.push(doc.data());
            });
            return ascents;
        });
        return response;
    }

    async getTotalMetresClimbed() {
        const ascentsRef = firebase.getAscentsRef();
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
}

export default new Ascents();
