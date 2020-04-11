import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	main: {
		width: 'auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		position: 'relative',
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
}));

export default function AuthMain(props) {
    const classes = useStyles();
    const children = props;

	return (
        <main className={classes.main} 
            { ...children }
        />
	)
}