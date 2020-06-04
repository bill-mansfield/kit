import React, { useEffect } from 'react';
import Firebase from '../../services/Firebase';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Dashboard from '../Dashboard/index';

const useStyles = makeStyles((theme) => ({}));

export default withRouter(function Demo(props) {
    const classes = useStyles();

    return <Dashboard />;
});
