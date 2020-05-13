import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Stats from '../../../models/Stats';

const useStyles = makeStyles((theme) => ({}));

export default function HardestOnsight() {
    const classes = useStyles();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setData(await Stats.getHardestTickType('Onsight'));
        };
        fetchData();
    }, []);

    return (
        <Typography className={classes.metresClimbed} variant="h2">
            Hardest Onsight:
            {Number.isInteger(data) ? ' ' + data : ' No recorded onsights'}
        </Typography>
    );
}
