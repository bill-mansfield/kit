import React from 'react';
import Homepage from '../Homepage';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
  }));

export default function App() {

    return (
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
    )
}