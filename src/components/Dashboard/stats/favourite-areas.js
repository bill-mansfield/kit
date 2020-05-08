import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from '../../../services/Firebase';
import { Typography } from '@material-ui/core';
import Ascents from '../../../models/Ascents';
import Stats from '../../../models/Stats';

const useStyles = makeStyles(theme => ({
    listItem: {
        color: theme.palette.primary.text,
        listStyle: 'none',
    },
}));

export default function FavouriteAreas() {
    const classes = useStyles();
    const [data, setData] = useState(['']);

    useEffect(() => {
        const fetchData = async () => {
            setData(await Stats.getFavouriteAreas());
        };
        fetchData();
    }, []);

    return (
        <>
            <Typography variant="h2">Your climbing areas:</Typography>
            <ul>
                {data.map(item => (
                    <li key={item} className={classes.listItem}>
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
}
