import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../services/firebase';
import { Typography } from '@material-ui/core';
import Ascents from '../../Ascents/Ascents';

const useStyles = makeStyles((theme) => ({

}));

export default function HardestOnsight() {
    const classes = useStyles();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await firebase.getCurrentUserAscents();
            let gradeArr = [];

                for (let i = 0; i < result.length - 1; i++) {
                    let ascent = result[i].file;
                    let ascentGrade = parseInt(result[i].file[9])

                    if (Ascents.isOnsight(ascent[3])) { 
                        if (Ascents.isANumber(ascentGrade)) {
                            gradeArr.push(ascent[9]);
                        }
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
    )
}