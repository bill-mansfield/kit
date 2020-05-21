import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Stats from '../../../models/Stats';

const useStyles = makeStyles((theme) => ({}));

export default function SuccessfulAscents() {
    const classes = useStyles();
    const [data, setData] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setData(await Stats.getSuccessfulAscents());
        };
        fetchData();
    }, []);

    return (
        <>
            <Typography className={classes.metresClimbed} variant="h2">
                Successful ascents:
            </Typography>
            <Typography variant="h2">{data}</Typography>
        </>
    );
}
