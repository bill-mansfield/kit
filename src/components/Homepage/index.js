import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Avatar, Button } from '@material-ui/core';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';
import { Link } from 'react-router-dom';
import BackgroundImage from '../layouts/backgroundImage';

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
	paper: {
		display: 'flex',
		width: '30vw',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
}));

export default function Homepage() {
	const classes = useStyles();

	return (
		<>
		<BackgroundImage />
			<main className={classes.main}>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<VerifiedUserOutlined />
					</Avatar>
					<Typography component="h1" variant="h5">
						Hello Guest!
					</Typography>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/register"
						className={classes.submit}>
						Register
					</Button>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/login"
						className={classes.submit}>
						Login
					</Button>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/dashboard"
						className={classes.submit}>
						Dashboard
					</Button>
				</Paper>
			</main>
		</>
	)
}