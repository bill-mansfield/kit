import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Stats from '../../../models/Stats';
import Utils from '../../../utils/Utils';

const useStyles = makeStyles((theme) => ({}));

export default function HardestRouteAscent() {
    const classes = useStyles();
    const [routeData, setRouteData] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setRouteData(await Stats.getHardestTickType('Red point'));
        };
        fetchData();
    }, []);

    return (
        <>
            <Typography className={classes.metresClimbed} variant="h2">
                Red point:
            </Typography>
            <Typography
                variant="h2"
                style={{
                    backgroundColor: Utils.determineDifficultyColor(
                        routeData,
                        false,
                    ),
                }}
            >
                {Number.isInteger(routeData) ? ' ' + routeData : '0'}
            </Typography>
        </>
    );
}
