import React, { useEffect } from 'react';
import FlexColumn from '../layouts/flex-column';
import { withRouter } from 'react-router-dom';
import Firebase from '../../services/Firebase';
import Navbar from '../Nav/navbar';
import Typography from '@material-ui/core/Typography';
import AddAscent from '../Dashboard/modules/add-new-ascent';
import Footer from '../Dashboard/modules/footer';
import { makeStyles } from '@material-ui/core/styles';
import AscentsTable from './ascents-table';

const useStyles = makeStyles((theme) => ({
    tableWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        justifyContent: 'center',
        marginTop: '10%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

export default withRouter(function AscentsPage(props) {
    const classes = useStyles();
    useEffect(() => {
        if (!Firebase.getCurrentUsername()) {
            // not logged in
            alert('Please login first');
            props.history.replace('/login');
        }
    }, [props.history]);

    return (
        <>
            <Navbar />
            <FlexColumn>
                <div className={classes.tableWrapper}>
                    <AscentsTable />
                </div>
                <AddAscent />
                <Footer />
            </FlexColumn>
        </>
    );
});
