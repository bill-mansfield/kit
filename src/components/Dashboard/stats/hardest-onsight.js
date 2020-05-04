import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Firebase from '../../../services/Firebase';

const useStyles = makeStyles((theme) => ({}));

export default function HardestOnsight() {
    const classes = useStyles();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await Firebase.getCurrentUserFirebase();
            let gradeArr = [];

            for (let i = 0; i < result.length - 1; i++) {
                let ascent = result[i].file;
                let gradeValue = ascent[9];

                if (Firebase.isOnsight(ascent[3])) {
                    gradeValue = Firebase.convertGradeToAus(gradeValue);
                    if (gradeValue != undefined && gradeValue.includes('/')) {
                        gradeValue = Firebase.roundDownSplitGrades(gradeValue);
                    }
                    gradeArr.push(gradeValue);
                }
            }
            setData(Math.max(...gradeArr));
        };
        fetchData();
    }, []);

    return (
        <Typography className={classes.metresClimbed} variant="h2">
            Hardest Onsight: {data}
        </Typography>
    );
}
