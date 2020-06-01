import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        width: '80vw',
        [theme.breakpoints.up('md')]: {
            width: '60vw',
        },
        [theme.breakpoints.up('lg')]: {
            width: '50vw',
        },
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(
            2,
        )}px`,
        backgroundColor: 'transparent',
        boxShadow: 'unset',
    },
}));

export default function AuthInnerWrapper(props) {
    const classes = useStyles();
    const children = props;

    return <Paper className={classes.paper} {...children} />;
}
