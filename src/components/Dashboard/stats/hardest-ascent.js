import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../services/firebase';
import { Typography } from '@material-ui/core';
import Ascents from '../../Ascents/Ascents';

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
                    let ascentGrade = parseInt(result[i].file[9])

                    if (Ascents.successfulTickType(ascent[3])) {
                        if (isNaN(ascentGrade)) {
                            ascentGrade = 0;
                        }
                        
                        gradeArr.push(ascent[9]);
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