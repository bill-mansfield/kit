import React, { useEffect } from 'react';
import Firebase from '../../services/Firebase';
import { withRouter } from 'react-router-dom';
import Navbar from '../Nav/navbar';
import { useTheme } from '@material-ui/core/styles';
import FlexRow from '../layouts/flex-row';
import FlexColumn from '../layouts/flex-column';
import RouteBar from './charts/route-bar';
import BoulderingBar from './charts/boulder-bar';
import RouteLine from './charts/route-line';
import VolumeBar from './charts/volume-bar';
import NameTitle from './modules/name-title';
import StatsTable from './modules/stats-table';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    statsWrapper: {
        justifyContent: 'center',
        height: '80vh',
        [theme.breakpoints.up('md')]: {
            height: '40vh',
        },
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: '10%',
    },
}));

export default withRouter(function Dashboard(props) {
    const classes = useStyles();
    const theme = useTheme();
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
                <div className={classes.statsWrapper}>
                    <NameTitle />
                    <StatsTable />
                </div>
                <FlexColumn
                    style={{
                        height: '60vh',
                        marginTop: '3%',
                    }}
                >
                    <FlexRow
                        style={{
                            height: '60vh',
                            width: '66vw',
                        }}
                    >
                        <RouteBar />
                        <BoulderingBar />
                    </FlexRow>
                </FlexColumn>
                <FlexColumn
                    style={{
                        height: '80vh',
                    }}
                >
                    <FlexRow
                        style={{
                            height: '60vh',
                            width: '66vw',
                        }}
                    >
                        <RouteLine />
                    </FlexRow>
                    <FlexRow
                        style={{
                            height: '20vh',
                            width: '66vw',
                        }}
                    >
                        <VolumeBar />
                    </FlexRow>
                </FlexColumn>
            </FlexColumn>
        </>
    );
});
