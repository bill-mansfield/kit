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

    console.log(firebase.getCurrentUserAscents());
    let ascents = firebase.getCurrentUserAscents()
    console.log(ascents)
    return (
        <Typography className={classes.metresClimbed} variant="h3">
            Metres climbed: 
        </Typography>
    )
}