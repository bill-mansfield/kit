import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	main: {
		width: 'auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		position: 'relative',
		[theme.breakpoints.up(400 + theme.spacing(6))]: {
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
}));

export default function AuthWrapper(props) {
    const classes = useStyles();
    const children = props;

	return (
        <main className={classes.main} 
            { ...children }
        />
	)
}