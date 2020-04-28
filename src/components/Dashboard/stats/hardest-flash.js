import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../services/firebase';
import { Typography } from '@material-ui/core';
import Ascents from '../../Ascents/Ascents';

const useStyles = makeStyles((theme) => ({

}));

export default function HardestFlash() {
    const classes = useStyles();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await firebase.getCurrentUserAscents();
            let gradeArr = [];

                for (let i = 0; i < result.length - 1; i++) {
                    let ascent = result[i].file;
                    let gradeValue = ascent[9];

                    // Remove boulder ascents/undefined/empty string cases 
                    if (gradeValue != undefined && gradeValue.includes('V') || ascent[0] === '') {
                        continue;
                    } 
                    if (Ascents.isFlash(ascent[3])) { 
                        // Remove boulder ascents/undefined/empty string cases 
                        gradeValue = Ascents.convertGradeToAus(gradeValue);
                        gradeArr.push(parseInt(gradeValue));
                    }

                }
                setData(Math.max(...gradeArr));
            };
        fetchData();
    }, []);


    return (
        <Typography className={classes.metresClimbed} variant="h2">
            Hardest Flash: {data}
        </Typography>
    )
}