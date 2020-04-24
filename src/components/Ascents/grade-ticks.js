export default class GradeTicks {
    constructor(grade, addTickType, addAscent) {
        let onsightCounter = 0;
        let flashCounter = 0;
        let redpointCounter = 0;
        this.grade = grade;
        this.addTickType = addTickType;
        this.addAscent = function() {
            switch(this.addTickType) {
                case 'Onsight':
                    onsightCounter++
                    break;
                case 'Flash':
                    flashCounter++
                    break;
                case 'Redpoint':
                   redpointCounter++
                    break;
            }
        }
        this.getOnsights = function() {
            return onsightCounter;
        }
        this.getFlashes = function() {
            return flashCounter;
        }
        this.getRedpoints = function() {
            return redpointCounter;
        }
    }
}