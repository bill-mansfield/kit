import React, { useEffect } from 'react';
import FlexColumn from '../layouts/flex-column';
import { withRouter } from 'react-router-dom';
import Firebase from '../../services/Firebase';
import Navbar from '../Nav/navbar';
import Typography from '@material-ui/core/Typography';
import Footer from '../Dashboard/modules/footer';
import { makeStyles } from '@material-ui/core/styles';
import AscentsTable from './ascents-table';

const useStyles = makeStyles((theme) => ({
    tableWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '5%',
    },
    titleWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '14%',
        marginBottom: '3%',
        [theme.breakpoints.up('md')]: {
            marginTop: '6%',
        },
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        borderBottom: `2px solid ${theme.palette.primary.main}`,
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
            <FlexColumn style={{ justifyContent: 'space-between' }}>
                <div className={classes.titleWrapper}>
                    <Typography variant="h2">
                        All of your ascents in one place
                    </Typography>
                    <Typography variant="h3">
                        You can add, edit and delete ascents here
                    </Typography>
                </div>
                <div className={classes.tableWrapper}>
                    <AscentsTable />
                </div>
                <Footer />
            </FlexColumn>
        </>
    );
});
