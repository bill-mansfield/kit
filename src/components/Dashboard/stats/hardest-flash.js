import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from '../../../services/Firebase';
import { Typography } from '@material-ui/core';
import Ascents from '../../../models/Ascents';
import Stats from '../../../models/Stats';

const useStyles = makeStyles((theme) => ({}));

export default function HardestFlash() {
    const classes = useStyles();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setData(await Stats.getHardestRouteFlash());
        };
        fetchData();
    }, []);

    return (
        <Typography className={classes.metresClimbed} variant="h2">
            Hardest Flash: {data}
        </Typography>
    );
}
