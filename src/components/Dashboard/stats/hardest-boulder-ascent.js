import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Stats from '../../../models/Stats';

const useStyles = makeStyles((theme) => ({}));

export default function HardestRouteAscent() {
    const classes = useStyles();
    const [boulderData, setBoulderData] = useState('V12');

    useEffect(() => {
        const fetchData = async () => {
            setBoulderData(await Stats.getHardestBoulderAscent());
        };
        fetchData();
    }, []);

    return (
        <>
            <Typography className={classes.metresClimbed} variant="h2">
                Tick:
            </Typography>
            <Typography className={classes.metresClimbed} variant="h2">
                {boulderData === 'VNaN'
                    ? ' No recorded boulder ascents'
                    : ' ' + boulderData}
            </Typography>
        </>
    );
}
