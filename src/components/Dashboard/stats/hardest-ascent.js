import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../services/firebase';
import { Typography } from '@material-ui/core';
import Ascents from '../../Ascents/Ascents';
import * as Constants from '../../Ascents/Constants';

const useStyles = makeStyles((theme) => ({

}));

export default function HardestAscent() {
    const classes = useStyles();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await firebase.getCurrentUserAscents();
            let gradeArr = [];

                for (let i = 0; i < result.length - 1; i++) {
                    let ascent = result[i].file;
                    let gradeValue = ascent[9];
                    
                    if (gradeValue != undefined && gradeValue.includes('V')) {
                        continue;
                    }
                    if (Ascents.successfulTickType(ascent[3])) {
                        gradeValue = Ascents.convertGradeToAus(gradeValue);
                        if (gradeValue != undefined && gradeValue.includes('/')) {
                            gradeValue = Ascents.roundDownSplitGrades(gradeValue)
                        }
                        gradeArr.push(parseInt(gradeValue));
                    }
                }
                setData(Math.max(...gradeArr));
            };
        fetchData();
    }, []);


    return (
        <Typography className={classes.metresClimbed} variant="h2">
            Hardest Ascent: {data}
        </Typography>
    )
}