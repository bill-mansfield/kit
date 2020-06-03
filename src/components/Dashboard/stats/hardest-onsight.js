import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Stats from '../../../models/Stats';
import Utils from '../../../utils/Utils';

const useStyles = makeStyles((theme) => ({}));

export default function HardestOnsight() {
    const classes = useStyles();
    const [data, setData] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setData(await Stats.getHardestTickType('Onsight'));
        };
        fetchData();
    }, []);

    return (
        <>
            <Typography className={classes.metresClimbed} variant="h2">
                Onsight:
            </Typography>
            <Typography
                variant="h2"
                style={{
                    backgroundColor: Utils.determineDifficultyColor(
                        data,
                        false,
                    ),
                }}
            >
                {Number.isInteger(data) ? ' ' + data : '0'}
            </Typography>
        </>
    );
}
