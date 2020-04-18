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
        return await firebase.getCurrentUserAscents();
    }

    const metres = (value) => {
        let totalMetres = 0;
        let i = 0;
        // console.log(value)
        for (let i = 0; i < value.length - 1; i++) {
            let climbLength = value[i].file[7];

            climbLength = climbLength.replace('m', '');
            climbLength = parseInt(climbLength);
            // console.log(climbLength);
            totalMetres += climbLength;
        }
        return totalMetres;
    }

    ascents().then(function(value) {
        console.log(metres(value) + ' metres climbed');
    });


    return (
        <Typography className={classes.metresClimbed} variant="h3">
            Metres climbed: 
        </Typography>
    )
}