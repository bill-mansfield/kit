import React, { useState, useEffect } from 'react';
import Homepage from '../Homepage';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, CircularProgress } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from '../../services/firebase';

const theme = createMuiTheme({
    status: {
        body1: {
            fontSize: '32px',
        }
    },
});

const useStyles = makeStyles(theme => ({
    '*': {
        margin: '0',
        padding: '0',
    },

    loader: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
  }));

export default function App() {

    const classes = useStyles();
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val);
		})
	});


	return firebaseInitialized !== false ? (

        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/dashboard' component={Dashboard} />
                </Switch>
            </Router>
        </ThemeProvider>
	) : <div className={classes.loader} id="loader"><CircularProgress /></div>
}