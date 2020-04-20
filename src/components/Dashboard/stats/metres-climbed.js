import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../../services/firebase';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    metresClimbed: {
        color: 'green',
    }
}));

export default function MetresClimbed() {
    const classes = useStyles();
    const [data, setData] = useState({ ascents: [] });


    // useEffect(() => {
    //     async function fetchData() {
    //       // You can await here
    //       const response = await MyAPI.getData(someId);
    //       // ...
    //     }
    //     fetchData();
    //   }, [someId]); // Or [] if effect doesn't need props or state


    useEffect(() => {
        const fetchData = async () => {
          const result = await firebase.getCurrentUserAscents();
          setData(result);
        };
        fetchData();
      }, []);

    console.log(data);


    const getMetresClimbed = () => {
        let totalMetres = 0;

        for (let i = 0; i < data.length - 1; i++) {
            let climbLength = data[i].file[7];

            climbLength = climbLength.replace('m', '');
            climbLength = parseInt(climbLength);
            totalMetres += climbLength;
        }
        return totalMetres;
    };


    return (
        <>
            <Typography className={classes.metresClimbed} variant="h3">
                Metres climbed: 
            </Typography>
            {/* <ul> */}
            {/* {data.ascents.map(item => (
                 <li>
                     {console.log(item)}
                     {item[1].file[7]}
                 </li>
                ))}
            </ul> */}
        </>
    )
}