import React from 'react';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    noDataWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        backgroundColor: theme.palette.accent.cyan,
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        },
    },
}));

export default function NoData() {
    const classes = useStyles();

    return (
        <div className={classes.noDataWrapper}>
            <Typography variant="h2">
                You don't have any logged ascents yet, to record an ascent
            </Typography>
            <Button
                style={{ marginTop: '10px', marginBottom: '10px' }}
                variant="contained"
                color="primary"
                component={Link}
                to="/ascents"
            >
                Click here
            </Button>
        </div>
    );
}
