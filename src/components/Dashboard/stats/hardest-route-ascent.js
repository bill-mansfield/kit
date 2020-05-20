import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Stats from '../../../models/Stats';

const useStyles = makeStyles((theme) => ({}));

export default function HardestRouteAscent() {
    const classes = useStyles();
    const [routeData, setRouteData] = useState('9c+');

    useEffect(() => {
        const fetchData = async () => {
            setRouteData(await Stats.getHardestTickType('Red point'));
        };
        fetchData();
    }, []);

    return (
        <Typography className={classes.metresClimbed} variant="h2">
            Hardest red point Ascent:
            {Number.isInteger(routeData)
                ? ' ' + routeData
                : ' No recorded red points'}
        </Typography>
    );
}
