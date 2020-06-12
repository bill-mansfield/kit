import React from 'react';
import * as Constants from './Constants';
import ClimbingGrade from 'climbing-grade';
import Firebase from '../services/Firebase.js';
import { useTheme } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';

class Utils {
    async reduceAreas(data) {
        return data;
    }

    createTickTypeSelects() {
        let menuItemArr = [];
        for (const tickType of Constants.ALL_TICK_TYPES) {
            let menuItem = '';
            menuItem = (
                <MenuItem key={tickType} value={tickType}>
                    {tickType}
                </MenuItem>
            );
            menuItemArr.push(menuItem);
        }
        return menuItemArr;
    }

    async cleanTableAscents(ascentArr) {
        ascentArr = await ascentArr;
        let cleanAscentArr = [];

        for (const ascent of ascentArr) {
            let cleanAscentObj = {};
            cleanAscentObj.ID = ascent.ID;
            cleanAscentObj.climbName = ascent.name;
            cleanAscentObj.ascentType = ascent.ascentType;
            cleanAscentObj.grade = ascent.ascentGrade;
            cleanAscentObj.cragName = ascent.cragName;
            cleanAscentObj.height = ascent.routeHeight;
            cleanAscentObj.when = ascent.ascentDate;
            cleanAscentArr.push(cleanAscentObj);
        }
        return cleanAscentArr;
    }

    determineDifficultyColor(ascentGrade, isBoulder) {
        const theme = useTheme();
        let bgColor = '';

        if (isBoulder === false) {
            if (ascentGrade === 0) {
                bgColor = theme.palette.primary.main;
            } else if (ascentGrade <= 14) {
                bgColor = 'green';
            } else if (ascentGrade >= 15 && ascentGrade <= 19) {
                bgColor = 'yellow';
            } else if (ascentGrade >= 20 && ascentGrade <= 24) {
                bgColor = 'orange';
            } else if (ascentGrade >= 25 && ascentGrade <= 30) {
                bgColor = 'red';
            } else {
                bgColor = 'purple';
            }
        } else if (isBoulder === true) {
            if (Constants.BOULDER_GRADE_GREEN.includes(ascentGrade)) {
                bgColor = 'green';
            } else if (Constants.BOULDER_GRADE_YELLOW.includes(ascentGrade)) {
                bgColor = 'yellow';
            } else if (Constants.BOULDER_GRADE_ORANGE.includes(ascentGrade)) {
                bgColor = 'orange';
            } else if (Constants.BOULDER_GRADE_RED.includes(ascentGrade)) {
                bgColor = 'red';
            } else if (Constants.BOULDER_GRADE_PURPLE.includes(ascentGrade)) {
                bgColor = 'purple';
            } else {
                bgColor = theme.palette.primary.main;
            }
        }
        return bgColor;
    }

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

        if (ascentDate !== undefined) {
            gradeAndTime.x = ascentDate + '-01';
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
            gradeValue !== undefined &&
            Constants.FRENCH_GRADE_IDENTIFYER.some((el) =>
                gradeValue.includes(el),
            ) &&
            gradeValue.includes('.') === false
        ) {
            gradeValue = this.getAusGrade(gradeValue, 'french');
            return gradeValue;
        } else if (gradeValue !== undefined && gradeValue.includes('.')) {
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

    gradesToString(gradeArray) {
        for (const grade of gradeArray) {
            grade.Grade = grade.Grade.toString();
        }
        return gradeArray;
    }

    cleanGradeArr(style, gradeArray) {
        for (const gradeObject of gradeArray) {
            if (style === 'Route') {
                gradeObject.Grade = gradeObject.Grade.toString();
            } else {
                gradeObject.Grade = 'V' + gradeObject.Grade;
            }
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
