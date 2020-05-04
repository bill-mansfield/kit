import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../services/firebase';
import Ascents from '../../../models/Ascents';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

export default function MetresClimbed() {
    const classes = useStyles();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setData(totalMetres);
        };
        fetchData();
    }, []);

    return (
        <Typography className={classes.metresClimbed} variant="h2">
            Metres climbed: {data}
        </Typography>
    );
}
