import React from 'react';
import { withRouter } from 'react-router-dom';
import Dashboard from '../Dashboard/index';

export default withRouter(function Demo(props) {
    return (
        <>
            <Dashboard />
        </>
    );
});
