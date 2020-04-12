import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../services/firebase';
import { withRouter } from 'react-router-dom';
import AuthWrapper from '../layouts/auth-wrapper';
import AuthInnerWrapper from '../layouts/auth-inner-wrapper';
import IconAvatar from '../icon-avatar';
import Navbar from '../'

const useStyles = makeStyles(theme => ({
	submit: {
		marginTop: theme.spacing(3),
	},
}));

export default withRouter (function Dashboard(props) {
    const classes = useStyles();
    
    const [quote, setQuote] = useState('');

	useEffect(() => {
		if (!firebase.getCurrentUsername()) {
			// not logged in
			alert('Please login first');
			props.history.replace('/login');
		} else {
		firebase.getCurrentUserQuote().then(setQuote);
		}
	},[quote])


	return (
		<>
			<Navbar />
			<AuthWrapper>
				<AuthInnerWrapper>
					<IconAvatar />
					<Typography component="h1" variant="h5">
						Hello { firebase.getCurrentUsername() }
					</Typography>
					<Typography component="h1" variant="h5">
						Your quote: {quote ? `"${quote}"` : <CircularProgress size={20} />}
					</Typography>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						onClick={logout}
						className={classes.submit}>
						Logout
					</Button>
				</AuthInnerWrapper>
			</AuthWrapper>
		</>
	)

	async function logout() {
		await firebase.logout();
		props.history.push('/');
	}
})