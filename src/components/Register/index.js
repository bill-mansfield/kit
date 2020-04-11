import React, { useState } from 'react';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../services/firebase';
import BackgroundImage from '../layouts/backgroundImage';
import AuthMain from '../layouts/auth-main';
import AuthPaper from '../layouts/auth-paper';

const useStyles = makeStyles(theme => ({
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		'& > label': {
			color: theme.palette.primary.main,
		}
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
}));

export default withRouter( function Register(props) {
	const classes = useStyles();

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [quote, setQuote] = useState('')

	return (
		<>
			<BackgroundImage />
			<AuthMain>
				<AuthPaper>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography variant="h1">
						Register Account
					</Typography>
					<form className={classes.form} onSubmit={e => e.preventDefault() && false }>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="name">Name</InputLabel>
							<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email Address</InputLabel>
							<Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="quote">Your Favorite Quote</InputLabel>
							<Input name="quote" type="text" id="quote" autoComplete="off" value={quote} onChange={e => setQuote(e.target.value)}  />
						</FormControl>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							onClick={onRegister}
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
							Go back to Login
						</Button>
					</form>
				</AuthPaper>
			</AuthMain>
		</>
	)

	async function onRegister() {
		try {
			await firebase.register(name, email, password);
			await firebase.addQuote(quote);
			await firebase.login(email, password);
			props.history.replace('/dashboard');
		} catch(error) {
			alert(error.message);
		}
	}
})