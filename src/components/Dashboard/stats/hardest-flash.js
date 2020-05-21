import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Stats from '../../../models/Stats';

const useStyles = makeStyles((theme) => ({}));

export default function HardestFlash() {
    const classes = useStyles();
    const [data, setData] = useState(16);

    useEffect(() => {
        const fetchData = async () => {
            setData(await Stats.getHardestTickType('Flash'));
        };
        fetchData();
    }, [data]);

    return (
        <>
            <Typography className={classes.metresClimbed} variant="h2">
                Flash:
            </Typography>
            <Typography variant="h2">
                {Number.isInteger(data) ? ' ' + data : ' No recorded flashes'}
            </Typography>
        </>
    );
}
