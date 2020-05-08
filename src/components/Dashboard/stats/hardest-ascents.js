import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Stats from '../../../models/Stats';

const useStyles = makeStyles(theme => ({}));

export default function HardestAscents() {
    const classes = useStyles();
    const [routeData, setRouteData] = useState('9c+');
    const [boulderData, setBoulderData] = useState('V12');

    useEffect(() => {
        const fetchData = async () => {
            setRouteData(await Stats.getHardestTickType('Red point'));
            setBoulderData(await Stats.getHardestBoulderAscent());
        };
        fetchData();
    }, []);

    return (
        <>
            <Typography className={classes.metresClimbed} variant="h2">
                Hardest red point Ascent:
                {Number.isInteger(routeData)
                    ? ' ' + routeData
                    : ' No recorded red points'}
            </Typography>
            <Typography className={classes.metresClimbed} variant="h2">
                Hardest Boulder Ascent:
                {boulderData === 'VNaN'
                    ? ' No recorded boulder ascents'
                    : ' ' + boulderData}
            </Typography>
        </>
    );
}
