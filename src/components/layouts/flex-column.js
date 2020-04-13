import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: theme.palette.secondary.dark,
    },
}));

export default function FlexColumn(props) {
    const classes = useStyles();
    const children = props;

    return <div className={classes.flexColumn} {...children} />;
}
