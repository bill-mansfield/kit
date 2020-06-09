import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stats from '../../../models/Stats';
import Utils from '../../../utils/Utils';

const useStyles = makeStyles((theme) => ({
    listItem: {
        color: theme.palette.primary.text,
        marginRight: '5px',
        listStyle: 'none',
        backgroundColor: theme.palette.accent.green,
        border: `2px solid ${theme.palette.accent.green}`,
        borderRadius: '20px',
        marginBottom: '4px',
        padding: '2px 4px 2px 4px',
        height: '28px',
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
            currently fucked
            {/* <ul */}
            {/*     style={{ */}
            {/*         display: 'flex', */}
            {/*         flexDirection: 'row', */}
            {/*         flexWrap: 'wrap', */}
            {/*         overflow: 'hidden', */}
            {/*     }} */}
            {/* > */}
            {/*     {data.map((item) => ( */}
            {/*         <li key={item} className={classes.listItem}> */}
            {/*             {item} */}
            {/*         </li> */}
            {/*     ))} */}
            {/* </ul> */}
        </>
    );
}
