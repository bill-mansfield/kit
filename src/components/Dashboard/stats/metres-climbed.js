import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../services/firebase';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));

export default function MetresClimbed() {
    const classes = useStyles();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await firebase.getCurrentUserAscents();
            let totalMetres = 0;
                for (let i = 0; i < result.length - 1; i++) {
                    let climbLength = result[i].file[7];
                    if (climbLength === 'Route Height') {
                        climbLength = climbLength.replace('Route Height', 0)
                    }

                    climbLength = climbLength.replace('m', '');
                    climbLength = parseInt(climbLength);
                    totalMetres += climbLength;
                }
                setData(totalMetres);
            };
        fetchData();
    }, []);


    return (
        <Typography className={classes.metresClimbed} variant="h2">
            Metres climbed: {data}
        </Typography>
    )
}