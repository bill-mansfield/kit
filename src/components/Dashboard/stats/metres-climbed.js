import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../services/firebase';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    metresClimbed: {
        color: 'green',
    }
}));

export default function MetresClimbed() {
    const classes = useStyles();

    async function ascents() {
        const response = await firebase.getCurrentUserAscents();
        console.log(response);
        return response;
    }

    ascents();

    return (
        <Typography className={classes.metresClimbed} variant="h3">
            Metres climbed: 
        </Typography>
    )
}