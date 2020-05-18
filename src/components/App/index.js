import React, { useState, useEffect } from 'react';
import Homepage from '../Homepage';
import Login from '../Login';
import Register from '../Register';
import Uploader from '../Uploader';
import Dashboard from '../Dashboard';
import Theme from '../theme/theme';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, CircularProgress } from '@material-ui/core';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { Router } from 'react-router-dom';
import Firebase from '../../services/Firebase';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
    loader: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default function App(theme) {
    const classes = useStyles();
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);

    useEffect(() => {
        Firebase.isInitialized().then((val) => {
            setFirebaseInitialized(val);
        });
    });

    return firebaseInitialized !== false ? (
        <Theme>
            <CssBaseline />
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/uploader" component={Uploader} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        </Theme>
    ) : (
        <div className={classes.loader} id="loader">
            <CircularProgress />
        </div>
    );
}
