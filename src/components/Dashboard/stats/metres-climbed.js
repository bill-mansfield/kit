import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from '../../../services/Firebase';
import Stats from '../../../models/Stats';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

export default function MetresClimbed() {
    const classes = useStyles();
    const [data, setData] = useState('0m');

    useEffect(() => {
        const fetchData = async () => {
            const result = await Stats.getTotalMetersClimbed();
            setData(result + 'm'); // 'm' is for meters
        };
        fetchData();
    }, []);

    return (
        <Typography className={classes.metresClimbed} variant="h2">
            Metres climbed: {data}
        </Typography>
    );
}
