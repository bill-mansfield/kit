import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../services/firebase';
import { Typography } from '@material-ui/core';
import Ascents from  '../../Ascents/Ascents'

const useStyles = makeStyles((theme) => ({

}));

export default function SuccessfulAscents() {
    const classes = useStyles();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await firebase.getCurrentUserAscents();

                let successfulAscents = 0;
                for (let i = 0; i < result.length - 1; i++) {
                    let ascent = result[i].file;

                    if (Ascents.successfulTickType(ascent[3])) {
                        successfulAscents++;
                    }
                }
                setData(successfulAscents);
            };
        fetchData();
    }, []);


    return (
        <Typography className={classes.metresClimbed} variant="h2">
            Amount of successful ascents: {data}
        </Typography>
    )
}