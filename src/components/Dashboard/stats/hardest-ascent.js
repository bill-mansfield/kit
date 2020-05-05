import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Stats from '../../../models/Stats';

const useStyles = makeStyles((theme) => ({}));

export default function HardestAscent() {
    const classes = useStyles();
    const [data, setData] = useState('9c+');

    useEffect(() => {
        const fetchData = async () => {
            setData(await Stats.getHardestAscent());
        };
        fetchData();
    }, []);

    return (
        <Typography className={classes.metresClimbed} variant="h2">
            Hardest Ascent: {data}
        </Typography>
    );
}
