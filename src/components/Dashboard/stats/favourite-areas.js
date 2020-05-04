import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Firebase from '../../../services/Firebase';
import { Typography } from '@material-ui/core';
import Ascents from '../../../models/Ascents';

const useStyles = makeStyles((theme) => ({
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
            const result = await Firebase.getCurrentUserAscents();
            let climbingAreas = [];

            for (let i = 0; i < result.length - 1; i++) {
                let ascent = result[i].file;
                let climbingArea = ascent[14];

                if (climbingArea === 'Crag Name') {
                    continue;
                }

                if (climbingAreas.includes(climbingArea) === false) {
                    if (climbingArea != undefined) {
                        climbingAreas.push(climbingArea);
                    }
                }
            }
            setData(climbingAreas);
        };
        fetchData();
    }, []);

    return (
        <>
            <Typography variant="h2">Your climbing areas:</Typography>
            <ul>
                {data.map((item) => (
                    <li key={item} className={classes.listItem}>
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
}
