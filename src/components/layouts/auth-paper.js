import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	paper: {
		display: 'flex',
		width: '80vw',
		[theme.breakpoints.up('md')]: {
			width: '40vw',
		},
		[theme.breakpoints.up('lg')]: {
			width: '30vw',
		},
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
		backgroundColor: 'transparent',
	},
}));

export default function AuthPaper(props) {
    const classes = useStyles();
    const children = props;

    return (
        <Paper className={classes.paper} 
            { ...children }
        />
	)
}