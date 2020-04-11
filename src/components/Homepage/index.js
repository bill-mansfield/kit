import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Avatar, Button } from '@material-ui/core';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';
import { Link } from 'react-router-dom';
import BackgroundImage from '../layouts/backgroundImage';
import AuthMain from '../layouts/auth-main';
import AuthPaper from '../layouts/auth-paper';

const useStyles = makeStyles(theme => ({
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
			<AuthMain>
				<AuthPaper>
					<Avatar className={classes.avatar}>
						<VerifiedUserOutlined />
					</Avatar>
					<Typography variant="h1">
						Hello Crusher!
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
				</AuthPaper>
			</AuthMain>
		</>
	)
}