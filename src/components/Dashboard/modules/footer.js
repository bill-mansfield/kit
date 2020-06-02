import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
    footerWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '15vh',
        width: '100%',
        backgroundColor: theme.palette.primary.main,
    },
}));

export default function Footer(props) {
    const classes = useStyles();

    return (
        <div className={classes.footerWrapper}>
            <Typography variant="h2">Thanks for using KIT</Typography>
            <a
                target="about_blank"
                href="https://github.com/bill-mansfield/kit"
            >
                <GitHubIcon />
            </a>
            <Typography variant="h3"></Typography>
        </div>
    );
}
